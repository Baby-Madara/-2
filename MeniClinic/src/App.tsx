/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ShieldCheck,
  LogIn,
  LogOut,
  Calendar,
  Users,
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  Settings,
  Cloud,
  Menu,
  X,
  AlertCircle,
  Lock,
  UserCheck,
  Armchair,
  Volume2,
  VolumeX,
  BellRing,
  FileHeart,
} from 'lucide-react';
import {
  playGentleWaitingChime,
  playDoctorBackToWorkChime,
  playBreakBlockedAlertSound,
} from './utils/sound';
import {
  auth,
  db,
  googleProvider,
  OperationType,
  handleFirestoreError,
  sanitizeSettingsForCreate,
  sanitizePatientForCreate,
  sanitizeTransactionForCreate,
} from './firebase';
import {
  ClinicSettings,
  Patient,
  Transaction,
  PaymentMethod,
  VisitStatus,
  StaffSession,
  NavigationPage,
  getTodayISO,
} from './types';
import { ReceptionView } from './components/ReceptionView';
import { DoctorView } from './components/DoctorView';
import { CalendarView } from './components/CalendarView';
import { PatientsDatabaseView } from './components/PatientsDatabaseView';
import { PatientsLoungeView } from './components/PatientsLoungeView';
import { MedicalHistoryView } from './components/MedicalHistoryView';
import { InvoiceModal } from './components/InvoiceModal';
import {
  apiFetchBootstrap,
  apiSaveSettings,
  apiCreatePatient,
  apiUpdatePatient,
  apiCreateTransaction,
  apiUpdateTransaction,
  apiSeedDatabase,
} from './services/api';

const STORAGE_KEYS = {
  SETTINGS: 'shifaa_crm_settings_v3',
  PATIENTS: 'shifaa_crm_patients_v3',
  TRANSACTIONS: 'shifaa_crm_transactions_v3',
  SESSION: 'shifaa_crm_staff_session_v3',
};

function getInitialSettings(): ClinicSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        clinicOwnerId: parsed.clinicOwnerId || 'local_clinic',
        clinicName: parsed.clinicName || 'مركز شفاء الطبي والجراحي التخصصي',
        doctorName: parsed.doctorName || 'د. محمود حسين',
        specialty: parsed.specialty || 'استشاري الجراحة العامة والمناظير',
        phone: parsed.phone || '0501234567',
        city: parsed.city || 'الرياض',
        address:
          parsed.address ||
          'طريق الملك فهد - حي العليا، برج الرعاية الطبية، الدور الرابع',
        taxNumber: parsed.taxNumber ?? '310123456700003',
        consultationPrice: Number(parsed.consultationPrice ?? 250),
        followupPrice: Number(parsed.followupPrice ?? 100),
        defaultSurgeryPrice: Number(parsed.defaultSurgeryPrice ?? 4500),
        surgeryCatalog: Array.isArray(parsed.surgeryCatalog)
          ? parsed.surgeryCatalog
          : [
              'عملية استئصال المرارة بالمنظار الجراحي|5500',
              'عملية إصلاح الفتق الجراحي بالشبكة|4800',
              'إجراء جراحي موضعي تحت التخدير الموضعي|1500',
              'عملية الليزر الجراحي التخصصي|3800',
              'عملية منظار تشخيصي وعلاجي|3200',
            ],
        doctorUsername: parsed.doctorUsername || 'admin',
        doctorPassword: parsed.doctorPassword || '123',
        receptionUsername: parsed.receptionUsername || 'reception',
        receptionPassword: parsed.receptionPassword || '123',
        receptionName: parsed.receptionName || 'موظف الاستقبال الرئيسي',
      };
    }
  } catch {
    // ignore storage parse error
  }

  return {
    clinicOwnerId: 'local_clinic',
    clinicName: 'مركز شفاء الطبي والجراحي التخصصي',
    doctorName: 'د. محمود حسين',
    specialty: 'استشاري الجراحة العامة والمناظير',
    phone: '0501234567',
    city: 'الرياض',
    address: 'طريق الملك فهد - حي العليا، برج الرعاية الطبية، الدور الرابع',
    taxNumber: '310123456700003',
    consultationPrice: 250,
    followupPrice: 100,
    defaultSurgeryPrice: 4500,
    surgeryCatalog: [
      'عملية استئصال المرارة بالمنظار الجراحي|5500',
      'عملية إصلاح الفتق الجراحي بالشبكة|4800',
      'إجراء جراحي موضعي تحت التخدير الموضعي|1500',
      'عملية الليزر الجراحي التخصصي|3800',
      'عملية منظار تشخيصي وعلاجي|3200',
    ],
    doctorUsername: 'admin',
    doctorPassword: '123',
    receptionUsername: 'reception',
    receptionPassword: '123',
    receptionName: 'موظف الاستقبال الرئيسي',
  };
}

function buildInitialSamplePatients(): Patient[] {
  return [
    {
      id: 'pat_sample_1',
      clinicOwnerId: 'local_clinic',
      fileNumber: 'MRN-1001',
      fullName: 'فهد بن عبد العزيز العتيبي',
      phone: '0504112233',
      nationalId: '1045892310',
      age: 42,
      gender: 'male',
      notes: 'يعاني من حصوات مرارية متكررة — لا توجد حساسية دوائية',
    },
    {
      id: 'pat_sample_2',
      clinicOwnerId: 'local_clinic',
      fileNumber: 'MRN-1002',
      fullName: 'نورة بنت محمد الدوسري',
      phone: '0558223344',
      nationalId: '1089234512',
      age: 34,
      gender: 'female',
      notes: 'متابعة دورية بعد إجراء الليزر الجراحي',
    },
    {
      id: 'pat_sample_3',
      clinicOwnerId: 'local_clinic',
      fileNumber: 'MRN-1003',
      fullName: 'سلطان بن خالد القحطاني',
      phone: '0541998877',
      nationalId: '1023984711',
      age: 51,
      gender: 'male',
      notes: 'مريض ضغط، تحضير لعملية الفتق الجراحي',
    },
    {
      id: 'pat_sample_4',
      clinicOwnerId: 'local_clinic',
      fileNumber: 'MRN-1004',
      fullName: 'سارة بنت عبد الرحمن الشهري',
      phone: '0567334455',
      nationalId: '1098231144',
      age: 29,
      gender: 'female',
      notes: 'تأمين طبي — كشف استشاري أولي',
    },
    {
      id: 'pat_sample_5',
      clinicOwnerId: 'local_clinic',
      fileNumber: 'MRN-1005',
      fullName: 'تركي بن فيصل الشمري',
      phone: '0539887766',
      nationalId: '1077654321',
      age: 38,
      gender: 'male',
      notes: 'حجز عملية منظار تشخيصي وعلاجي',
    },
  ];
}

