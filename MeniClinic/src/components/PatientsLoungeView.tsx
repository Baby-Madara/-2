import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  RotateCcw,
  Sparkles,
  Search,
  Phone,
  DoorOpen,
  LogOut,
  Banknote,
  AlertCircle,
  Clock,
  UserCheck,
  Coffee,
  BellRing,
  X,
} from 'lucide-react';
import {
  playDoctorBackToWorkChime,
  playBreakBlockedAlertSound,
  playSummonReceptionistChime,
} from '../utils/sound';
import {
  ClinicSettings,
  Patient,
  Transaction,
  ServiceType,
  PaymentMethod,
  VisitStatus,
  StaffRole,
  SERVICE_TYPE_LABELS,
  formatSAR,
  parseSurgeryCatalog,
  getTodayISO,
  getCurrentTimeHHMM,
} from '../types';

const SEATED_TIMESTAMPS_STORAGE_KEY = 'shifaa_crm_waiting_seated_at_v1';
const CHECKED_IN_STORAGE_KEY = 'shifaa_crm_checked_in_v1';
const DOCTOR_BREAK_STORAGE_KEY = 'shifaa_crm_doctor_on_break_v1';
const RECEPTIONIST_SUMMONED_STORAGE_KEY = 'shifaa_crm_receptionist_summoned_v1';

function formatWaitingDuration(elapsedMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  if (hours > 0) {
    const hh = String(hours).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export interface PatientExitReasonOption {
  id: string;
  label: string;
  defaultRefund: boolean;
  resultingStatus: VisitStatus;
}

export const PATIENT_EXIT_REASONS: PatientExitReasonOption[] = [
  {
    id: 'refund_requested',
    label: 'استرجاع الكشف وإلغاء الحجز (مرتجع مالي للمريض)',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'long_wait',
    label: 'طول فترة الانتظار وارتباط المريض بموعد آخر',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'emergency_personal',
    label: 'ظرف شخصي أو عائلي طارئ للمريض قبل الدخول للطبيب',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'doctor_surgery_busy',
    label: 'انشغال الطبيب في حالة/عملية طارئة واعتذار المريض عن الانتظار',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'reschedule_later',
    label: 'تأجيل الموعد ليوم آخر بناءً على رغبة المريض',
    defaultRefund: false,
    resultingStatus: 'cancelled',
  },
  {
    id: 'external_labs_xray',
    label: 'خروج لعمل تحاليل طبية أو أشعة خارجية والعودة لاحقاً',
    defaultRefund: false,
    resultingStatus: 'cancelled',
  },
  {
    id: 'insurance_rejected',
    label: 'عدم توفر موافقة شركة التأمين الطبي أو تأجيل الإجراء',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'wrong_specialty',
    label: 'الحالة تتطلب تخصصاً طبياً آخر (توجيه المريض واسترداد الكشف)',
    defaultRefund: true,
    resultingStatus: 'cancelled',
  },
  {
    id: 'fast_service_done',
    label: 'اكتفاء المريض باستشارة سريعة / تكرار وصفة طبية ومغادرته',
    defaultRefund: false,
    resultingStatus: 'completed',
  },
  {
    id: 'other_reason',
    label: 'سبب آخر (تحديد السبب في الملاحظات أدناه)',
    defaultRefund: false,
    resultingStatus: 'cancelled',
  },
];

interface PatientsLoungeViewProps {
  role: StaffRole;
  settings: ClinicSettings;
  patients: Patient[];
  transactions: Transaction[];
  onAddPatient: (
    data: Omit<Patient, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
  ) => Promise<Patient | null>;
  onCreateTransaction: (
    data: Omit<Transaction, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  onUpdateTransactionPaymentAndStatus: (
    transaction: Transaction,
    updates: {
      paidAmount: number;
      paymentMethod: PaymentMethod;
      status: VisitStatus;
      receptionNotes: string;
    }
  ) => Promise<void>;
  onUpdateDoctorNotes: (
    transaction: Transaction,
    doctorNotes: string,
    status: VisitStatus
  ) => Promise<void>;
  onOpenInvoice: (tx: Transaction) => void;
}

interface WalkingAnimationState {
  tx: Transaction;
  direction: 'to_doctor' | 'to_exit' | 'to_waiting';
}

/**
 * SVG Stickman Seated on a Clinic Chair
 */
const SeatedStickmanSVG: React.FC<{
  color: string;
  isSurgery?: boolean;
}> = ({ color, isSurgery }) => (
  <svg
    viewBox="0 0 90 110"
    className="w-16 h-20 mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Chair Backrest & Seat */}
    <path
      d="M24 42 V78 M24 78 H62 M28 78 V102 M56 78 V102"
      stroke="#94A3B8"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="20"
      y="40"
      width="7"
      height="36"
      rx="3"
      fill="#CBD5E1"
      stroke="#64748B"
      strokeWidth="1.5"
    />
    <rect
      x="22"
      y="74"
      width="42"
      height="6"
      rx="3"
      fill="#CBD5E1"
      stroke="#64748B"
      strokeWidth="1.5"
    />

    {/* Animated Stickman Group (Gentle Breathing / Bobbing) */}
    <motion.g
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Head */}
      <circle
        cx="42"
        cy="24"
        r="10"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="3.2"
      />
      {/* Eyes (Looking towards the corridor/doctor room on the left) */}
      <circle cx="39" cy="23" r="1.3" fill={color} />
      <circle cx="44" cy="23" r="1.3" fill={color} />
      {/* Calm Smile */}
      <path
        d="M39 27 Q41.5 29 44 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Torso (Seated upright) */}
      <path
        d="M42 34 L40 68"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Arms resting / holding medical card */}
      <path
        d="M41 44 L53 56 L60 52"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small Medical Card in hand */}
      <rect
        x="57"
        y="44"
        width="10"
        height="13"
        rx="1.5"
        fill={isSurgery ? '#FEF3C7' : '#CCFBF1'}
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Seated Legs (Thighs horizontal on seat, lower legs vertical to floor) */}
      <path
        d="M40 68 L62 68 L66 98"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 68 L56 71 L58 98"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Feet */}
      <path
        d="M66 98 L60 98 M58 98 L52 98"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);

/**
 * Empty Clinic Chair SVG
 */
const EmptyChairSVG: React.FC<{ seatNumber: number }> = ({ seatNumber }) => (
  <svg
    viewBox="0 0 90 110"
    className="w-16 h-20 mx-auto opacity-55 group-hover:opacity-90 transition-opacity"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 42 V78 M24 78 H62 M28 78 V102 M56 78 V102"
      stroke="#CBD5E1"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="20"
      y="40"
      width="7"
      height="36"
      rx="3"
      fill="#F1F5F9"
      stroke="#94A3B8"
      strokeWidth="1.5"
    />
    <rect
      x="22"
      y="74"
      width="42"
      height="6"
      rx="3"
      fill="#F1F5F9"
      stroke="#94A3B8"
      strokeWidth="1.5"
    />
    <text
      x="45"
      y="62"
      textAnchor="middle"
      fill="#94A3B8"
      fontSize="11"
      fontFamily="IBM Plex Mono, monospace"
      fontWeight="600"
    >
      #{seatNumber}
    </text>
  </svg>
);

/**
 * Walking Stickman SVG (With Striding Legs & Swinging Arms)
 */
