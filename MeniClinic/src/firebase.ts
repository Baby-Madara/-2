import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { ClinicSettings, Patient, Transaction } from './types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export function createDefaultSettingsPayload(uid: string): Omit<ClinicSettings, 'id'> {
  return {
    clinicOwnerId: uid,
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function sanitizeSettingsForCreate(
  uid: string,
  input: Partial<ClinicSettings>
) {
  const defaults = createDefaultSettingsPayload(uid);
  const catalog = Array.isArray(input.surgeryCatalog)
    ? input.surgeryCatalog
        .slice(0, 20)
        .map((s) => String(s).trim().slice(0, 150))
        .filter((s) => s.length >= 1)
    : defaults.surgeryCatalog;

  return {
    clinicOwnerId: uid,
    clinicName: (input.clinicName || defaults.clinicName).trim().slice(0, 120) || defaults.clinicName,
    doctorName: (input.doctorName || defaults.doctorName).trim().slice(0, 120) || defaults.doctorName,
    specialty: (input.specialty || defaults.specialty).trim().slice(0, 120) || defaults.specialty,
    phone: (input.phone || defaults.phone).trim().slice(0, 30) || defaults.phone,
    city: (input.city || defaults.city).trim().slice(0, 80) || defaults.city,
    address: (input.address || defaults.address).trim().slice(0, 200) || defaults.address,
    taxNumber: (input.taxNumber ?? defaults.taxNumber).trim().slice(0, 50),
    consultationPrice: Math.max(0, Math.min(1000000, Number(input.consultationPrice ?? defaults.consultationPrice) || 0)),
    followupPrice: Math.max(0, Math.min(1000000, Number(input.followupPrice ?? defaults.followupPrice) || 0)),
    defaultSurgeryPrice: Math.max(0, Math.min(5000000, Number(input.defaultSurgeryPrice ?? defaults.defaultSurgeryPrice) || 0)),
    surgeryCatalog: catalog,
    doctorUsername: (input.doctorUsername || defaults.doctorUsername).trim().slice(0, 60) || 'admin',
    doctorPassword: (input.doctorPassword || defaults.doctorPassword).trim().slice(0, 100) || '123',
    receptionUsername: (input.receptionUsername || defaults.receptionUsername).trim().slice(0, 60) || 'reception',
    receptionPassword: (input.receptionPassword || defaults.receptionPassword).trim().slice(0, 100) || '123',
    receptionName: (input.receptionName || defaults.receptionName).trim().slice(0, 100) || 'موظف الاستقبال',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function sanitizePatientForCreate(
  uid: string,
  input: Omit<Patient, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
) {
  const fullName = input.fullName.trim().slice(0, 120);
  const phone = input.phone.trim().slice(0, 25);
  const fileNumber = input.fileNumber.trim().slice(0, 40);
  return {
    clinicOwnerId: uid,
    fileNumber: fileNumber.length >= 2 ? fileNumber : `MRN-${Date.now().toString().slice(-4)}`,
    fullName: fullName.length >= 2 ? fullName : 'مريض جديد',
    phone: phone.length >= 5 ? phone : '0500000000',
    nationalId: (input.nationalId || '').trim().slice(0, 30),
    age: Math.max(0, Math.min(150, Math.round(Number(input.age) || 30))),
    gender: input.gender === 'female' ? ('female' as const) : ('male' as const),
    notes: (input.notes || '').trim().slice(0, 1000),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function sanitizeTransactionForCreate(
  uid: string,
  input: Omit<Transaction, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
) {
  const amount = Math.max(0, Math.min(5000000, Number(input.amount) || 0));
  const paidAmount = Math.max(0, Math.min(amount, Number(input.paidAmount) || 0));
  let paymentStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
  if (paidAmount >= amount && amount > 0) {
    paymentStatus = 'paid';
  } else if (paidAmount > 0 && paidAmount < amount) {
    paymentStatus = 'partial';
  } else if (amount === 0) {
    paymentStatus = 'paid';
  }

  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(input.date)
    ? input.date
    : new Date().toISOString().slice(0, 10);

  return {
    clinicOwnerId: uid,
    patientId: input.patientId.trim().slice(0, 128),
    patientName: input.patientName.trim().slice(0, 120) || 'مريض',
    patientPhone: input.patientPhone.trim().slice(0, 25) || '0500000000',
    patientFileNumber: input.patientFileNumber.trim().slice(0, 40) || 'MRN-1000',
    type: input.type,
    title: input.title.trim().slice(0, 160) || 'خدمة طبية',
    date: validDate,
    time: (input.time || '10:00').trim().slice(0, 10),
    amount,
    paidAmount,
    paymentMethod: input.paymentMethod,
    paymentStatus,
    status: input.status,
    receptionNotes: (input.receptionNotes || '').trim().slice(0, 1000),
    doctorNotes: (input.doctorNotes || '').trim().slice(0, 2000),
    invoiceNumber: (input.invoiceNumber || `INV-${Date.now().toString().slice(-5)}`).trim().slice(0, 40),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