function buildInitialSampleTransactions(): Transaction[] {
  const todayStr = getTodayISO();
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = String(now.getMonth() + 1).padStart(2, '0');
  const prevDateObj = new Date(curYear, now.getMonth() - 1, 15);
  const prevYear = prevDateObj.getFullYear();
  const prevMonth = String(prevDateObj.getMonth() + 1).padStart(2, '0');

  return [
    {
      id: 'tx_sample_1',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_1',
      patientName: 'فهد بن عبد العزيز العتيبي',
      patientPhone: '0504112233',
      patientFileNumber: 'MRN-1001',
      type: 'consultation',
      title: 'كشف استشاري جراحة عامة ومناظير',
      date: `${prevYear}-${prevMonth}-12`,
      time: '10:30',
      amount: 250,
      paidAmount: 250,
      paymentMethod: 'mada',
      paymentStatus: 'paid',
      status: 'completed',
      receptionNotes: 'تم السداد عبر شبكة مدى',
      doctorNotes: 'تم الفحص بالسونار وتبين وجود التهاب بالمرارة، يوصى بإجراء استئصال بالمنظار.',
      invoiceNumber: `INV-${prevYear}-101`,
    },
    {
      id: 'tx_sample_2',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_1',
      patientName: 'فهد بن عبد العزيز العتيبي',
      patientPhone: '0504112233',
      patientFileNumber: 'MRN-1001',
      type: 'surgery',
      title: 'عملية استئصال المرارة بالمنظار الجراحي',
      date: `${curYear}-${curMonth}-02`,
      time: '09:00',
      amount: 5500,
      paidAmount: 5500,
      paymentMethod: 'transfer',
      paymentStatus: 'paid',
      status: 'completed',
      receptionNotes: 'تم سداد كامل رسوم العملية بتحويل بنكي',
      doctorNotes: 'تمت العملية بنجاح دون مضاعفات، خروج المريض بحالة مستقرة.',
      invoiceNumber: `INV-${curYear}-102`,
    },
    {
      id: 'tx_sample_3',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_2',
      patientName: 'نورة بنت محمد الدوسري',
      patientPhone: '0558223344',
      patientFileNumber: 'MRN-1002',
      type: 'surgery',
      title: 'عملية الليزر الجراحي التخصصي',
      date: `${prevYear}-${prevMonth}-20`,
      time: '11:30',
      amount: 3800,
      paidAmount: 3800,
      paymentMethod: 'mada',
      paymentStatus: 'paid',
      status: 'completed',
      receptionNotes: 'مدفوع بالكامل عبر مدى',
      doctorNotes: 'إجراء ليزر جراحي ناجح، يوصى بمراجعة متابعة بعد أسبوعين.',
      invoiceNumber: `INV-${prevYear}-103`,
    },
    {
      id: 'tx_sample_4',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_2',
      patientName: 'نورة بنت محمد الدوسري',
      patientPhone: '0558223344',
      patientFileNumber: 'MRN-1002',
      type: 'followup',
      title: 'متابعة طبية بعد عملية الليزر',
      date: todayStr,
      time: '11:00',
      amount: 100,
      paidAmount: 100,
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      status: 'waiting',
      receptionNotes: 'بانتظار الدخول للطبيب',
      doctorNotes: '',
      invoiceNumber: `INV-${curYear}-104`,
    },
    {
      id: 'tx_sample_5',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_3',
      patientName: 'سلطان بن خالد القحطاني',
      patientPhone: '0541998877',
      patientFileNumber: 'MRN-1003',
      type: 'surgery',
      title: 'عملية إصلاح الفتق الجراحي بالشبكة',
      date: todayStr,
      time: '13:30',
      amount: 4800,
      paidAmount: 3000,
      paymentMethod: 'mada',
      paymentStatus: 'partial',
      status: 'in_progress',
      receptionNotes: 'تم دفع عربون 3000 ر.س والمتبقي 1800 ر.س',
      doctorNotes: 'المريض داخل غرفة الطبيب للتحضير والفحص قبل العملية.',
      invoiceNumber: `INV-${curYear}-105`,
    },
    {
      id: 'tx_sample_6',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_4',
      patientName: 'سارة بنت عبد الرحمن الشهري',
      patientPhone: '0567334455',
      patientFileNumber: 'MRN-1004',
      type: 'consultation',
      title: 'كشف استشاري أولي',
      date: todayStr,
      time: '15:00',
      amount: 250,
      paidAmount: 250,
      paymentMethod: 'insurance',
      paymentStatus: 'paid',
      status: 'waiting',
      receptionNotes: 'موافقة تأمين طبي فورية',
      doctorNotes: '',
      invoiceNumber: `INV-${curYear}-106`,
    },
    {
      id: 'tx_sample_7',
      clinicOwnerId: 'local_clinic',
      patientId: 'pat_sample_5',
      patientName: 'تركي بن فيصل الشمري',
      patientPhone: '0539887766',
      patientFileNumber: 'MRN-1005',
      type: 'surgery',
      title: 'عملية منظار تشخيصي وعلاجي',
      date: todayStr,
      time: '16:30',
      amount: 3200,
      paidAmount: 3200,
      paymentMethod: 'mada',
      paymentStatus: 'paid',
      status: 'waiting',
      receptionNotes: 'مدفوع بالكامل بانتظار الدخول للدكتور',
      doctorNotes: '',
      invoiceNumber: `INV-${curYear}-107`,
    },
  ];
}