const WalkingStickmanSVG: React.FC<{ color: string }> = ({ color }) => (
  <svg
    viewBox="0 0 90 110"
    className="w-20 h-24 mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.g
      animate={{ y: [0, -4, 0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
    >
      {/* Head */}
      <circle
        cx="45"
        cy="22"
        r="10"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="3.5"
      />
      <circle cx="41" cy="21" r="1.4" fill={color} />
      <circle cx="46" cy="21" r="1.4" fill={color} />
      <path
        d="M41 25 Q43.5 27.5 46 25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Torso */}
      <path
        d="M45 32 L43 66"
        stroke={color}
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Swinging Arm 1 */}
      <motion.path
        animate={{
          d: [
            'M44 40 L30 56',
            'M44 40 L58 56',
            'M44 40 L30 56',
          ],
        }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Swinging Arm 2 */}
      <motion.path
        animate={{
          d: [
            'M44 40 L58 56',
            'M44 40 L30 56',
            'M44 40 L58 56',
          ],
        }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Striding Leg 1 */}
      <motion.path
        animate={{
          d: [
            'M43 66 L28 98',
            'M43 66 L58 98',
            'M43 66 L28 98',
          ],
        }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        stroke={color}
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Striding Leg 2 */}
      <motion.path
        animate={{
          d: [
            'M43 66 L58 98',
            'M43 66 L28 98',
            'M43 66 L58 98',
          ],
        }}
        transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        stroke={color}
        strokeWidth="3.8"
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);

/**
 * Unified Doctor Office Consultation Scene:
 * - Left: Doctor Stickman in calm Sky-Blue (سماوي #0EA5E9 / #0284C7) seated on executive chair facing Right
 * - Center: Medical Consultation Desk with Crescent Moon Emblem (هلال) & Monitor
 * - Right: Visitor Chair directly in front of the desk; when a patient enters, the Patient Stickman sits on this chair facing Left (directly opposite the Doctor!)
 */
const DoctorDeskStickmanSVG: React.FC<{
  patientInRoom?: Transaction | null;
  isOnBreak?: boolean;
  receptionistInRoom?: boolean;
  receptionistLeaving?: boolean;
}> = ({
  patientInRoom,
  isOnBreak = false,
  receptionistInRoom = false,
  receptionistLeaving = false,
}) => {
  const isSurgery = patientInRoom?.type === 'surgery';
  const patientColor = isSurgery ? '#B45309' : '#0F766E';
  const isDoctorTalking = !isOnBreak && Boolean(patientInRoom || receptionistInRoom);

  return (
    <svg
      viewBox="0 0 310 122"
      className="w-full max-w-md h-36 mx-auto overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Subtle Floor Line under Desk & Chairs */}
      <line
        x1="14"
        y1="108"
        x2="296"
        y2="108"
        stroke="#E2E8F0"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* ============================================================
          1. DOCTOR SIDE (Left side, facing Right toward Desk & Patient)
         ============================================================ */}
      {/* Executive Doctor Chair Back & Seat (Soft Sky-Blue Tint) */}
      <rect
        x="24"
        y="24"
        width="11"
        height="48"
        rx="5"
        fill="#E0F2FE"
        stroke="#0EA5E9"
        strokeWidth="1.8"
      />
      <rect
        x="26"
        y="68"
        width="38"
        height="7"
        rx="3.5"
        fill="#E0F2FE"
        stroke="#0EA5E9"
        strokeWidth="1.8"
      />
      {/* Chair Pedestal & Base */}
      <path
        d="M44 75 V103 M33 104 H55"
        stroke="#64748B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="34" cy="105.5" r="2" fill="#0EA5E9" />
      <circle cx="54" cy="105.5" r="2" fill="#0EA5E9" />

      {/* Doctor Stickman in Calm Sky-Blue (سماوي) */}
      <motion.g
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Seated Legs */}
        <path
          d="M47 65 L66 67 L68 96"
          stroke="#0284C7"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 66 L60 70 L60 98"
          stroke="#0EA5E9"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shoes */}
        <path
          d="M68 96 H74 M60 98 H66"
          stroke="#0369A1"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Torso Leaning Slightly Forward Attentively */}
        <path
          d="M51 36 L46 65"
          stroke="#0EA5E9"
          strokeWidth="4.4"
          strokeLinecap="round"
        />

        {/* Head with Soft Sky-Blue Fill */}
        <circle
          cx="52"
          cy="24"
          r="11"
          fill="#F0F9FF"
          stroke="#0284C7"
          strokeWidth="3.4"
        />
        {/* Glasses (Facing Right toward the Patient) */}
        <rect
          x="48"
          y="20"
          width="6"
          height="4"
          rx="1"
          fill="#E0F2FE"
          stroke="#0369A1"
          strokeWidth="1.3"
        />
        <rect
          x="56"
          y="20"
          width="6"
          height="4"
          rx="1"
          fill="#E0F2FE"
          stroke="#0369A1"
          strokeWidth="1.3"
        />
        {/* Friendly / Talking / Coffee-Sipping Mouth of Doctor (No Q-to-A path morphing!) */}
        <path
          d="M51 28 Q54.5 30.5 58 28"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {isOnBreak && (
          <motion.circle
            cx="57"
            cy="28.2"
            r="1.6"
            fill="#0284C7"
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.15, 1.15, 0.4],
            }}
            transition={{
              duration: 3.4,
              times: [0, 0.35, 0.65, 1],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
        {isDoctorTalking && (
          <motion.ellipse
            cx="54.5"
            cy="28.8"
            rx="2"
            ry="1.3"
            fill="#0284C7"
            animate={{
              opacity: [0.15, 0.95, 0.15],
              scaleY: [0.4, 1.1, 0.4],
            }}
            transition={{
              duration: 0.65,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Doctor's Break Bubble (في استراحة) OR Speech Bubble with Moving Dots (....) */}
        {isOnBreak ? (
          <motion.g
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect
              x="66"
              y="2"
              width="62"
              height="19"
              rx="9.5"
              fill="#E0F2FE"
              stroke="#0284C7"
              strokeWidth="1.4"
            />
            <path
              d="M70 18 L62 23 L75 20 Z"
              fill="#E0F2FE"
              stroke="#0284C7"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <text
              x="97"
              y="14.5"
              textAnchor="middle"
              fill="#0369A1"
              fontSize="8.5"
              fontWeight="bold"
            >
              في استراحة
            </text>
          </motion.g>
        ) : (
          isDoctorTalking && (
            <motion.g
              animate={{ opacity: [1, 1, 0.35, 0.35, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Speech Bubble Body & Tail from Doctor's Mouth */}
              <rect
                x="68"
                y="4"
                width="44"
                height="18"
                rx="9"
                fill="#F0F9FF"
                stroke="#0EA5E9"
                strokeWidth="1.4"
              />
              <path
                d="M70 19 L62 24 L75 21 Z"
                fill="#F0F9FF"
                stroke="#0EA5E9"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* 4 Moving & Fading Dots (....) Inside Doctor's Speech Bubble */}
              {[0, 1, 2, 3].map((dotIdx) => (
                <motion.circle
                  key={`doc-dot-${dotIdx}`}
                  cx={78 + dotIdx * 8}
                  cy="13"
                  r="1.7"
                  fill="#0284C7"
                  animate={{
                    opacity: [0.15, 1, 0.15],
                    y: [0.5, -2, 0.5],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: dotIdx * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.g>
          )
        )}

        {/* Stethoscope around neck */}
        <path
          d="M46 37 Q52 50 58 37"
          stroke="#0369A1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="52" cy="46" r="2.5" fill="#0369A1" />

        {/* Left Arm Resting on Desk */}
        <path
          d="M50 44 L66 57 L82 57"
          stroke="#0284C7"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Arm: Holding & Lifting Coffee Cup to Mouth when on Break, or Welcoming Gesture */}
        {isOnBreak ? (
          <g>
            {/* Right Arm moving from Desk (88,55) up to Mouth (60,30) and back */}
            <motion.path
              animate={{
                d: [
                  'M 49 45 L 68 55 L 88 55',
                  'M 49 45 L 64 41 L 60 30',
                  'M 49 45 L 63 40 L 59 29',
                  'M 49 45 L 68 55 L 88 55',
                ],
              }}
              transition={{
                duration: 3.4,
                times: [0, 0.35, 0.65, 1],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              stroke="#0EA5E9"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Coffee Cup + Rising Steam Held Directly in the Doctor's Hand!
                Moves in exact lockstep with the hand: (88,55) -> (60,30) -> (59,29) -> (88,55) */}
            <motion.g
              animate={{
                x: [88, 60, 59, 88],
                y: [55, 30, 29, 55],
                rotate: [0, -18, -30, 0],
              }}
              transition={{
                duration: 3.4,
                times: [0, 0.35, 0.65, 1],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Doctor's Hand Grip on Cup */}
              <circle cx="0" cy="0" r="2.1" fill="#0284C7" />

              {/* Coffee Cup Body held in hand */}
              <path
                d="M -1 -5.5 H 9.5 L 8.5 5.5 H 0 Z"
                fill="#FFFFFF"
                stroke="#0284C7"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Warm Coffee Liquid Rim at Top of Mug */}
              <line
                x1="0"
                y1="-3.5"
                x2="8.5"
                y2="-3.5"
                stroke="#92400E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Coffee Cup Handle */}
              <path
                d="M 9.5 -3.2 C 13 -3.2 13 3 8.8 3"
                fill="none"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* 3 Animated Rising Steam Wisps (بخار القهوة يرتفع مع الفنجان) */}
              {[0, 1, 2].map((steamIdx) => {
                const xPos = 1 + steamIdx * 3.2;
                return (
                  <motion.path
                    key={`coffee-steam-${steamIdx}`}
                    d={`M ${xPos} -8 Q ${xPos - 2} -12.5 ${xPos + 1.2} -17 Q ${xPos + 3} -21.5 ${xPos} -25`}
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    animate={{
                      y: [2, -6],
                      opacity: [0, 0.85, 0],
                    }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      delay: steamIdx * 0.5,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}
            </motion.g>
          </g>
        ) : (
          <motion.path
            animate={{
              d: [
                'M 49 45 L 64 52 L 78 47',
                'M 49 45 L 64 50 L 78 44',
                'M 49 45 L 64 52 L 78 47',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#0EA5E9"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </motion.g>

      {/* Saucer resting on the desk where the Doctor sets the coffee cup down */}
      {isOnBreak && (
        <ellipse
          cx="92.5"
          cy="61.2"
          rx="8"
          ry="1.5"
          fill="#E0F2FE"
          stroke="#0284C7"
          strokeWidth="1.2"
        />
      )}

      {/* ============================================================
          2. CENTER CONSULTATION DESK WITH CRESCENT MOON (هلال)
         ============================================================ */}
      <rect
        x="76"
        y="62"
        width="114"
        height="8"
        rx="2"
        fill="#E0F2FE"
        stroke="#0284C7"
        strokeWidth="1.8"
      />
      <path
        d="M86 70 V106 M180 70 V106"
        stroke="#475569"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Front modesty panel of desk */}
      <rect
        x="94"
        y="70"
        width="78"
        height="24"
        rx="2"
        fill="#F8FAFC"
        stroke="#94A3B8"
        strokeWidth="1.2"
      />
      {/* Medical Crescent Moon Emblem (علامة هلال طبي) on Desk */}
      <path
        d="M136 75 A 7.5 7.5 0 1 0 136 89 A 5.8 5.8 0 1 1 136 75 Z"
        fill="#0EA5E9"
      />
      {/* Computer Monitor on Desk */}
      <rect
        x="118"
        y="38"
        width="28"
        height="18"
        rx="2"
        fill="#0C4A6E"
        stroke="#0284C7"
        strokeWidth="1.5"
      />
      <path
        d="M132 56 V62 M125 62 H139"
        stroke="#0284C7"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* ============================================================
          3. PATIENT VISITOR CHAIR (Right side, Facing Left toward Doctor)
         ============================================================ */}
      {/* Visitor Chair Backrest on the Right (x=271) so chair faces Left */}
      <rect
        x="271"
        y="32"
        width="9"
        height="42"
        rx="4"
        fill={patientInRoom ? '#CCFBF1' : '#F1F5F9'}
        stroke={patientInRoom ? '#0F766E' : '#94A3B8'}
        strokeWidth="1.8"
      />
      {/* Visitor Chair Seat Cushion */}
      <rect
        x="236"
        y="68"
        width="44"
        height="7"
        rx="3"
        fill={patientInRoom ? '#CCFBF1' : '#F1F5F9'}
        stroke={patientInRoom ? '#0F766E' : '#94A3B8'}
        strokeWidth="1.8"
      />
      {/* Visitor Chair Legs */}
      <path
        d="M242 75 V106 M274 75 V106"
        stroke="#64748B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* If a patient is inside the Doctor's Room, draw the Patient Stickman Seated Facing Left (Opposite the Doctor, WITHOUT holding a phone!) */}
      {patientInRoom ? (
        <motion.g
          key={patientInRoom.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.g
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Patient Head (Facing Left toward the Doctor) */}
            <circle
              cx="256"
              cy="24"
              r="11"
              fill="#FFFFFF"
              stroke={patientColor}
              strokeWidth="3.5"
            />
            {/* Eyes looking Left toward the Doctor */}
            <circle cx="250" cy="22" r="1.4" fill={patientColor} />
            <circle cx="255" cy="22" r="1.4" fill={patientColor} />
            {/* Talking Mouth of Patient */}
            <motion.path
              animate={{
                d: [
                  'M249 27.5 Q252.5 26.5 256 27.5',
                  'M249 27 Q252.5 30.5 256 27',
                  'M249 27.5 Q252.5 26.5 256 27.5',
                ],
              }}
              transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
              stroke={patientColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Patient's Animated Speech Bubble with Moving Dots (....) coming from Mouth */}
            <motion.g
              animate={{ opacity: [0.35, 0.35, 1, 1, 0.35] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect
                x="196"
                y="4"
                width="44"
                height="18"
                rx="9"
                fill={isSurgery ? '#FEF3C7' : '#F0FDFA'}
                stroke={patientColor}
                strokeWidth="1.4"
              />
              <path
                d="M238 19 L246 24 L233 21 Z"
                fill={isSurgery ? '#FEF3C7' : '#F0FDFA'}
                stroke={patientColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* 4 Moving & Fading Dots (....) Inside Patient's Speech Bubble (flowing from Patient toward Doctor) */}
              {[0, 1, 2, 3].map((dotIdx) => (
                <motion.circle
                  key={`pat-dot-${dotIdx}`}
                  cx={230 - dotIdx * 8}
                  cy="13"
                  r="1.7"
                  fill={patientColor}
                  animate={{
                    opacity: [0.15, 1, 0.15],
                    y: [0.5, -2, 0.5],
                  }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: dotIdx * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.g>

            {/* Patient Torso Seated on Visitor Chair */}
            <path
              d="M256 35 L258 66"
              stroke={patientColor}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Patient Arm 1: Resting Naturally on Lap/Knee (No phone!) */}
            <path
              d="M257 45 L246 58 L238 63"
              stroke={patientColor}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Patient Arm 2: Conversational Hand Gesture while Talking to the Doctor */}
            <motion.path
              animate={{
                d: [
                  'M256 44 L241 52 L227 48',
                  'M256 44 L241 50 L227 44',
                  'M256 44 L241 52 L227 48',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              stroke={patientColor}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Patient Seated Legs Bent Left Toward the Desk */}
          <path
            d="M258 66 H238 L235 98"
            stroke={patientColor}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M260 66 H244 L242 98"
            stroke={patientColor}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Patient Feet Pointing Left Toward the Doctor */}
          <path
            d="M235 98 H228 M242 98 H235"
            stroke={patientColor}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </motion.g>
      ) : (
        /* Empty Visitor Chair Label when no patient is in the room */
        <text
          x="256"
          y="55"
          textAnchor="middle"
          className="fill-slate-400 text-[9px] font-medium"
        >
          كرسي المريض
        </text>
      )}

      {/* ============================================================
          4. STANDING FEMALE RECEPTIONIST STICKMAN (موظفة الاستقبال واقفة بتتكلم مع الدكتور)
             Appears when Doctor clicks "استدعاء", walks out when Doctor clicks "انصراف"
         ============================================================ */}
      {(receptionistInRoom || receptionistLeaving) && (
        <motion.g
          key={receptionistLeaving ? 'receptionist-leaving' : 'receptionist-standing'}
          initial={receptionistLeaving ? { opacity: 1, x: 0 } : { opacity: 0, x: 34 }}
          animate={receptionistLeaving ? { opacity: 0, x: 52 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <motion.g
            animate={receptionistLeaving ? { y: [0, -2, 0, -2, 0] } : { y: [0, -1.2, 0] }}
            transition={{
              duration: receptionistLeaving ? 0.45 : 2.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Female Hair Bun / Ponytail at Back of Head */}
            <circle
              cx="215"
              cy="19"
              r="4.5"
              fill="#F3E8FF"
              stroke="#7E22CE"
              strokeWidth="2.2"
            />
            {/* Female Receptionist Head (Standing at x=205, Facing Left toward Doctor) */}
            <circle
              cx="205"
              cy="21"
              r="9.5"
              fill="#FFFFFF"
              stroke="#7E22CE"
              strokeWidth="3"
            />
            {/* Neat Front Hairline / Hijab Frame */}
            <path
              d="M197 16 Q205 11 213 18"
              stroke="#7E22CE"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Eyes looking Left toward the Doctor */}
            <circle cx="200.5" cy="19.8" r="1.2" fill="#6B21A8" />
            <circle cx="204.5" cy="19.8" r="1.2" fill="#6B21A8" />

            {/* Talking Mouth of Female Receptionist */}
            <motion.ellipse
              cx="202.2"
              cy="25"
              rx="1.8"
              ry="1.1"
              fill="#7E22CE"
              animate={{
                opacity: [0.25, 1, 0.25],
                scaleY: [0.45, 1.15, 0.45],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Receptionist's Speech Bubble with Moving Dots (....) while talking to Doctor */}
            {!receptionistLeaving && (
              <motion.g
                animate={{ opacity: [0.4, 1, 1, 0.4] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <rect
                  x="148"
                  y="2"
                  width="40"
                  height="16"
                  rx="8"
                  fill="#FAF5FF"
                  stroke="#9333EA"
                  strokeWidth="1.3"
                />
                <path
                  d="M186 15 L194 20 L182 17 Z"
                  fill="#FAF5FF"
                  stroke="#9333EA"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                {[0, 1, 2, 3].map((dotIdx) => (
                  <motion.circle
                    key={`rec-dot-${dotIdx}`}
                    cx={179 - dotIdx * 7}
                    cy="10"
                    r="1.5"
                    fill="#7E22CE"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      y: [0.5, -1.8, 0.5],
                    }}
                    transition={{
                      duration: 1.0,
                      repeat: Infinity,
                      delay: dotIdx * 0.18,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.g>
            )}

            {/* Female Tunic / Skirt Silhouette (Standing Upright) */}
            <path
              d="M205 31 L197 72 H213 Z"
              fill="#F3E8FF"
              stroke="#7E22CE"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />

            {/* Left Arm Resting Naturally at Side (Not holding a phone) */}
            <path
              d="M206 40 L211 54 L208 64"
              stroke="#7E22CE"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Right Arm Gesturing Conversationally Toward Doctor */}
            <motion.path
              animate={{
                d: [
                  'M204 39 L192 47 L183 43',
                  'M204 39 L192 44 L183 38',
                  'M204 39 L192 47 L183 43',
                ],
              }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              stroke="#9333EA"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Standing Straight Legs & Shoes on the Floor */}
          <path
            d="M202 72 V105 M208 72 V105"
            stroke="#7E22CE"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M202 105 H196 M208 105 H202"
            stroke="#581C87"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Role Label Underneath Standing Receptionist */}
          <rect
            x="180"
            y="109"
            width="50"
            height="11"
            rx="3"
            fill="#FAF5FF"
            stroke="#D8B4FE"
            strokeWidth="0.9"
          />
          <text
            x="205"
            y="116.8"
            textAnchor="middle"
            fill="#6B21A8"
            fontSize="6.8"
            fontWeight="bold"
          >
            {receptionistLeaving ? 'تعود للاستقبال...' : 'موظفة الاستقبال'}
          </text>
        </motion.g>
      )}
    </svg>
  );
};

export const PatientsLoungeView: React.FC<PatientsLoungeViewProps> = ({
  role,
  settings,
  patients,
  transactions,
  onAddPatient,
  onCreateTransaction,
  onUpdateTransactionPaymentAndStatus,
  onUpdateDoctorNotes,
  onOpenInvoice,
}) => {
  const todayISO = getTodayISO();
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);

  // Live Clock State for Waiting Lounge Seat Timers (updates every 1 second)
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [seatedTimestamps, setSeatedTimestamps] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(SEATED_TIMESTAMPS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as Record<string, number>;
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Track which pre-booked appointments have checked in ("حضور") and sat on their chair
  const [checkedInIds, setCheckedInIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(CHECKED_IN_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as Record<string, boolean>;
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Track which pre-booked patient is currently walking to sit on their chair after clicking "حضور"
  const [arrivingTxId, setArrivingTxId] = useState<string | null>(null);

  const isPreBookedUnarrived = (tx: Transaction): boolean => {
    if (tx.status === 'scheduled') return true;
    if (
      tx.status === 'waiting' &&
      (tx.date > todayISO || (tx.receptionNotes && tx.receptionNotes.includes('حجز مسبق'))) &&
      !checkedInIds[tx.id]
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ensure every seated waiting patient (not pre-booked unarrived) has a recorded start timestamp
  useEffect(() => {
    const seatedWaitingTxs = transactions.filter(
      (t) => t.status === 'waiting' && !isPreBookedUnarrived(t)
    );
    if (seatedWaitingTxs.length === 0) return;

    let changed = false;
    const nextMap = { ...seatedTimestamps };
    const currentNow = Date.now();

    seatedWaitingTxs.forEach((tx, idx) => {
      if (!nextMap[tx.id]) {
        const parts = tx.id.split('_');
        const maybeTs = Number(parts[1]);
        if (!Number.isNaN(maybeTs) && maybeTs > 1700000000000 && maybeTs <= currentNow) {
          nextMap[tx.id] = maybeTs;
        } else {
          nextMap[tx.id] = currentNow - idx * 45000;
        }
        changed = true;
      }
    });

    if (changed) {
      setSeatedTimestamps(nextMap);
      try {
        localStorage.setItem(SEATED_TIMESTAMPS_STORAGE_KEY, JSON.stringify(nextMap));
      } catch {
        // ignore
      }
    }
  }, [transactions, seatedTimestamps, checkedInIds, todayISO]);

  // Active Walking Animation State (when a stickman is walking between Lounge and Doctor's Room)
  const [walkingAnim, setWalkingAnim] = useState<WalkingAnimationState | null>(null);

  // Side position for the Vertical Status Column ('left' by default as preferred by the user, or 'right')
  const [statsColumnSide, setStatsColumnSide] = useState<'left' | 'right'>(() => {
    try {
      const saved = localStorage.getItem('shifaa_crm_lounge_stats_side_v1');
      if (saved === 'right' || saved === 'left') return saved;
    } catch {
      // ignore
    }
    return 'left';
  });

  const toggleStatsColumnSide = () => {
    setStatsColumnSide((prev) => {
      const next = prev === 'left' ? 'right' : 'left';
      try {
        localStorage.setItem('shifaa_crm_lounge_stats_side_v1', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Doctor Break State ("زرار استراحة / العودة للعمل") synced across tabs
  const [doctorOnBreak, setDoctorOnBreak] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DOCTOR_BREAK_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Summoned Receptionist State ("زرار استدعاء / انصراف") synced across tabs
  const [receptionistSummoned, setReceptionistSummoned] = useState<boolean>(() => {
    try {
      return localStorage.getItem(RECEPTIONIST_SUMMONED_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [receptionistLeaving, setReceptionistLeaving] = useState<boolean>(false);

  // Alert Banner for Break Refusal, Doctor Return to Work, or Summoning Receptionist
  const [breakAlertBanner, setBreakAlertBanner] = useState<{
    type: 'blocked' | 'returned' | 'on_break' | 'summoned';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!breakAlertBanner) return;
    const timer = setTimeout(() => setBreakAlertBanner(null), 5500);
    return () => clearTimeout(timer);
  }, [breakAlertBanner]);

  // Listen for cross-tab changes to doctorOnBreak and receptionistSummoned
  useEffect(() => {
    const handleBreakStorage = (e: StorageEvent) => {
      if (e.key === DOCTOR_BREAK_STORAGE_KEY) {
        const nextBreak = e.newValue === 'true';
        const prevBreak = e.oldValue === 'true';
        setDoctorOnBreak(nextBreak);
        if (prevBreak && !nextBreak) {
          playDoctorBackToWorkChime();
          setBreakAlertBanner({
            type: 'returned',
            message: `إشعار للريسبشن: عاد الطبيب (${settings.doctorName}) إلى العمل الآن — يمكنكم إدخال المرضى من صالة الانتظار.`,
          });
        } else if (!prevBreak && nextBreak) {
          setBreakAlertBanner({
            type: 'on_break',
            message: `تنبيه: الطبيب (${settings.doctorName}) في استراحة حالياً — تم إيقاف إدخال المرضى مؤقتاً.`,
          });
        }
      } else if (e.key === RECEPTIONIST_SUMMONED_STORAGE_KEY) {
        const nextSummoned = e.newValue === 'true';
        const prevSummoned = e.oldValue === 'true';
        if (!prevSummoned && nextSummoned) {
          setReceptionistLeaving(false);
          setReceptionistSummoned(true);
          playSummonReceptionistChime();
          setBreakAlertBanner({
            type: 'summoned',
            message: `استدعاء من الطبيب (${settings.doctorName}): يرجى توجه موظفة الاستقبال إلى مكتب الطبيب الآن.`,
          });
        } else if (prevSummoned && !nextSummoned) {
          setReceptionistLeaving(true);
          setTimeout(() => {
            setReceptionistSummoned(false);
            setReceptionistLeaving(false);
          }, 700);
        }
      }
    };
    window.addEventListener('storage', handleBreakStorage);
    return () => window.removeEventListener('storage', handleBreakStorage);
  }, [settings.doctorName]);

  const handleToggleDoctorBreak = (nextBreakState: boolean) => {
    // Only the Doctor role can toggle break, and only when no patient is inside the Doctor's room
    if (role !== 'doctor') return;
    setDoctorOnBreak(nextBreakState);
    try {
      localStorage.setItem(DOCTOR_BREAK_STORAGE_KEY, String(nextBreakState));
    } catch {
      // ignore
    }

    if (nextBreakState) {
      setBreakAlertBanner({
        type: 'on_break',
        message: `الطبيب (${settings.doctorName}) الآن في استراحة — سيرفض النظام إدخال أي مريض من الصالة حتى الضغط على «العودة للعمل».`,
      });
    } else {
      playDoctorBackToWorkChime();
      setBreakAlertBanner({
        type: 'returned',
        message: `إشعار صوتي للريسبشن: عاد الطبيب (${settings.doctorName}) إلى العمل الآن — الغرفة جاهزة لاستقبال المرضى.`,
      });
    }
  };

  const handleToggleSummonReceptionist = (shouldSummon: boolean) => {
    if (role !== 'doctor') return;

    if (shouldSummon) {
      // If Doctor was on break, exit break so Doctor speaks with the receptionist
      if (doctorOnBreak) {
        setDoctorOnBreak(false);
        try {
          localStorage.setItem(DOCTOR_BREAK_STORAGE_KEY, 'false');
        } catch {
          // ignore
        }
      }
      setReceptionistLeaving(false);
      setReceptionistSummoned(true);
      try {
        localStorage.setItem(RECEPTIONIST_SUMMONED_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      playSummonReceptionistChime();
      setBreakAlertBanner({
        type: 'summoned',
        message: `تم استدعاء موظفة الاستقبال إلى مكتب الطبيب (${settings.doctorName}) — تتواجد الموظفة الآن داخل الغرفة.`,
      });
    } else {
      setReceptionistLeaving(true);
      try {
        localStorage.setItem(RECEPTIONIST_SUMMONED_STORAGE_KEY, 'false');
      } catch {
        // ignore
      }
      setBreakAlertBanner({
        type: 'returned',
        message: `انصراف: عادت موظفة الاستقبال من مكتب الطبيب إلى قسم الاستقبال.`,
      });
      setTimeout(() => {
        setReceptionistSummoned(false);
        setReceptionistLeaving(false);
      }, 700);
    }
  };

  // Doctor Diagnosis Modal for Patient inside Doctor's Room
  const [diagnosingTx, setDiagnosingTx] = useState<Transaction | null>(null);
  const [doctorNotesText, setDoctorNotesText] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Patient Exit & Refund Modal (زرار خروج واسترجاع الكشف)
  const [exitingTx, setExitingTx] = useState<Transaction | null>(null);
  const [selectedExitReasonId, setSelectedExitReasonId] = useState<string>(
    PATIENT_EXIT_REASONS[0].id
  );
  const [refundEnabled, setRefundEnabled] = useState<boolean>(true);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [exitCustomNotes, setExitCustomNotes] = useState<string>('');
  const [isProcessingExit, setIsProcessingExit] = useState<boolean>(false);

  // Quick Add Waiting / Pre-booked Patient Modal
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<ServiceType>('consultation');
  const [bookingArrivalMode, setBookingArrivalMode] = useState<'immediate' | 'scheduled'>(
    'immediate'
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [patientPhoneSearch, setPatientPhoneSearch] = useState<string>('');
  const [quickNewPatientMode, setQuickNewPatientMode] = useState(false);
  const [pFullName, setPFullName] = useState('');
  const [pPhone, setPPhone] = useState('05');
  const [bTitle, setBTitle] = useState('كشف استشاري أولي');
  const [bTime, setBTime] = useState(getCurrentTimeHHMM());
  const [bAmount, setBAmount] = useState<number>(settings.consultationPrice);
  const [bPaidAmount, setBPaidAmount] = useState<number>(settings.consultationPrice);
  const [bPaymentMethod, setBPaymentMethod] = useState<PaymentMethod>('mada');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const filteredBookingPatients = useMemo(() => {
    const q = patientPhoneSearch.trim().toLowerCase();
    if (!q) return [];
    return patients.filter(
      (p) =>
        p.phone.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.fileNumber.toLowerCase().includes(q) ||
        (p.nationalId && p.nationalId.toLowerCase().includes(q))
    );
  }, [patients, patientPhoneSearch]);

  const selectedBookingPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || null,
    [patients, selectedPatientId]
  );

  const handlePatientPhoneSearchChange = (val: string) => {
    setPatientPhoneSearch(val);
    const q = val.trim().toLowerCase();
    if (!q) {
      setSelectedPatientId('');
      return;
    }
    const matches = patients.filter(
      (p) =>
        p.phone.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.fileNumber.toLowerCase().includes(q) ||
        (p.nationalId && p.nationalId.toLowerCase().includes(q))
    );
    if (matches.length === 1) {
      setSelectedPatientId(matches[0].id);
    } else if (!matches.some((m) => m.id === selectedPatientId)) {
      setSelectedPatientId(matches[0]?.id ?? '');
    }
  };

  const surgeryCatalogItems = useMemo(
    () => parseSurgeryCatalog(settings.surgeryCatalog),
    [settings.surgeryCatalog]
  );

  // Filter transactions for the selected date
  const dayTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.date === selectedDate && t.status !== 'cancelled')
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [transactions, selectedDate]);

  // All Lounge Seat Occupants (both seated waiting patients AND pre-booked scheduled patients)
  const loungeSeatOccupants = useMemo(
    () =>
      dayTransactions.filter(
        (t) =>
          (t.status === 'waiting' || t.status === 'scheduled') &&
          !(
            walkingAnim?.tx.id === t.id &&
            (walkingAnim.direction === 'to_doctor' || walkingAnim.direction === 'to_exit')
          )
      ),
    [dayTransactions, walkingAnim]
  );

  // Patients who have actually arrived and are seated in the Waiting Lounge
  const waitingPatients = useMemo(
    () => loungeSeatOccupants.filter((t) => !isPreBookedUnarrived(t)),
    [loungeSeatOccupants, checkedInIds, todayISO]
  );

  // Pre-booked patients whose chair is reserved & empty awaiting Check-in ("حضور")
  const preBookedPatients = useMemo(
    () => loungeSeatOccupants.filter((t) => isPreBookedUnarrived(t)),
    [loungeSeatOccupants, checkedInIds, todayISO]
  );

  // Patients currently inside the Doctor's Room
  const inRoomPatients = useMemo(
    () =>
      dayTransactions.filter(
        (t) =>
          t.status === 'in_progress' &&
          !(walkingAnim?.tx.id === t.id && walkingAnim.direction === 'to_exit')
      ),
    [dayTransactions, walkingAnim]
  );

  // Automatically clear doctorOnBreak if a patient is inside the Doctor's room
  useEffect(() => {
    if (inRoomPatients.length > 0 && doctorOnBreak) {
      setDoctorOnBreak(false);
      try {
        localStorage.setItem(DOCTOR_BREAK_STORAGE_KEY, 'false');
      } catch {
        // ignore
      }
    }
  }, [inRoomPatients.length, doctorOnBreak]);

  const isDoctorBreakActive = doctorOnBreak && inRoomPatients.length === 0;

  // Completed patients on the selected date
  const completedPatients = useMemo(
    () => dayTransactions.filter((t) => t.status === 'completed'),
    [dayTransactions]
  );

  // Cancelled / Refunded patients on the selected date
  const exitedOrRefundedPatients = useMemo(
    () =>
      transactions
        .filter((t) => t.date === selectedDate && t.status === 'cancelled')
        .sort((a, b) => b.time.localeCompare(a.time)),
    [transactions, selectedDate]
  );

  // Build Seat Array (Minimum 8 seats, expands in multiples of 4 if more patients are in lounge)
  const totalSeatsCount = Math.max(8, Math.ceil((loungeSeatOccupants.length + 2) / 4) * 4);
  const loungeSeats = useMemo(() => {
    return Array.from({ length: totalSeatsCount }, (_, index) => {
      const occupant = loungeSeatOccupants[index] || null;
      return {
        seatNumber: index + 1,
        occupant,
      };
    });
  }, [totalSeatsCount, loungeSeatOccupants]);

  // Action 0: Check-in a Pre-Booked Patient ("زرار حضور") -> Stickman arrives & sits on his chair and Waiting Timer starts from 00:00
  const handleCheckInPreBookedPatient = async (tx: Transaction) => {
    if (arrivingTxId || walkingAnim) return;
    setArrivingTxId(tx.id);

    setTimeout(async () => {
      const arrivalTimestamp = Date.now();

      setSeatedTimestamps((prev) => {
        const updated = { ...prev, [tx.id]: arrivalTimestamp };
        try {
          localStorage.setItem(SEATED_TIMESTAMPS_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      setCheckedInIds((prev) => {
        const updated = { ...prev, [tx.id]: true };
        try {
          localStorage.setItem(CHECKED_IN_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      const cleanedNotes = (tx.receptionNotes || '').replace('حجز مسبق', 'حضر بالصالة').trim();

      await onUpdateTransactionPaymentAndStatus(tx, {
        paidAmount: tx.paidAmount,
        paymentMethod: tx.paymentMethod,
        status: 'waiting',
        receptionNotes: cleanedNotes,
      });

      setArrivingTxId(null);
    }, 850);
  };

  // Action 1: Reception or Doctor sends a waiting patient into the Doctor's Room
  const handleSendPatientToDoctorRoom = async (tx: Transaction) => {
    if (walkingAnim) return;

    // Prevent admitting more than 1 patient into the Doctor's Room at the same time
    if (inRoomPatients.length > 0) {
      playBreakBlockedAlertSound();
      setBreakAlertBanner({
        type: 'blocked',
        message: `عذراً، لا يمكن إدخال أكثر من مريض في نفس الوقت — يتواجد حالياً المريض «${inRoomPatients[0].patientName}» داخل غرفة الطبيب.`,
      });
      return;
    }

    // Refuse admission if Doctor is currently on break ("استراحة")
    if (isDoctorBreakActive) {
      playBreakBlockedAlertSound();
      setBreakAlertBanner({
        type: 'blocked',
        message: `عذراً، النظام يرفض إدخال المريض «${tx.patientName}» حالياً — الدكتور (${settings.doctorName}) في استراحة. يرجى الانتظار حتى ضغط الطبيب على زر «العودة للعمل».`,
      });
      return;
    }

    setWalkingAnim({ tx, direction: 'to_doctor' });

    // Let the Stickman walk across the corridor for 1.35 seconds before entering the room
    setTimeout(async () => {
      await onUpdateTransactionPaymentAndStatus(tx, {
        paidAmount: tx.paidAmount,
        paymentMethod: tx.paymentMethod,
        status: 'in_progress',
        receptionNotes: tx.receptionNotes,
      });
      setWalkingAnim(null);
    }, 1350);
  };

  // Action 2: Complete Examination & Patient Walks Out of Doctor's Room (Doctor Role Only)
  const handleCompletePatientVisit = async (tx: Transaction, customNotes?: string) => {
    if (walkingAnim || role !== 'doctor') return;
    setWalkingAnim({ tx, direction: 'to_exit' });

    setTimeout(async () => {
      if (customNotes !== undefined) {
        await onUpdateDoctorNotes(tx, customNotes, 'completed');
      } else {
        await onUpdateTransactionPaymentAndStatus(tx, {
          paidAmount: tx.paidAmount,
          paymentMethod: tx.paymentMethod,
          status: 'completed',
          receptionNotes: tx.receptionNotes,
        });
      }
      setWalkingAnim(null);
    }, 1300);
  };

  // Action 3: Return Patient from Doctor's Room back to Waiting Lounge Seat (Doctor Role Only)
  const handleReturnToWaitingLounge = async (tx: Transaction) => {
    if (walkingAnim || role !== 'doctor') return;
    setWalkingAnim({ tx, direction: 'to_waiting' });

    setTimeout(async () => {
      const freshSeatedTime = Date.now();
      setSeatedTimestamps((prev) => {
        const updated = { ...prev, [tx.id]: freshSeatedTime };
        try {
          localStorage.setItem(SEATED_TIMESTAMPS_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
      await onUpdateTransactionPaymentAndStatus(tx, {
        paidAmount: tx.paidAmount,
        paymentMethod: tx.paymentMethod,
        status: 'waiting',
        receptionNotes: tx.receptionNotes,
      });
      setWalkingAnim(null);
    }, 1100);
  };

  // Action 4: Open Exit & Refund Modal (Waiting lounge: Reception or Doctor; Inside Doctor's Room: Doctor Only)
  const openExitPatientModal = (tx: Transaction) => {
    if (tx.status === 'in_progress' && role !== 'doctor') return;
    const defaultReason = PATIENT_EXIT_REASONS[0];
    setExitingTx(tx);
    setSelectedExitReasonId(defaultReason.id);
    const shouldRefund = defaultReason.defaultRefund && tx.paidAmount > 0;
    setRefundEnabled(shouldRefund);
    setRefundAmount(shouldRefund ? tx.paidAmount : 0);
    setExitCustomNotes('');
  };

  const handleSelectExitReason = (reasonOption: PatientExitReasonOption) => {
    setSelectedExitReasonId(reasonOption.id);
    if (exitingTx) {
      const shouldRefund = reasonOption.defaultRefund && exitingTx.paidAmount > 0;
      setRefundEnabled(shouldRefund);
      setRefundAmount(shouldRefund ? exitingTx.paidAmount : 0);
    }
  };

  const handleConfirmPatientExit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitingTx || isProcessingExit) return;
    setIsProcessingExit(true);

    const txToExit = exitingTx;
    const chosenReason =
      PATIENT_EXIT_REASONS.find((r) => r.id === selectedExitReasonId) ||
      PATIENT_EXIT_REASONS[0];

    const actualRefund =
      refundEnabled && txToExit.paidAmount > 0
        ? Math.max(0, Math.min(txToExit.paidAmount, Number(refundAmount) || 0))
        : 0;
    const newPaidAmount = Math.max(0, txToExit.paidAmount - actualRefund);

    // If a refund is issued, mark status as 'cancelled' unless the reason was fast_service_done without refund
    const finalStatus: VisitStatus =
      actualRefund > 0 ? 'cancelled' : chosenReason.resultingStatus;

    const noteParts: string[] = [`خروج — السبب: ${chosenReason.label}`];
    if (actualRefund > 0) {
      noteParts.push(`مرتجع كشف: تم إرجاع مبلغ ${actualRefund} ر.س للمريض`);
    }
    if (exitCustomNotes.trim()) {
      noteParts.push(exitCustomNotes.trim());
    }
    const combinedNotes = noteParts.join(' | ');

    setExitingTx(null);
    setIsProcessingExit(false);
    setWalkingAnim({ tx: txToExit, direction: 'to_exit' });

    setTimeout(async () => {
      await onUpdateTransactionPaymentAndStatus(txToExit, {
        paidAmount: newPaidAmount,
        paymentMethod: txToExit.paymentMethod,
        status: finalStatus,
        receptionNotes: combinedNotes,
      });
      setWalkingAnim(null);
    }, 1150);
  };

  const openQuickAddBooking = () => {
    setBookingType('consultation');
    setBookingArrivalMode(selectedDate > todayISO ? 'scheduled' : 'immediate');
    setPatientPhoneSearch('');
    setSelectedPatientId('');
    setQuickNewPatientMode(patients.length === 0);
    setPFullName('');
    setPPhone('05');
    setBTitle('كشف استشاري أولي');
    setBTime(getCurrentTimeHHMM());
    setBAmount(settings.consultationPrice);
    setBPaidAmount(settings.consultationPrice);
    setBPaymentMethod('mada');
    setShowAddBookingModal(true);
  };

  const handleSaveNewWaitingBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingBooking) return;
    setIsSubmittingBooking(true);
    try {
      let targetPatient = patients.find((p) => p.id === selectedPatientId) || null;
      if (quickNewPatientMode) {
        if (!pFullName.trim() || !pPhone.trim()) {
          setIsSubmittingBooking(false);
          return;
        }
        const nextNum = 1001 + patients.length;
        targetPatient = await onAddPatient({
          fileNumber: `MRN-${nextNum}`,
          fullName: pFullName.trim(),
          phone: pPhone.trim(),
          nationalId: '',
          age: 32,
          gender: 'male',
          notes: '',
        });
      }

      if (!targetPatient) {
        setIsSubmittingBooking(false);
        return;
      }

      const safeAmount = Math.max(0, Number(bAmount) || 0);
      const safePaid = Math.max(0, Math.min(safeAmount, Number(bPaidAmount) || 0));
      const paymentStatus =
        safePaid >= safeAmount && safeAmount > 0
          ? 'paid'
          : safePaid > 0
          ? 'partial'
          : 'unpaid';

      const invSeq = 101 + transactions.length;
      const year = new Date().getFullYear();
      const isScheduledMode = bookingArrivalMode === 'scheduled';

      await onCreateTransaction({
        patientId: targetPatient.id,
        patientName: targetPatient.fullName,
        patientPhone: targetPatient.phone,
        patientFileNumber: targetPatient.fileNumber,
        type: bookingType,
        title: bTitle.trim() || SERVICE_TYPE_LABELS[bookingType],
        date: selectedDate,
        time: bTime,
        amount: safeAmount,
        paidAmount: safePaid,
        paymentMethod: bPaymentMethod,
        paymentStatus,
        status: isScheduledMode ? 'scheduled' : 'waiting',
        receptionNotes: isScheduledMode ? 'حجز مسبق من صالة المرضى' : 'حضور فوري بصالة المرضى',
        doctorNotes: '',
        invoiceNumber: `INV-${year}-${invSeq}`,
      });

      setShowAddBookingModal(false);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const openDiagnosisModal = (tx: Transaction) => {
    setDiagnosingTx(tx);
    setDoctorNotesText(tx.doctorNotes || '');
  };

  const handleSaveDiagnosisAndComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosingTx || isSavingNotes) return;
    setIsSavingNotes(true);
    const txToComplete = diagnosingTx;
    const notes = doctorNotesText.trim();
    setDiagnosingTx(null);
    setIsSavingNotes(false);
    await handleCompletePatientVisit(txToComplete, notes);
  };

  return (
    <div className="space-y-3">
      {/* Compact Top Bar: Title, Color Legend, Date Selector, and Quick Add Button */}
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">
              صالة المرضى ومحاكاة غرفة الطبيب المباشرة
            </h1>
            <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              محاكاة تفاعلية حية
            </span>
          </div>
          <span className="hidden xl:inline text-slate-300">|</span>
          <div className="hidden xl:flex items-center gap-2.5 text-[11px] text-slate-500">
            <span>سماوي: الطبيب</span>
            <span>·</span>
            <span>تركواز: كشف / متابعة</span>
            <span>·</span>
            <span>كهرماني: عملية جراحية</span>
          </div>
        </div>

        {/* Date Picker & Quick Add Patient */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span className="text-xs font-medium text-slate-600">تاريخ العرض:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-mono tabular-nums font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
            />
            {selectedDate !== todayISO && (
              <button
                type="button"
                onClick={() => setSelectedDate(todayISO)}
                className="text-[11px] font-medium text-teal-700 hover:underline mr-1 cursor-pointer"
              >
                (العودة لليوم)
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={openQuickAddBooking}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ إجلاس مريض جديد بالصالة</span>
          </button>
        </div>
      </div>

      {/* Break Alert / Doctor Returned to Work Notification Banner */}
      <AnimatePresence>
        {breakAlertBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`px-4 py-3 rounded-lg border flex items-center justify-between gap-3 ${
              breakAlertBanner.type === 'blocked'
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : breakAlertBanner.type === 'returned'
                ? 'bg-teal-50 border-teal-300 text-teal-900'
                : breakAlertBanner.type === 'summoned'
                ? 'bg-purple-50 border-purple-300 text-purple-900'
                : 'bg-sky-50 border-sky-300 text-sky-900'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-bold">
              {breakAlertBanner.type === 'blocked' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : breakAlertBanner.type === 'returned' ? (
                <BellRing className="w-4 h-4 text-teal-700 shrink-0 animate-bounce" />
              ) : breakAlertBanner.type === 'summoned' ? (
                <BellRing className="w-4 h-4 text-purple-700 shrink-0 animate-bounce" />
              ) : (
                <Coffee className="w-4 h-4 text-sky-600 shrink-0" />
              )}
              <span>{breakAlertBanner.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setBreakAlertBanner(null)}
              className="p-1 rounded hover:bg-black/5 text-current cursor-pointer"
              title="إغلاق التنبيه"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MAIN WORKSPACE: FULL SIMULATION + VERTICAL STATUS COLUMN (LEFT OR RIGHT)
         ===================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* ===================================================================
            MAIN INTERACTIVE SIMULATION (10 COLUMNS ON XL)
            Ordered 1st in RTL when stats column is on the LEFT, or 2nd when on the RIGHT
           =================================================================== */}
        <div
          className={`xl:col-span-10 bg-white border border-slate-200 rounded-lg overflow-hidden ${
            statsColumnSide === 'right' ? 'xl:order-2' : 'xl:order-1'
          }`}
        >
          {/* Walking Animation Banner / Corridor Stage */}
          <AnimatePresence>
            {walkingAnim && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-teal-50/70 border-b border-teal-200 px-5 py-3 overflow-hidden"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between text-xs font-semibold text-teal-900 mb-1.5">
                    <span>
                      {walkingAnim.direction === 'to_doctor'
                        ? `يتحرك الآن المريض «${walkingAnim.tx.patientName}» من مقعد الانتظار إلى غرفة الطبيب...`
                        : walkingAnim.direction === 'to_exit'
                        ? `يغادر المريض «${walkingAnim.tx.patientName}» الآن باتجاه بوابة الخروج...`
                        : `يعود المريض «${walkingAnim.tx.patientName}» إلى مقاعد صالة الانتظار...`}
                    </span>
                    <span className="font-mono tabular-nums">
                      {SERVICE_TYPE_LABELS[walkingAnim.tx.type]} · {walkingAnim.tx.time}
                    </span>
                  </div>

                  {/* Animated Corridor Track */}
                  <div className="relative h-28 bg-white border border-slate-200 rounded-lg px-8 flex items-center overflow-hidden">
                    <div className="absolute inset-x-10 bottom-4 border-b-2 border-dashed border-slate-300" />
                    <div className="absolute right-4 top-2 text-[11px] font-bold text-slate-500">
                      صالة الانتظار
                    </div>
                    <div className="absolute left-4 top-2 text-[11px] font-bold text-teal-800">
                      {walkingAnim.direction === 'to_exit' ? 'بوابة الخروج' : 'باب غرفة الطبيب'}
                    </div>

                    <motion.div
                      initial={{
                        x: walkingAnim.direction === 'to_doctor' ? -40 : -450,
                      }}
                      animate={{
                        x: walkingAnim.direction === 'to_doctor' ? -460 : -40,
                      }}
                      transition={{ duration: 1.25, ease: 'easeInOut' }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div className="px-2.5 py-0.5 bg-slate-900 text-white rounded text-[11px] font-semibold whitespace-nowrap mb-1 shadow-xs">
                        {walkingAnim.tx.patientName} ({SERVICE_TYPE_LABELS[walkingAnim.tx.type]})
                      </div>
                      <WalkingStickmanSVG
                        color={walkingAnim.tx.type === 'surgery' ? '#B45309' : '#0F766E'}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main 2-Zone Floorplan Grid: Zone A (Waiting Lounge Chairs) + Zone B (Doctor's Room) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x xl:divide-x-reverse divide-slate-200">
            {/* ZONE A: WAITING LOUNGE SEATS (7 Columns on XL) */}
            <div className="xl:col-span-7 p-4 space-y-3 bg-slate-50/40">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    صالة انتظار المرضى ({waitingPatients.length} مريض جالس حالياً
                    {preBookedPatients.length > 0
                      ? ` · ${preBookedPatients.length} حجز مسبق بانتظار الحضور`
                      : ''}
                    )
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    المقاعد المرقمة في صالة الانتظار ليوم ({selectedDate})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openQuickAddBooking}
                  className="px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded transition-colors cursor-pointer"
                >
                  + حجز مقعد جديد
                </button>
              </div>

              {/* Chairs Grid (All 8 seats visible comfortably in 2 rows of 4) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {loungeSeats.map(({ seatNumber, occupant }) => {
                  if (!occupant) {
                    return (
                      <div
                        key={`seat-${seatNumber}`}
                        onClick={openQuickAddBooking}
                        className="group bg-white/70 hover:bg-white border border-dashed border-slate-200 hover:border-teal-600 rounded-lg p-2.5 flex flex-col items-center justify-between min-h-48 transition-colors cursor-pointer"
                        title="اضغط لإجلاس مريض جديد أو حجز موعد مسبق في هذا المقعد"
                      >
                        <div className="text-[11px] text-slate-400 group-hover:text-teal-700 font-medium mt-1">
                          مقعد شاغر #{seatNumber}
                        </div>
                        <EmptyChairSVG seatNumber={seatNumber} />
                        <div className="text-[10px] text-slate-300 group-hover:text-teal-600">
                          اضغط للحجز
                        </div>
                      </div>
                    );
                  }

                  const isSurgery = occupant.type === 'surgery';
                  const stickmanColor = isSurgery ? '#B45309' : '#0F766E';
                  const remaining = Math.max(0, occupant.amount - occupant.paidAmount);
                  const isPreBooked = isPreBookedUnarrived(occupant);
                  const isArrivingNow = arrivingTxId === occupant.id;
                  const seatedStartMs = seatedTimestamps[occupant.id] || nowMs;
                  const elapsedWaitingMs = Math.max(0, nowMs - seatedStartMs);

                  return (
                    <motion.div
                      key={occupant.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`bg-white border rounded-lg p-2.5 flex flex-col justify-between min-h-48 transition-colors relative ${
                        isPreBooked
                          ? 'border-amber-200 hover:border-teal-600'
                          : 'border-slate-200 hover:border-teal-700'
                      }`}
                    >
                      {/* Top Status / Timer Strip */}
                      {isPreBooked ? (
                        <div
                          className="mb-1 bg-amber-50 border border-amber-200/90 text-amber-800 rounded px-2 py-0.5 flex items-center justify-between gap-1"
                          title="حجز موعد مسبق — الكرسي فارغ لحين حضور المريض والضغط على زر حضور"
                        >
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold">
                            <Calendar className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                            <span>حجز مسبق</span>
                          </span>
                          <span className="text-[10px] font-medium text-amber-700">
                            بانتظار الحضور
                          </span>
                        </div>
                      ) : (
                        <div
                          className="mb-1 bg-rose-50 border border-rose-200/90 text-rose-600 rounded px-2 py-0.5 flex items-center justify-between gap-1"
                          title="مدة انتظار المريض منذ جلوسه على الكرسي في صالة الانتظار"
                        >
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                            <Clock className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                            <span>وقت الانتظار</span>
                          </span>
                          <span className="text-[11px] font-mono tabular-nums font-bold text-rose-600 tracking-tight">
                            {formatWaitingDuration(elapsedWaitingMs)}
                          </span>
                        </div>
                      )}

                      {/* Floating Patient Data Badge Above the Chair */}
                      <div className="bg-slate-50 border border-slate-200 rounded p-1.5 text-right space-y-0.5">
                        <div className="flex items-center justify-between gap-1 text-[10px] font-mono tabular-nums text-slate-500">
                          <span>مقعد #{seatNumber}</span>
                          <span>{occupant.time}</span>
                        </div>
                        <div
                          className="text-xs font-bold text-slate-900 truncate"
                          title={occupant.patientName}
                        >
                          {occupant.patientName}
                        </div>
                        <div className="text-[10px] text-slate-600 truncate">
                          {SERVICE_TYPE_LABELS[occupant.type]}
                        </div>
                        <div className="text-[10px] font-mono tabular-nums flex items-center justify-between pt-0.5 border-t border-slate-200/80">
                          <span className="text-teal-700 font-semibold">
                            {formatSAR(occupant.paidAmount)}
                          </span>
                          {remaining > 0 ? (
                            <span className="text-amber-700">متبقي {formatSAR(remaining)}</span>
                          ) : (
                            <span className="text-slate-400">خالص</span>
                          )}
                        </div>
                      </div>

                      {/* Middle Illustration: Empty Chair if Pre-booked, Walking Stickman when Arriving, or Seated Stickman */}
                      <div className="my-0.5 relative">
                        {isArrivingNow ? (
                          <motion.div
                            initial={{ x: 28, opacity: 0.4 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-16 h-20 flex items-center justify-center">
                              <WalkingStickmanSVG color={stickmanColor} />
                            </div>
                          </motion.div>
                        ) : isPreBooked ? (
                          <div
                            className="relative"
                            title="الكرسي فارغ — اضغط على «حضور» عند وصول المريض ليجلس ويبدأ حساب وقت الانتظار"
                          >
                            <EmptyChairSVG seatNumber={seatNumber} />
                          </div>
                        ) : (
                          <SeatedStickmanSVG color={stickmanColor} isSurgery={isSurgery} />
                        )}
                      </div>

                      {/* Action Buttons Below the Chair */}
                      <div className="space-y-1">
                        {isPreBooked ? (
                          <button
                            type="button"
                            disabled={Boolean(walkingAnim) || isArrivingNow}
                            onClick={() => handleCheckInPreBookedPatient(occupant)}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 text-[11px] font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors disabled:opacity-50 cursor-pointer"
                            title="تسجيل حضور المريض وإجلاسه على الكرسي لبدء عداد وقت الانتظار"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{isArrivingNow ? 'جاري الجلوس...' : 'حضور'}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={Boolean(walkingAnim)}
                            onClick={() => handleSendPatientToDoctorRoom(occupant)}
                            className="w-full inline-flex items-center justify-center gap-1 py-1 px-2 text-[11px] font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <span>إدخال للطبيب</span>
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={Boolean(walkingAnim) || isArrivingNow}
                          onClick={() => openExitPatientModal(occupant)}
                          className="w-full inline-flex items-center justify-center gap-1 py-0.5 px-2 text-[11px] font-medium text-slate-700 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 rounded transition-colors disabled:opacity-50 cursor-pointer"
                          title="تسجيل خروج المريض واختيار سبب المغادرة أو استرجاع مبلغ الكشف"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>خروج</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ZONE B: DOCTOR'S EXAMINATION ROOM SIMULATION (5 Columns on XL) */}
            <div className="xl:col-span-5 p-4 space-y-3 bg-white flex flex-col justify-between">
              <div className="space-y-3">
                {/* Doctor Room Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      غرفة الطبيب المدير — {settings.doctorName}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {settings.specialty} · يظهر هنا المريض فور إدخاله من الريسبشن
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isDoctorBreakActive && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded">
                        <Coffee className="w-3 h-3 shrink-0" />
                        <span>في استراحة</span>
                      </span>
                    )}
                    <span className="text-xs font-mono tabular-nums font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded">
                      داخل الغرفة: {inRoomPatients.length}
                    </span>
                  </div>
                </div>

                {/* Architectural Interior of the Doctor's Room */}
                <div className="border border-slate-200 rounded-lg bg-slate-50/60 p-3.5 space-y-3 relative overflow-hidden">
                  {/* Room Door Indicator on Right Wall with Turquoise Door Icon */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-dashed border-slate-200 pb-2">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                      <DoorOpen className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>مدخل غرفة الكشف من الصالة</span>
                    </span>
                    <span>
                      {isDoctorBreakActive ? 'الطبيب في استراحة حالياً' : 'مكتب الاستشاري والفحص السريري'}
                    </span>
                  </div>

                  {/* UNIFIED CONSULTATION STAGE: Doctor Seated at Desk + Visitor Chair Opposite Doctor */}
                  <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                    {/* Top Labels Aligned with the Two Sides of the Consultation Desk */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      {/* Right Label (Above Visitor Chair) */}
                      <div className="text-right">
                        {inRoomPatients[0] ? (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-[11px] font-bold text-teal-900">
                            <span>كرسي المريض: {inRoomPatients[0].patientName}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-500">
                            <span>كرسي المريض المقابل للطبيب (شاغر)</span>
                          </div>
                        )}
                      </div>

                      {/* Left Label (Above Doctor's Executive Chair) */}
                      <div className="text-left">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-50 border border-sky-200/80 text-[11px] font-bold text-sky-900">
                          <span>{settings.doctorName}</span>
                          <span className="text-[10px] font-normal text-sky-600">
                            {isDoctorBreakActive ? '(في استراحة)' : '(مكتب الطبيب)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive SVG Scene: Patient sits on the chair across the desk facing the Doctor, and Standing Female Receptionist appears when summoned */}
                    <div>
                      <DoctorDeskStickmanSVG
                        patientInRoom={inRoomPatients[0] || null}
                        isOnBreak={isDoctorBreakActive}
                        receptionistInRoom={receptionistSummoned}
                        receptionistLeaving={receptionistLeaving}
                      />
                    </div>
                  </div>

                  {/* Patient Control Card & Role-Based Action Buttons Below the Consultation Scene */}
                  <div className="space-y-2.5">
                    {inRoomPatients.length === 0 ? (
                      <div
                        className={`border border-dashed rounded-lg p-4 text-center space-y-1.5 flex flex-col items-center justify-center ${
                          isDoctorBreakActive
                            ? 'bg-sky-50/70 border-sky-300'
                            : 'bg-white/90 border-slate-300'
                        }`}
                      >
                        {isDoctorBreakActive ? (
                          <>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-900">
                              <Coffee className="w-4 h-4 text-sky-600 shrink-0" />
                              <span>الطبيب في استراحة حالياً</span>
                            </div>
                            <p className="text-[11px] text-sky-700">
                              {role === 'doctor'
                                ? 'اضغط على زر «العودة للعمل» بالأسفل عند انتهاء الاستراحة لإشعار الريسبشن صوتياً'
                                : 'يرفض النظام إدخال أي مريض من الصالة مؤقتاً لحين عودة الطبيب للعمل'}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="text-xs font-semibold text-slate-700">
                              غرفة الطبيب جاهزة لاستقبال المريض التالي على الكرسي المقابل للمكتب
                            </div>
                            <p className="text-[11px] text-slate-400">
                              اضغط على «إدخال للطبيب» لأي مريض جالس في صالة الانتظار ليدخل ويجلس أمام الدكتور
                            </p>
                            {waitingPatients.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleSendPatientToDoctorRoom(waitingPatients[0])}
                                className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                              >
                                <span>استدعاء المريض التالي ({waitingPatients[0].patientName})</span>
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <AnimatePresence>
                        {inRoomPatients.map((patientInRoom) => (
                          <motion.div
                            key={patientInRoom.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white border-2 border-teal-700 rounded-lg p-3 space-y-2.5"
                          >
                            {/* Patient Info Header */}
                            <div className="bg-teal-50/70 border border-teal-200 rounded-md p-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-semibold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
                                    جالس الآن أمام الطبيب
                                  </span>
                                  <span className="text-[11px] font-mono tabular-nums text-slate-500">
                                    {patientInRoom.time}
                                  </span>
                                </div>
                                <div className="text-sm font-bold text-slate-900">
                                  {patientInRoom.patientName}
                                </div>
                                <div className="text-[11px] text-slate-600">
                                  {SERVICE_TYPE_LABELS[patientInRoom.type]}: {patientInRoom.title}
                                </div>
                              </div>

                              <div className="sm:text-left space-y-0.5 border-t sm:border-t-0 border-teal-200/60 pt-1.5 sm:pt-0">
                                <div className="text-[11px] font-mono tabular-nums font-semibold text-slate-700">
                                  {patientInRoom.patientFileNumber}
                                </div>
                                <div className="text-[11px] font-mono tabular-nums text-slate-500">
                                  {patientInRoom.patientPhone}
                                </div>
                                <div className="text-[11px] font-mono tabular-nums font-bold text-teal-700">
                                  المدفوع: {formatSAR(patientInRoom.paidAmount)}
                                </div>
                              </div>
                            </div>

                            {patientInRoom.doctorNotes && (
                              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700">
                                <span className="font-semibold text-slate-900">التشخيص المسجل: </span>
                                {patientInRoom.doctorNotes}
                              </div>
                            )}

                            {/* Role-Gated Action Bar inside Doctor's Office:
                                Strictly for Doctor (`role === 'doctor'`).
                                Reception (`role === 'reception'`) has NO action buttons once patient is inside the Doctor's office. */}
                            {role === 'doctor' && (
                              <div className="space-y-1.5">
                                <button
                                  type="button"
                                  onClick={() => openDiagnosisModal(patientInRoom)}
                                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                                >
                                  <ClipboardList className="w-3.5 h-3.5 shrink-0" />
                                  <span>كتابة التشخيص الطبي وإنهاء الكشف</span>
                                </button>

                                <div className="grid grid-cols-3 gap-1.5">
                                  <button
                                    type="button"
                                    disabled={Boolean(walkingAnim)}
                                    onClick={() => handleCompletePatientVisit(patientInRoom)}
                                    className="inline-flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>إتمام وخروج</span>
                                  </button>

                                  <button
                                    type="button"
                                    disabled={Boolean(walkingAnim)}
                                    onClick={() => handleReturnToWaitingLounge(patientInRoom)}
                                    className="inline-flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                                    <span>إرجاع للصالة</span>
                                  </button>

                                  <button
                                    type="button"
                                    disabled={Boolean(walkingAnim)}
                                    onClick={() => openExitPatientModal(patientInRoom)}
                                    className="inline-flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium text-rose-700 bg-rose-50/70 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                                  >
                                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                                    <span>خروج / مرتجع</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>

              {/* ===============================================================
                  BOTTOM DOCTOR CONTROL BAR (Strictly for Doctor `role === 'doctor'`):
                  - "استراحة / العودة للعمل": Only shown when Doctor's office has NO patient (`inRoomPatients.length === 0`)
                  - "استدعاء / انصراف": Summon or dismiss the female receptionist (works whether Doctor has a patient or not)
                 =============================================================== */}
              {role === 'doctor' && (
                <div className="mt-3 p-3 rounded-lg border border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-end gap-2.5">
                  {/* Summon / Dismiss Receptionist Button ("استدعاء" / "انصراف") */}
                  {receptionistSummoned ? (
                    <button
                      type="button"
                      onClick={() => handleToggleSummonReceptionist(false)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors shrink-0 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>انصراف</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleSummonReceptionist(true)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors shrink-0 cursor-pointer"
                    >
                      <BellRing className="w-4 h-4 shrink-0" />
                      <span>استدعاء</span>
                    </button>
                  )}

                  {/* Break Button ("استراحة" / "العودة للعمل"): Hidden when a patient is in the room */}
                  {inRoomPatients.length === 0 &&
                    (isDoctorBreakActive ? (
                      <button
                        type="button"
                        onClick={() => handleToggleDoctorBreak(false)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors shrink-0 cursor-pointer"
                      >
                        <BellRing className="w-4 h-4 shrink-0" />
                        <span>العودة للعمل</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleDoctorBreak(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-md transition-colors shrink-0 cursor-pointer"
                      >
                        <Coffee className="w-4 h-4 shrink-0" />
                        <span>استراحة</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================================
            VERTICAL LIVE STATUS & COMPLETED VISITS COLUMN (2 COLUMNS ON XL)
            Placed vertically on the Left (default) or Right with 1-click toggle
           =================================================================== */}
        <aside
          className={`xl:col-span-2 space-y-3 ${
            statsColumnSide === 'right' ? 'xl:order-1' : 'xl:order-2'
          }`}
        >
          {/* Vertical Status Counters Card */}
          <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden">
            {/* Column Header + Left/Right Position Switcher */}
            <div className="px-3.5 py-2.5 bg-slate-50 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800">ملخص الصالة المباشر</span>
              <button
                type="button"
                onClick={toggleStatsColumnSide}
                className="text-[10px] font-medium text-teal-700 hover:text-teal-900 bg-white border border-slate-200 hover:border-teal-300 rounded px-2 py-0.5 transition-colors cursor-pointer"
                title="تغيير مكان العمود بين اليسار واليمين"
              >
                {statsColumnSide === 'left' ? 'نقل لليمين ⇄' : 'نقل لليسار ⇄'}
              </button>
            </div>

            {/* 1. المنتظرون على مقاعد الصالة */}
            <div className="p-3.5 space-y-1.5">
              <div className="text-xs text-slate-500">المنتظرون على مقاعد الصالة</div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold font-mono tabular-nums text-teal-700">
                  {waitingPatients.length}{' '}
                  <span className="text-xs font-normal text-slate-500">مريض جالس</span>
                </div>
              </div>
              {preBookedPatients.length > 0 && (
                <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 rounded px-2 py-0.5">
                  حجز مسبق بانتظار الحضور: {preBookedPatients.length}
                </div>
              )}
              <div className="text-[11px] font-mono tabular-nums text-slate-400">
                إجمالي المقاعد: {totalSeatsCount}
              </div>
            </div>

            {/* 2. داخل غرفة الطبيب الآن — د. صلاح قاري */}
            <div className="p-3.5 space-y-1.5 bg-sky-50/35">
              <div className="flex items-center justify-between gap-1">
                <div className="text-xs text-slate-500">داخل غرفة الطبيب الآن</div>
                {isDoctorBreakActive && (
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 border border-sky-300 px-1.5 py-0.5 rounded">
                    استراحة
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-sky-600">
                {inRoomPatients.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  {isDoctorBreakActive ? 'الطبيب في استراحة' : 'في الكشف / التحضير'}
                </span>
              </div>
              <div className="text-xs font-semibold text-sky-900 truncate">
                {settings.doctorName}
              </div>
              {inRoomPatients[0] && (
                <div className="text-[11px] text-teal-800 bg-teal-50 border border-teal-200/80 rounded px-2 py-1 truncate">
                  المريض: {inRoomPatients[0].patientName}
                </div>
              )}
            </div>

            {/* 3. تم الكشف والانتهاء */}
            <div className="p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">تم الكشف والانتهاء</span>
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {completedPatients.length}{' '}
                <span className="text-xs font-normal text-slate-500">زيارة مكتملة</span>
              </div>
              <div className="text-[11px] font-mono tabular-nums text-slate-400">
                تاريخ: {selectedDate}
              </div>
            </div>
          </div>

          {/* Vertical Completed & Exited Patients List */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800">
                المكتمل اليوم ({completedPatients.length})
              </span>
              <span className="text-[11px] text-slate-400">إيصالات</span>
            </div>

            {completedPatients.length === 0 ? (
              <div className="text-[11px] text-slate-400 py-2 text-center">
                لم تكتمل زيارات بعد في هذا التاريخ.
              </div>
            ) : (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pl-0.5">
                {completedPatients.map((cTx) => (
                  <div
                    key={cTx.id}
                    className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px]"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate" title={cTx.patientName}>
                        {cTx.patientName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {SERVICE_TYPE_LABELS[cTx.type]}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="font-mono tabular-nums text-teal-700 font-semibold text-[10px]">
                        {formatSAR(cTx.paidAmount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenInvoice(cTx)}
                        className="p-1 text-slate-500 hover:text-slate-900 border border-slate-200 bg-white rounded cursor-pointer"
                        title="عرض الإيصال"
                      >
                        <FileText className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {exitedOrRefundedPatients.length > 0 && (
              <div className="pt-2.5 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-rose-700">
                    خروج / مرتجع ({exitedOrRefundedPatients.length})
                  </span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pl-0.5">
                  {exitedOrRefundedPatients.map((rTx) => (
                    <div
                      key={rTx.id}
                      className="px-2.5 py-1.5 bg-rose-50/50 border border-rose-200/80 rounded text-[11px] space-y-0.5"
                    >
                      <div className="font-semibold text-slate-900 truncate">
                        {rTx.patientName}
                      </div>
                      <div className="text-[10px] font-mono tabular-nums text-rose-700 font-semibold">
                        {rTx.paidAmount === 0
                          ? 'مرتجع بالكامل'
                          : `متبقي: ${formatSAR(rTx.paidAmount)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* MODAL 1: Doctor Clinical Diagnosis & Complete Visit */}
      {diagnosingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                تسجيل التشخيص الطبي وإنهاء الكشف — {diagnosingTx.patientName}
              </h3>
              <button
                type="button"
                onClick={() => setDiagnosingTx(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDiagnosisAndComplete} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div className="font-semibold text-slate-900">
                  {SERVICE_TYPE_LABELS[diagnosingTx.type]}: {diagnosingTx.title}
                </div>
                <div className="text-slate-500 font-mono tabular-nums">
                  رقم الملف: {diagnosingTx.patientFileNumber} · الجوال: {diagnosingTx.patientPhone}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  التشخيص الطبي / التوصيات العلاجية / التقرير الجراحي
                </label>
                <textarea
                  rows={4}
                  required
                  value={doctorNotesText}
                  onChange={(e) => setDoctorNotesText(e.target.value)}
                  placeholder="اكتب التشخيص الطبي والعلاج الموصوف ليتم حفظه في ملف المريض..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setDiagnosingTx(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSavingNotes}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>حفظ التشخيص وخروج المريض (مكتمل)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Quick Add Patient to Waiting Lounge Chair */}
      {showAddBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                إجلاس مريض في صالة الانتظار ليوم ({selectedDate})
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBookingModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewWaitingBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-md">
                {(['consultation', 'followup', 'surgery'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setBookingType(type);
                      if (type === 'consultation') {
                        setBTitle('كشف استشاري أولي');
                        setBAmount(settings.consultationPrice);
                        setBPaidAmount(settings.consultationPrice);
                      } else if (type === 'followup') {
                        setBTitle('مراجعة ومتابعة طبية');
                        setBAmount(settings.followupPrice);
                        setBPaidAmount(settings.followupPrice);
                      } else {
                        if (surgeryCatalogItems.length > 0) {
                          setBTitle(surgeryCatalogItems[0].name);
                          setBAmount(surgeryCatalogItems[0].price);
                          setBPaidAmount(surgeryCatalogItems[0].price);
                        } else {
                          setBTitle('عملية جراحية تخصصية');
                          setBAmount(settings.defaultSurgeryPrice);
                          setBPaidAmount(settings.defaultSurgeryPrice);
                        }
                      }
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      bookingType === type
                        ? 'bg-teal-700 text-white'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {SERVICE_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>

              {/* Arrival Mode Selector: Immediate Seating vs Pre-Booked Appointment */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => setBookingArrivalMode('immediate')}
                  className={`py-1.5 px-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    bookingArrivalMode === 'immediate'
                      ? 'bg-white text-teal-800 shadow-xs border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  حضور فوري (يجلس الآن ويبدأ التايمر)
                </button>
                <button
                  type="button"
                  onClick={() => setBookingArrivalMode('scheduled')}
                  className={`py-1.5 px-2.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    bookingArrivalMode === 'scheduled'
                      ? 'bg-white text-amber-800 shadow-xs border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  حجز موعد مسبق (كرسي فاضي + زر حضور)
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">المريض / العميل</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickNewPatientMode(!quickNewPatientMode);
                      setSelectedPatientId('');
                      setPatientPhoneSearch('');
                    }}
                    className="text-xs font-medium text-teal-700 hover:underline cursor-pointer"
                  >
                    {quickNewPatientMode ? 'البحث عن عميل مسجل' : '+ تسجيل مريض جديد فوراً'}
                  </button>
                </div>

                {!quickNewPatientMode ? (
                  <div className="space-y-2">
                    {/* Search Input by Patient Name, Phone Number, or Code (MRN) */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-teal-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="search"
                        value={patientPhoneSearch}
                        onChange={(e) => handlePatientPhoneSearchChange(e.target.value)}
                        placeholder="ابحث بالاسم، رقم الهاتف (05xxxxxxxx)، أو كود العميل (MRN-1001)..."
                        className="w-full pr-9 pl-8 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700 transition-colors"
                      />
                      {patientPhoneSearch && (
                        <button
                          type="button"
                          onClick={() => handlePatientPhoneSearchChange('')}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="مسح البحث"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Show Selected Patient Card or Matching Search Results (NO pre-populated dropdown list) */}
                    {selectedBookingPatient && !patientPhoneSearch.trim() ? (
                      <div className="p-2.5 bg-teal-50/80 border border-teal-600 rounded-md flex items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-bold text-slate-900">
                            {selectedBookingPatient.fullName}
                          </div>
                          <div className="text-[11px] font-mono tabular-nums text-teal-800 mt-0.5">
                            الجوال: {selectedBookingPatient.phone} · الكود: {selectedBookingPatient.fileNumber}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPatientId('');
                            setPatientPhoneSearch('');
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded cursor-pointer"
                        >
                          تغيير العميل
                        </button>
                      </div>
                    ) : patientPhoneSearch.trim() !== '' ? (
                      filteredBookingPatients.length > 0 ? (
                        <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-md divide-y divide-slate-100 bg-white">
                          {filteredBookingPatients.map((p) => {
                            const isSelected = p.id === selectedPatientId;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPatientId(p.id);
                                  setPatientPhoneSearch('');
                                }}
                                className={`w-full px-3 py-2 text-right flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-teal-50 text-teal-950 font-bold'
                                    : 'hover:bg-slate-50 text-slate-800'
                                }`}
                              >
                                <span className="truncate">{p.fullName}</span>
                                <span className="font-mono tabular-nums text-[11px] text-teal-700 shrink-0">
                                  {p.phone} · {p.fileNumber}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md flex items-center justify-between gap-2 text-xs">
                          <span className="text-amber-900">
                            لا يوجد عميل مطابق للبحث «{patientPhoneSearch}»
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (/^[0-9+\s-]+$/.test(patientPhoneSearch.trim())) {
                                setPPhone(patientPhoneSearch.trim());
                              } else {
                                setPFullName(patientPhoneSearch.trim());
                              }
                              setQuickNewPatientMode(true);
                            }}
                            className="px-2.5 py-1 bg-teal-700 text-white font-semibold rounded hover:bg-teal-800 shrink-0 cursor-pointer"
                          >
                            + تسجيله كمريض جديد
                          </button>
                        </div>
                      )
                    ) : null}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <input
                      type="text"
                      required
                      value={pFullName}
                      onChange={(e) => setPFullName(e.target.value)}
                      placeholder="اسم المريض الرباعي *"
                      className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded"
                    />
                    <input
                      type="tel"
                      required
                      value={pPhone}
                      onChange={(e) => setPPhone(e.target.value)}
                      placeholder="رقم الجوال 05xxxxxxxx *"
                      className="px-3 py-1.5 text-xs font-mono tabular-nums bg-white border border-slate-200 rounded"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    البيان / الخدمة
                  </label>
                  <input
                    type="text"
                    required
                    value={bTitle}
                    onChange={(e) => setBTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    الوقت
                  </label>
                  <input
                    type="time"
                    required
                    value={bTime}
                    onChange={(e) => setBTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    التكلفة (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setBAmount(val);
                      setBPaidAmount(val);
                    }}
                    className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    المدفوع (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={bAmount}
                    value={bPaidAmount}
                    onChange={(e) => setBPaidAmount(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-mono tabular-nums font-bold text-teal-800 bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    وسيلة الدفع
                  </label>
                  <select
                    value={bPaymentMethod}
                    onChange={(e) => setBPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="mada">شبكة مدى</option>
                    <option value="cash">نقدي</option>
                    <option value="transfer">تحويل بنكي</option>
                    <option value="insurance">تأمين طبي</option>
                    <option value="tabby">تابي / تمارا</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  {isSubmittingBooking
                    ? 'جاري الحفظ...'
                    : bookingArrivalMode === 'scheduled'
                    ? 'تأكيد الحجز المسبق بالصالة'
                    : 'إجلاس المريض في الصالة الآن'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Patient Exit Reasons & Refund Consultation Fee (زرار خروج واسترجاع الكشف) */}
      {exitingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-lg overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  تسجيل خروج المريض من صالة الانتظار — {exitingTx.patientName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  اختر سبب مغادرة المريض مع إمكانية عمل مرتجع للكشف وإرجاع المبلغ المدفوع
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExitingTx(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPatientExit} className="p-6 space-y-5">
              {/* Patient & Visit Summary Strip */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    {exitingTx.patientName} ({exitingTx.patientFileNumber})
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {SERVICE_TYPE_LABELS[exitingTx.type]}: {exitingTx.title} · الوقت: {exitingTx.time}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-slate-500">المبلغ المدفوع</div>
                  <div className="text-sm font-bold font-mono tabular-nums text-teal-700">
                    {formatSAR(exitingTx.paidAmount)}
                  </div>
                </div>
              </div>

              {/* Comprehensive List of Exit Reasons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  سبب خروج المريض من صالة الانتظار:
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-0.5">
                  {PATIENT_EXIT_REASONS.map((reason) => {
                    const isSelected = selectedExitReasonId === reason.id;
                    return (
                      <label
                        key={reason.id}
                        onClick={() => handleSelectExitReason(reason)}
                        className={`flex items-center justify-between gap-3 p-3 rounded-md border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-teal-50/80 border-teal-700 text-slate-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="exitReason"
                            checked={isSelected}
                            onChange={() => handleSelectExitReason(reason)}
                            className="accent-teal-700"
                          />
                          <span>{reason.label}</span>
                        </div>
                        {reason.id === 'refund_requested' && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-100 text-rose-800 rounded shrink-0">
                            استرجاع الكشف
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Financial Refund Box (عمل مرتجع للكشف وإرجاع سعر الكشف للمريض) */}
              {exitingTx.paidAmount > 0 ? (
                <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-bold text-rose-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={refundEnabled}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setRefundEnabled(checked);
                          setRefundAmount(checked ? exitingTx.paidAmount : 0);
                        }}
                        className="w-4 h-4 accent-rose-700 rounded"
                      />
                      <Banknote className="w-4 h-4 text-rose-700" />
                      <span>عمل مرتجع للكشف وإرجاع سعر الكشف للمريض</span>
                    </label>
                    <span className="text-xs font-mono tabular-nums font-bold text-rose-800">
                      المدفوع: {formatSAR(exitingTx.paidAmount)}
                    </span>
                  </div>

                  {refundEnabled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-rose-200/80 items-end">
                      <div>
                        <label className="block text-[11px] font-medium text-rose-900 mb-1">
                          المبلغ المسترد للمريض (ر.س)
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={exitingTx.paidAmount}
                          value={refundAmount}
                          onChange={(e) =>
                            setRefundAmount(
                              Math.max(
                                0,
                                Math.min(exitingTx.paidAmount, Number(e.target.value) || 0)
                              )
                            )
                          }
                          className="w-full px-3 py-1.5 text-sm font-mono tabular-nums font-bold text-rose-800 bg-white border border-rose-300 rounded-md focus:outline-none focus:border-rose-700"
                        />
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2 pb-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setRefundAmount(exitingTx.paidAmount)}
                          className="px-2.5 py-1 bg-white border border-rose-300 text-rose-800 rounded hover:bg-rose-100 font-medium cursor-pointer"
                        >
                          إرجاع كامل المبلغ ({formatSAR(exitingTx.paidAmount)})
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center gap-2 text-xs text-slate-600">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>هذا الحجز غير مدفوع مسبقاً (المدفوع 0 ر.س)، سيتم تسجيل خروج المريض فقط.</span>
                </div>
              )}

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ملاحظات إضافية للاستقبال (اختياري)
                </label>
                <input
                  type="text"
                  value={exitCustomNotes}
                  onChange={(e) => setExitCustomNotes(e.target.value)}
                  placeholder="أضف أي تفاصيل إضافية حول سبب الخروج أو طريقة إرجاع المبلغ..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setExitingTx(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isProcessingExit}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-md transition-colors cursor-pointer ${
                    refundEnabled && exitingTx.paidAmount > 0 && refundAmount > 0
                      ? 'bg-rose-700 hover:bg-rose-800'
                      : 'bg-teal-700 hover:bg-teal-800'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>
                    {refundEnabled && exitingTx.paidAmount > 0 && refundAmount > 0
                      ? `تأكيد الخروج وإرجاع (${formatSAR(refundAmount)}) للمريض`
                      : 'تأكيد خروج المريض من الصالة'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