export default function App() {
  // Staff Username/Password Session State
  const [staffSession, setStaffSession] = useState<StaffSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? (JSON.parse(saved) as StaffSession) : null;
    } catch {
      return null;
    }
  });

  // Login Form Inputs
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Navigation Page in Sidebar — Default to 'patients_lounge' (صالة المرضى)
  const [activePage, setActivePage] = useState<NavigationPage>('patients_lounge');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Optional Firebase Cloud Sync User
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // Clinic Data State
  const [settings, setSettings] = useState<ClinicSettings>(getInitialSettings);

  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    const initial = buildInitialSamplePatients();
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(initial));
    return initial;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    const initial = buildInitialSampleTransactions();
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(initial));
    return initial;
  });

  const [isSeeding, setIsSeeding] = useState(false);
  const [invoiceTransaction, setInvoiceTransaction] = useState<Transaction | null>(null);

  // Gentle audio chime state & notification banner for Reception waiting queue
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shifaa_crm_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });
  const [waitingAlertBanner, setWaitingAlertBanner] = useState<string | null>(null);

  const triggerWaitingLoungeAlert = useCallback(
    (patientName: string) => {
      if (soundEnabled) {
        playGentleWaitingChime();
      }
      setWaitingAlertBanner(
        `تنبيه الاستقبال: تم إدخال المريض «${patientName}» إلى قائمة الانتظار في صالة المرضى.`
      );
    },
    [soundEnabled]
  );

  useEffect(() => {
    if (!waitingAlertBanner) return;
    const timer = setTimeout(() => setWaitingAlertBanner(null), 4500);
    return () => clearTimeout(timer);
  }, [waitingAlertBanner]);

  // Listen for cross-tab storage updates so Reception hears a chime if a waiting patient is added in another tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.TRANSACTIONS && e.newValue) {
        try {
          const nextList = JSON.parse(e.newValue) as Transaction[];
          const prevRaw = e.oldValue ? (JSON.parse(e.oldValue) as Transaction[]) : [];
          const prevIds = new Set(prevRaw.map((t) => t.id));
          const newlyAddedWaiting = nextList.find(
            (t) => !prevIds.has(t.id) && t.status === 'waiting'
          );
          setTransactions(nextList);
          if (newlyAddedWaiting) {
            triggerWaitingLoungeAlert(newlyAddedWaiting.patientName);
          }
        } catch {
          // ignore
        }
      } else if (e.key === 'shifaa_crm_doctor_on_break_v1') {
        const nextBreak = e.newValue === 'true';
        const prevBreak = e.oldValue === 'true';
        if (prevBreak && !nextBreak && activePage !== 'patients_lounge') {
          if (soundEnabled) {
            playDoctorBackToWorkChime();
          }
          setWaitingAlertBanner(
            `إشعار للريسبشن: عاد الطبيب (${settings.doctorName}) إلى العمل الآن — يمكنكم إدخال المرضى من صالة الانتظار.`
          );
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [triggerWaitingLoungeAlert, activePage, soundEnabled, settings.doctorName]);

  // Keep localStorage synced whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch {
      // ignore
    }
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch {
      // ignore
    }
  }, [transactions]);

  // Listen to Firebase Auth for optional Cloud Firestore synchronization
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Synchronize URL with authentication state (/MeniClinic/login when logged out, /MeniClinic when logged in)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const basePath = '/MeniClinic';
    if (!staffSession) {
      if (window.location.pathname.replace(/\/+$/, '') !== `${basePath}/login`) {
        window.history.replaceState(null, '', `${basePath}/login`);
      }
    } else {
      if (window.location.pathname.replace(/\/+$/, '').endsWith('/login')) {
        window.history.replaceState(null, '', basePath);
      }
    }
  }, [staffSession]);

  // Backend API (Cloudflare D1 / Express Server) Bootstrap & Live Sync
  // Active when not connected to Firebase Auth (so Cloudflare D1 / Node backend is the primary store)
  useEffect(() => {
    if (firebaseUser) return;
    let isMounted = true;

    const syncFromBackend = async (isInitialLoad: boolean) => {
      const data = await apiFetchBootstrap();
      if (!isMounted || !data) return;

      const fetchedSettings = data.settings;
      if (fetchedSettings) {
        setSettings((prev) => ({
          ...prev,
          ...fetchedSettings,
          doctorUsername: fetchedSettings.doctorUsername || prev.doctorUsername || 'admin',
          doctorPassword: fetchedSettings.doctorPassword || prev.doctorPassword || '123',
          receptionUsername: fetchedSettings.receptionUsername || prev.receptionUsername || 'reception',
          receptionPassword: fetchedSettings.receptionPassword || prev.receptionPassword || '123',
          receptionName: fetchedSettings.receptionName || prev.receptionName || 'موظف الاستقبال الرئيسي',
        }));
      }

      // If backend DB is empty on initial run, seed it with current initial sample data
      if (
        isInitialLoad &&
        Array.isArray(data.patients) &&
        data.patients.length === 0 &&
        Array.isArray(data.transactions) &&
        data.transactions.length === 0
      ) {
        const sampleP = buildInitialSamplePatients();
        const sampleT = buildInitialSampleTransactions();
        await apiSeedDatabase({ patients: sampleP, transactions: sampleT });
        return;
      }

      if (Array.isArray(data.patients) && data.patients.length > 0) {
        setPatients(data.patients);
      }

      if (Array.isArray(data.transactions) && data.transactions.length > 0) {
        setTransactions((prev) => {
          if (!isInitialLoad) {
            const prevIds = new Set(prev.map((t) => t.id));
            const newlyWaiting = data.transactions.find(
              (t) =>
                (!prevIds.has(t.id) && t.status === 'waiting') ||
                prev.some((old) => old.id === t.id && old.status !== 'waiting' && t.status === 'waiting')
            );
            if (newlyWaiting) {
              triggerWaitingLoungeAlert(newlyWaiting.patientName);
            }
          }
          return data.transactions;
        });
      }
    };

    syncFromBackend(true);
    const pollInterval = setInterval(() => {
      syncFromBackend(false);
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [firebaseUser, triggerWaitingLoungeAlert]);

  // Real-time Firestore Cloud Listeners when firebaseUser is connected
  useEffect(() => {
    if (!firebaseUser) return;
    const uid = firebaseUser.uid;
    let hasAttemptedInitialFirestoreSeed = false;

    const settingsRef = doc(db, 'clinic_settings', uid);
    const unsubSettings = onSnapshot(
      settingsRef,
      async (snap) => {
        if (snap.exists()) {
          const data = snap.data() as ClinicSettings;
          setSettings((prev) => ({
            ...prev,
            ...data,
            doctorUsername: data.doctorUsername || prev.doctorUsername || 'admin',
            doctorPassword: data.doctorPassword || prev.doctorPassword || '123',
            receptionUsername: data.receptionUsername || prev.receptionUsername || 'reception',
            receptionPassword: data.receptionPassword || prev.receptionPassword || '123',
            receptionName: data.receptionName || prev.receptionName || 'موظف الاستقبال الرئيسي',
            id: snap.id,
          }));
        } else {
          try {
            const payload = sanitizeSettingsForCreate(uid, settings);
            await setDoc(settingsRef, payload);
          } catch (err) {
            handleFirestoreError(err, OperationType.CREATE, `clinic_settings/${uid}`);
          }
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.GET, `clinic_settings/${uid}`);
      }
    );

    const patientsQuery = query(
      collection(db, 'patients'),
      where('clinicOwnerId', '==', uid)
    );
    const unsubPatients = onSnapshot(
      patientsQuery,
      async (snap) => {
        if (!snap.empty) {
          const list: Patient[] = snap.docs.map((d) => ({
            ...(d.data() as Omit<Patient, 'id'>),
            id: d.id,
          }));
          setPatients(list);
        } else if (!hasAttemptedInitialFirestoreSeed) {
          hasAttemptedInitialFirestoreSeed = true;
          try {
            const seedP = buildInitialSamplePatients();
            for (const p of seedP) {
              const pRef = doc(db, 'patients', p.id);
              const existingP = await getDoc(pRef);
              if (!existingP.exists()) {
                await setDoc(pRef, sanitizePatientForCreate(uid, p));
              }
            }
            const seedT = buildInitialSampleTransactions();
            for (const t of seedT) {
              const tRef = doc(db, 'transactions', t.id);
              const existingT = await getDoc(tRef);
              if (!existingT.exists()) {
                await setDoc(tRef, sanitizeTransactionForCreate(uid, t));
              }
            }
          } catch {
            // ignore initial seed conflict if another tab already seeded
          }
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'patients');
      }
    );

    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('clinicOwnerId', '==', uid)
    );
    const unsubTransactions = onSnapshot(
      transactionsQuery,
      (snap) => {
        if (!snap.empty) {
          const list: Transaction[] = snap.docs.map((d) => ({
            ...(d.data() as Omit<Transaction, 'id'>),
            id: d.id,
          }));
          setTransactions(list);
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'transactions');
      }
    );

    return () => {
      unsubSettings();
      unsubPatients();
      unsubTransactions();
    };
  }, [firebaseUser]);

  // Handle Username & Password Login
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const u = loginUsername.trim();
    const p = loginPassword.trim();

    const docUser = (settings.doctorUsername || 'admin').trim();
    const docPass = (settings.doctorPassword || '123').trim();

    const recUser = (settings.receptionUsername || 'reception').trim();
    const recPass = (settings.receptionPassword || '123').trim();

    if (u.toLowerCase() === docUser.toLowerCase() && p === docPass) {
      const session: StaffSession = {
        role: 'doctor',
        username: docUser,
        displayName: settings.doctorName || 'د. محمود حسين',
      };
      setStaffSession(session);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      setActivePage('patients_lounge');
      setLoginUsername('');
      setLoginPassword('');
      return;
    }

    if (u.toLowerCase() === recUser.toLowerCase() && p === recPass) {
      const session: StaffSession = {
        role: 'reception',
        username: recUser,
        displayName: settings.receptionName || 'موظف الاستقبال الرئيسي',
      };
      setStaffSession(session);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      setActivePage('patients_lounge');
      setLoginUsername('');
      setLoginPassword('');
      return;
    }

    setLoginError(
      'اسم المستخدم أو كلمة المرور غير صحيحة. تأكد من البيانات أو راجع مدير العيادة.'
    );
  };

  const handleStaffLogout = () => {
    setStaffSession(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setMobileSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/MeniClinic/login');
    }
  };

  const handleConnectCloudSync = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      // ignore popup close
    }
  };

  // CRUD Handlers
  const handleAddPatient = useCallback(
    async (
      input: Omit<Patient, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
    ): Promise<Patient | null> => {
      const newId = `pat_${Date.now()}`;
      const ownerId = firebaseUser ? firebaseUser.uid : 'local_clinic';
      const newPatient: Patient = {
        id: newId,
        clinicOwnerId: ownerId,
        fileNumber: input.fileNumber.trim() || `MRN-${1001 + patients.length}`,
        fullName: input.fullName.trim(),
        phone: input.phone.trim(),
        nationalId: (input.nationalId || '').trim(),
        age: Math.max(0, Math.min(150, Math.round(Number(input.age) || 30))),
        gender: input.gender === 'female' ? 'female' : 'male',
        notes: (input.notes || '').trim(),
      };

      setPatients((prev) => [newPatient, ...prev]);

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiCreatePatient(newPatient);

      if (firebaseUser) {
        const docRef = doc(db, 'patients', newId);
        const payload = sanitizePatientForCreate(firebaseUser.uid, input);
        try {
          await setDoc(docRef, payload);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `patients/${newId}`);
        }
      }

      return newPatient;
    },
    [firebaseUser, patients.length]
  );

  // Helper to ensure parent patient exists in Firestore before creating/upserting a transaction
  const ensurePatientInFirestore = useCallback(
    async (
      uid: string,
      patientId: string,
      fallbackName: string,
      fallbackPhone: string,
      fallbackFileNumber: string
    ) => {
      const patRef = doc(db, 'patients', patientId);
      const patSnap = await getDoc(patRef);
      if (!patSnap.exists()) {
        const localPat = patients.find((p) => p.id === patientId);
        const patPayload = sanitizePatientForCreate(uid, {
          fileNumber: localPat?.fileNumber || fallbackFileNumber || 'MRN-1001',
          fullName: localPat?.fullName || fallbackName || 'مريض',
          phone: localPat?.phone || fallbackPhone || '0500000000',
          nationalId: localPat?.nationalId || '',
          age: localPat?.age ?? 30,
          gender: localPat?.gender || 'male',
          notes: localPat?.notes || '',
        });
        await setDoc(patRef, patPayload);
      }
    },
    [patients]
  );

  const handleUpdatePatient = useCallback(
    async (
      patientId: string,
      existingPatient: Patient,
      updates: Partial<Patient>
    ) => {
      const updatedPatient: Patient = {
        ...existingPatient,
        fullName: (updates.fullName ?? existingPatient.fullName).trim(),
        phone: (updates.phone ?? existingPatient.phone).trim(),
        nationalId: (updates.nationalId ?? existingPatient.nationalId).trim(),
        age: Math.max(
          0,
          Math.min(150, Math.round(Number(updates.age ?? existingPatient.age) || 30))
        ),
        gender: updates.gender === 'female' ? 'female' : 'male',
        notes: (updates.notes ?? existingPatient.notes).trim(),
      };

      setPatients((prev) =>
        prev.map((p) => (p.id === patientId ? updatedPatient : p))
      );

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiUpdatePatient(patientId, updatedPatient);

      if (firebaseUser) {
        const patientRef = doc(db, 'patients', patientId);
        try {
          const snap = await getDoc(patientRef);
          if (snap.exists()) {
            await updateDoc(patientRef, {
              fullName: updatedPatient.fullName.slice(0, 120),
              phone: updatedPatient.phone.slice(0, 25),
              nationalId: updatedPatient.nationalId.slice(0, 30),
              age: updatedPatient.age,
              gender: updatedPatient.gender,
              notes: updatedPatient.notes.slice(0, 1000),
              updatedAt: serverTimestamp(),
            });
          } else {
            const payload = sanitizePatientForCreate(firebaseUser.uid, updatedPatient);
            await setDoc(patientRef, payload);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `patients/${patientId}`);
        }
      }
    },
    [firebaseUser]
  );

  const handleCreateTransaction = useCallback(
    async (
      input: Omit<Transaction, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
    ) => {
      const newId = `tx_${Date.now()}`;
      const ownerId = firebaseUser ? firebaseUser.uid : 'local_clinic';
      const amount = Math.max(0, Number(input.amount) || 0);
      const paidAmount = Math.max(0, Math.min(amount, Number(input.paidAmount) || 0));
      const paymentStatus =
        paidAmount >= amount && amount > 0
          ? 'paid'
          : paidAmount > 0
          ? 'partial'
          : 'unpaid';

      const newTx: Transaction = {
        id: newId,
        clinicOwnerId: ownerId,
        patientId: input.patientId,
        patientName: input.patientName.trim(),
        patientPhone: input.patientPhone.trim(),
        patientFileNumber: input.patientFileNumber.trim(),
        type: input.type,
        title: input.title.trim(),
        date: input.date,
        time: input.time,
        amount,
        paidAmount,
        paymentMethod: input.paymentMethod,
        paymentStatus,
        status: input.status,
        receptionNotes: (input.receptionNotes || '').trim(),
        doctorNotes: (input.doctorNotes || '').trim(),
        invoiceNumber: input.invoiceNumber.trim(),
      };

      setTransactions((prev) => [newTx, ...prev]);

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiCreateTransaction(newTx);

      if (input.status === 'waiting') {
        triggerWaitingLoungeAlert(newTx.patientName);
      }

      if (firebaseUser) {
        const docRef = doc(db, 'transactions', newId);
        const payload = sanitizeTransactionForCreate(firebaseUser.uid, input);
        try {
          await ensurePatientInFirestore(
            firebaseUser.uid,
            input.patientId,
            input.patientName,
            input.patientPhone,
            input.patientFileNumber
          );
          await setDoc(docRef, payload);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `transactions/${newId}`);
        }
      }
    },
    [firebaseUser, triggerWaitingLoungeAlert, ensurePatientInFirestore]
  );

  const handleUpdateTransactionPaymentAndStatus = useCallback(
    async (
      tx: Transaction,
      updates: {
        paidAmount: number;
        paymentMethod: PaymentMethod;
        status: VisitStatus;
        receptionNotes: string;
      }
    ) => {
      // Prevent sending a patient into the Doctor's room if the Doctor is on break ("استراحة") or if another patient is already in the room
      if (tx.status !== 'in_progress' && updates.status === 'in_progress') {
        const existingInRoom = transactions.find(
          (item) =>
            item.date === tx.date &&
            item.id !== tx.id &&
            item.status === 'in_progress'
        );
        if (existingInRoom) {
          if (soundEnabled) {
            playBreakBlockedAlertSound();
          }
          setWaitingAlertBanner(
            `عذراً، لا يمكن إدخال أكثر من مريض في نفس الوقت — يتواجد حالياً المريض «${existingInRoom.patientName}» داخل غرفة الطبيب.`
          );
          return;
        }

        try {
          if (localStorage.getItem('shifaa_crm_doctor_on_break_v1') === 'true') {
            if (soundEnabled) {
              playBreakBlockedAlertSound();
            }
            setWaitingAlertBanner(
              `عذراً، النظام يرفض إدخال المريض «${tx.patientName}» حالياً — الدكتور (${settings.doctorName}) في استراحة. يرجى الانتظار حتى ضغط الطبيب على «العودة للعمل».`
            );
            return;
          }
        } catch {
          // ignore
        }
      }

      const safePaid = Math.max(0, Math.min(tx.amount, Number(updates.paidAmount) || 0));
      const paymentStatus =
        safePaid >= tx.amount && tx.amount > 0
          ? 'paid'
          : safePaid > 0
          ? 'partial'
          : 'unpaid';

      const updatedTx: Transaction = {
        ...tx,
        paidAmount: safePaid,
        paymentMethod: updates.paymentMethod,
        paymentStatus,
        status: updates.status,
        receptionNotes: (updates.receptionNotes || '').trim(),
      };

      setTransactions((prev) =>
        prev.map((item) => (item.id === tx.id ? updatedTx : item))
      );

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiUpdateTransaction(tx.id, {
        paidAmount: safePaid,
        paymentMethod: updates.paymentMethod,
        paymentStatus,
        status: updates.status,
        receptionNotes: (updates.receptionNotes || '').trim(),
      });

      if (tx.status !== 'waiting' && updates.status === 'waiting') {
        triggerWaitingLoungeAlert(tx.patientName);
      }

      if (firebaseUser) {
        const txRef = doc(db, 'transactions', tx.id);
        try {
          const snap = await getDoc(txRef);
          if (snap.exists()) {
            await updateDoc(txRef, {
              paidAmount: safePaid,
              paymentMethod: updates.paymentMethod,
              paymentStatus,
              status: updates.status,
              receptionNotes: (updates.receptionNotes || '').trim().slice(0, 1000),
              updatedAt: serverTimestamp(),
            });
          } else {
            await ensurePatientInFirestore(
              firebaseUser.uid,
              tx.patientId,
              tx.patientName,
              tx.patientPhone,
              tx.patientFileNumber
            );
            const payload = sanitizeTransactionForCreate(firebaseUser.uid, updatedTx);
            await setDoc(txRef, payload);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `transactions/${tx.id}`);
        }
      }
    },
    [
      firebaseUser,
      transactions,
      soundEnabled,
      settings.doctorName,
      triggerWaitingLoungeAlert,
      ensurePatientInFirestore,
    ]
  );

  const handleUpdateDoctorNotes = useCallback(
    async (tx: Transaction, doctorNotes: string, status: VisitStatus) => {
      const updatedTx: Transaction = {
        ...tx,
        doctorNotes: doctorNotes.trim(),
        status,
      };

      setTransactions((prev) =>
        prev.map((item) => (item.id === tx.id ? updatedTx : item))
      );

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiUpdateTransaction(tx.id, {
        doctorNotes: doctorNotes.trim(),
        status,
      });

      if (firebaseUser) {
        const txRef = doc(db, 'transactions', tx.id);
        try {
          const snap = await getDoc(txRef);
          if (snap.exists()) {
            await updateDoc(txRef, {
              doctorNotes: doctorNotes.trim().slice(0, 2000),
              status,
              updatedAt: serverTimestamp(),
            });
          } else {
            await ensurePatientInFirestore(
              firebaseUser.uid,
              tx.patientId,
              tx.patientName,
              tx.patientPhone,
              tx.patientFileNumber
            );
            const payload = sanitizeTransactionForCreate(firebaseUser.uid, updatedTx);
            await setDoc(txRef, payload);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `transactions/${tx.id}`);
        }
      }
    },
    [firebaseUser, ensurePatientInFirestore]
  );

  const handleSaveSettings = useCallback(
    async (updated: Partial<ClinicSettings>) => {
      const merged: ClinicSettings = {
        ...settings,
        ...updated,
        doctorUsername: (updated.doctorUsername ?? settings.doctorUsername).trim() || 'admin',
        doctorPassword: (updated.doctorPassword ?? settings.doctorPassword).trim() || '123',
        receptionUsername:
          (updated.receptionUsername ?? settings.receptionUsername).trim() || 'reception',
        receptionPassword:
          (updated.receptionPassword ?? settings.receptionPassword).trim() || '123',
        receptionName:
          (updated.receptionName ?? settings.receptionName).trim() || 'موظف الاستقبال',
      };

      setSettings(merged);

      // Sync with Backend REST API (Cloudflare D1 / Express)
      void apiSaveSettings(merged);

      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const settingsRef = doc(db, 'clinic_settings', uid);
        const sanitized = sanitizeSettingsForCreate(uid, merged);
        try {
          const snap = await getDoc(settingsRef);
          if (snap.exists()) {
            await updateDoc(settingsRef, {
              clinicName: sanitized.clinicName,
              doctorName: sanitized.doctorName,
              specialty: sanitized.specialty,
              phone: sanitized.phone,
              city: sanitized.city,
              address: sanitized.address,
              taxNumber: sanitized.taxNumber,
              consultationPrice: sanitized.consultationPrice,
              followupPrice: sanitized.followupPrice,
              defaultSurgeryPrice: sanitized.defaultSurgeryPrice,
              surgeryCatalog: sanitized.surgeryCatalog,
              doctorUsername: sanitized.doctorUsername,
              doctorPassword: sanitized.doctorPassword,
              receptionUsername: sanitized.receptionUsername,
              receptionPassword: sanitized.receptionPassword,
              receptionName: sanitized.receptionName,
              updatedAt: serverTimestamp(),
            });
          } else {
            await setDoc(settingsRef, sanitized);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `clinic_settings/${uid}`);
        }
      }
    },
    [settings, firebaseUser]
  );

  const handleSeedSampleData = useCallback(async () => {
    setIsSeeding(true);
    try {
      const sampleP = buildInitialSamplePatients();
      const sampleT = buildInitialSampleTransactions();
      setPatients(sampleP);
      setTransactions(sampleT);
      await apiSeedDatabase({ patients: sampleP, transactions: sampleT });
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        for (const p of sampleP) {
          const pRef = doc(db, 'patients', p.id);
          const snap = await getDoc(pRef);
          if (!snap.exists()) {
            await setDoc(pRef, sanitizePatientForCreate(uid, p));
          }
        }
        for (const t of sampleT) {
          const tRef = doc(db, 'transactions', t.id);
          const snap = await getDoc(tRef);
          if (!snap.exists()) {
            await setDoc(tRef, sanitizeTransactionForCreate(uid, t));
          }
        }
      }
    } finally {
      setIsSeeding(false);
    }
  }, [firebaseUser]);

  // ============================================================================
  // 1. LOGIN SCREEN (USERNAME & PASSWORD FOR DOCTOR OR RECEPTIONIST)
  // ============================================================================
  if (!staffSession) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
        {/* Top Bar Contract */}
        <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
              <img src="/photos/Meni%20Clinic.webp" alt="Meni Clinic" className="h-7 w-auto object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
              Meni Clinic | Medestra
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="whitespace-nowrap shrink-0">صالة المرضى</span>
            <span className="whitespace-nowrap shrink-0">مكتب الاستقبال</span>
            <span className="whitespace-nowrap shrink-0">تقويم الحجوزات</span>
            <span className="whitespace-nowrap shrink-0">قاعدة بيانات المرضى</span>
            <span className="whitespace-nowrap shrink-0">تقارير الطبيب المدير</span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://medestra.me"
              className="text-xs font-bold text-[#00AEEF] hover:text-[#0284c7] px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 transition-colors"
            >
              ← العودة إلى Medestra
            </a>
            <span className="text-xs font-mono tabular-nums text-slate-500 hidden sm:inline">
              {settings.city} · المملكة العربية السعودية
            </span>
          </div>
        </header>

        {/* Centered Login Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-teal-50 text-teal-700 mx-auto mb-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">
                  {settings.clinicName}
                </h1>
                <p className="text-xs text-slate-500">
                  تسجيل الدخول باسم المستخدم وكلمة المرور (للطبيب المدير أو موظف الاستقبال)
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="أدخل اسم المستخدم (مثال: admin أو reception)"
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>دخول إلى النظام</span>
                </button>
              </form>

              {/* Quick Credentials Helper Box */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <div className="text-xs font-medium text-slate-500 text-center">
                  دخول سريع للتجربة (يمكن تغييرها من إعدادات الطبيب):
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginUsername(settings.doctorUsername || 'admin');
                      setLoginPassword(settings.doctorPassword || '123');
                      setLoginError(null);
                    }}
                    className="p-2.5 text-right bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-900">حساب الطبيب المدير</div>
                    <div className="text-[11px] font-mono tabular-nums text-slate-500 mt-0.5">
                      المستخدم: {settings.doctorUsername} · السر: {settings.doctorPassword}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginUsername(settings.receptionUsername || 'reception');
                      setLoginPassword(settings.receptionPassword || '123');
                      setLoginError(null);
                    }}
                    className="p-2.5 text-right bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-900">حساب الريسبشن</div>
                    <div className="text-[11px] font-mono tabular-nums text-slate-500 mt-0.5">
                      المستخدم: {settings.receptionUsername} · السر: {settings.receptionPassword}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 text-center">
          {settings.clinicName} — {settings.doctorName} · جميع المعاملات بالريال السعودي (SAR)
        </footer>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED WORKSPACE WITH RIGHT-SIDE RTL SIDEBAR
  // ============================================================================
  const isDoctor = staffSession.role === 'doctor';

  // First item at the top of the Doctor's sidebar AND Receptionist's sidebar is 'patients_lounge' (صالة المرضى)
  const doctorNavItems: Array<{
    id: NavigationPage;
    label: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    {
      id: 'patients_lounge',
      label: 'صالة المرضى',
      icon: Armchair,
    },
    {
      id: 'doctor_reports',
      label: 'التقارير المالية والإحصائيات',
      icon: BarChart3,
    },
    {
      id: 'doctor_clinical',
      label: 'عيادة الطبيب والتشخيص',
      icon: ClipboardList,
    },
    {
      id: 'doctor_settings',
      label: 'إعدادات العيادة والحسابات',
      icon: Settings,
    },
  ];

  const receptionNavItems: Array<{
    id: NavigationPage;
    label: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    ...(!isDoctor
      ? [
          {
            id: 'patients_lounge' as NavigationPage,
            label: 'صالة المرضى',
            icon: Armchair,
          },
        ]
      : []),
    {
      id: 'reception_queue',
      label: 'مكتب الاستقبال والتحصيل',
      icon: LayoutDashboard,
    },
    {
      id: 'calendar',
      label: 'تقويم الحجوزات والمواعيد',
      icon: Calendar,
    },
    {
      id: 'patients_db',
      label: 'قاعدة بيانات المرضى (Excel)',
      icon: Users,
    },
    {
      id: 'medical_history',
      label: 'التاريخ المرضي والتشخيصات',
      icon: FileHeart,
    },
  ];

  const allNavItems = [...doctorNavItems, ...receptionNavItems];

  const handleSelectNav = (page: NavigationPage) => {
    setActivePage(page);
    setMobileSidebarOpen(false);
  };

  const currentPageLabel =
    allNavItems.find((i) => i.id === activePage)?.label || 'صالة المرضى';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Right Sidebar (260px width, Flat & Calm) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-white border-l border-slate-200 no-print">
        {/* Brand Header inside Sidebar */}
        <div className="p-5 border-b border-slate-200 space-y-1">
          <div className="text-base font-bold text-slate-900 truncate">
            {settings.clinicName}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {settings.doctorName} · {settings.city}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Doctor Section (Only visible if logged in as Doctor, with صالة المرضى first!) */}
          {isDoctor && (
            <div className="space-y-1.5">
              <div className="px-3 text-[11px] font-semibold text-slate-400">
                إدارة الطبيب والتقارير
              </div>
              {doctorNavItems.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      active
                        ? 'bg-teal-700 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-teal-700'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Reception & Patients Section (Visible to Receptionist AND Doctor) */}
          <div className="space-y-1.5">
            <div className="px-3 text-[11px] font-semibold text-slate-400">
              الاستقبال والتقويم والمرضى
            </div>
            {receptionNavItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    active
                      ? 'bg-teal-700 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-teal-700'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Account Footer */}
        <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {staffSession.displayName}
              </div>
              <div className="text-[11px] text-slate-500">
                {isDoctor ? 'صلاحية: الطبيب المدير' : 'صلاحية: موظف الاستقبال'}
              </div>
            </div>
            <UserCheck className="w-4 h-4 text-teal-700 shrink-0" />
          </div>

          {!firebaseUser && (
            <button
              type="button"
              onClick={handleConnectCloudSync}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded transition-colors cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-teal-700" />
              <span>ربط المزامنة السحابية</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStaffLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-64 max-w-xs bg-white h-full flex flex-col justify-between z-10 border-l border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 truncate">
                {settings.clinicName}
              </span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-5 overflow-y-auto">
              {isDoctor && (
                <div className="space-y-1">
                  <div className="px-2 text-[11px] font-semibold text-slate-400">
                    إدارة الطبيب والتقارير
                  </div>
                  {doctorNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectNav(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md ${
                          active ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="space-y-1">
                <div className="px-2 text-[11px] font-semibold text-slate-400">
                  الاستقبال والتقويم والمرضى
                </div>
                {receptionNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md ${
                        active ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleStaffLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-700 bg-red-50 rounded-md"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Contextual Header Bar */}
        <header className="flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-b border-slate-200 no-print">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md cursor-pointer"
              aria-label="القائمة"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-500">
              <span>{isDoctor ? 'بوابة الطبيب المدير' : 'بوابة الاستقبال'}</span>
              <span className="mx-2">/</span>
              <span className="font-semibold text-slate-900">{currentPageLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                try {
                  localStorage.setItem('shifaa_crm_sound_enabled', String(next));
                } catch {
                  // ignore
                }
                if (next) {
                  playGentleWaitingChime();
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                soundEnabled
                  ? 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
              title="تشغيل أو كتم صوت التنبيه الخفيف عند دخول مريض جديد لقائمة الانتظار"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>تنبيه الانتظار: مفعل</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>تنبيه الانتظار: مكتوم</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline text-xs text-slate-500">
              المستخدم الحالي: <strong className="text-slate-800">{staffSession.displayName}</strong>
            </span>
            <button
              type="button"
              onClick={handleStaffLogout}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              تبديل الحساب / خروج
            </button>
          </div>
        </header>

        {/* Active Page Viewport */}
        <main
          className={`flex-1 w-full mx-auto px-3 sm:px-5 ${
            activePage === 'patients_lounge'
              ? 'max-w-[1920px] py-3 space-y-3'
              : 'max-w-7xl py-6 space-y-4'
          }`}
        >
          {waitingAlertBanner && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-xs font-medium text-teal-900 no-print">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{waitingAlertBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setWaitingAlertBanner(null)}
                className="text-teal-700 hover:text-teal-950 p-0.5 cursor-pointer"
                aria-label="إغلاق التنبيه"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {activePage === 'patients_lounge' && (
            <PatientsLoungeView
              role={staffSession.role}
              settings={settings}
              patients={patients}
              transactions={transactions}
              onAddPatient={handleAddPatient}
              onCreateTransaction={handleCreateTransaction}
              onUpdateTransactionPaymentAndStatus={handleUpdateTransactionPaymentAndStatus}
              onUpdateDoctorNotes={handleUpdateDoctorNotes}
              onOpenInvoice={(tx) => setInvoiceTransaction(tx)}
            />
          )}

          {activePage === 'reception_queue' && (
            <ReceptionView
              settings={settings}
              patients={patients}
              transactions={transactions}
              onAddPatient={handleAddPatient}
              onUpdatePatient={handleUpdatePatient}
              onCreateTransaction={handleCreateTransaction}
              onUpdateTransactionPaymentAndStatus={handleUpdateTransactionPaymentAndStatus}
              onOpenInvoice={(tx) => setInvoiceTransaction(tx)}
            />
          )}

          {activePage === 'calendar' && (
            <CalendarView
              settings={settings}
              patients={patients}
              transactions={transactions}
              onAddPatient={handleAddPatient}
              onCreateTransaction={handleCreateTransaction}
              onUpdateTransactionPaymentAndStatus={handleUpdateTransactionPaymentAndStatus}
              onOpenInvoice={(tx) => setInvoiceTransaction(tx)}
            />
          )}

          {activePage === 'patients_db' && (
            <PatientsDatabaseView
              patients={patients}
              transactions={transactions}
              onAddPatient={handleAddPatient}
              onUpdatePatient={handleUpdatePatient}
            />
          )}

          {activePage === 'medical_history' && (
            <MedicalHistoryView
              patients={patients}
              transactions={transactions}
              onUpdatePatient={handleUpdatePatient}
              onUpdateDoctorNotes={handleUpdateDoctorNotes}
              onOpenInvoice={(tx) => setInvoiceTransaction(tx)}
            />
          )}

          {(activePage === 'doctor_reports' ||
            activePage === 'doctor_clinical' ||
            activePage === 'doctor_settings') &&
            (isDoctor ? (
              <DoctorView
                activeSection={
                  activePage === 'doctor_settings'
                    ? 'settings'
                    : activePage === 'doctor_clinical'
                    ? 'clinical'
                    : 'reports'
                }
                onChangeSection={(sec) => {
                  if (sec === 'reports') setActivePage('doctor_reports');
                  else if (sec === 'clinical') setActivePage('doctor_clinical');
                  else setActivePage('doctor_settings');
                }}
                settings={settings}
                patients={patients}
                transactions={transactions}
                onSaveSettings={handleSaveSettings}
                onUpdateDoctorNotes={handleUpdateDoctorNotes}
                onOpenInvoice={(tx) => setInvoiceTransaction(tx)}
                onSeedSampleData={handleSeedSampleData}
                isSeeding={isSeeding}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-10 text-center space-y-3">
                <Lock className="w-6 h-6 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  هذه الصفحة مخصصة للطبيب مدير العيادة فقط
                </h3>
                <p className="text-xs text-slate-500">
                  يرجى تسجيل الدخول بحساب الطبيب المدير للوصول إلى التقارير المالية وإعدادات العيادة.
                </p>
              </div>
            ))}
        </main>
      </div>

      {/* Printable Invoice / Receipt Modal */}
      <InvoiceModal
        transaction={invoiceTransaction}
        settings={settings}
        onClose={() => setInvoiceTransaction(null)}
      />
    </div>
  );
}
