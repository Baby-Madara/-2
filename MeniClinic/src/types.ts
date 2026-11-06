export type ServiceType = 'consultation' | 'followup' | 'surgery';
export type PaymentMethod = 'mada' | 'cash' | 'transfer' | 'insurance' | 'tabby';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid';
export type VisitStatus = 'scheduled' | 'waiting' | 'in_progress' | 'completed' | 'cancelled';

export type StaffRole = 'doctor' | 'reception';

export type NavigationPage =
  | 'patients_lounge'
  | 'medical_history'
  | 'reception_queue'
  | 'calendar'
  | 'patients_db'
  | 'doctor_reports'
  | 'doctor_clinical'
  | 'doctor_settings';

export interface StaffSession {
  role: StaffRole;
  username: string;
  displayName: string;
}

export interface SurgeryCatalogItem {
  name: string;
  price: number;
}

export interface ClinicSettings {
  id?: string;
  clinicOwnerId: string;
  clinicName: string;
  doctorName: string;
  specialty: string;
  phone: string;
  city: string;
  address: string;
  taxNumber: string;
  consultationPrice: number;
  followupPrice: number;
  defaultSurgeryPrice: number;
  surgeryCatalog: string[]; // Format: "اسم العملية|4500"
  doctorUsername: string;
  doctorPassword: string;
  receptionUsername: string;
  receptionPassword: string;
  receptionName: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Patient {
  id: string;
  clinicOwnerId: string;
  fileNumber: string;
  fullName: string;
  phone: string;
  nationalId: string;
  age: number;
  gender: 'male' | 'female';
  notes: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Transaction {
  id: string;
  clinicOwnerId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientFileNumber: string;
  type: ServiceType;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  amount: number;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: VisitStatus;
  receptionNotes: string;
  doctorNotes: string;
  invoiceNumber: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  consultation: 'كشف جديد',
  followup: 'متابعة طبية',
  surgery: 'عملية جراحية',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  mada: 'شبكة مدى',
  cash: 'نقدي',
  transfer: 'تحويل بنكي',
  insurance: 'تأمين طبي',
  tabby: 'تابي / تمارا',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: 'مدفوع بالكامل',
  partial: 'دفعة جزئية',
  unpaid: 'غير مدفوع',
};

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  scheduled: 'حجز مسبق',
  waiting: 'بالانتظار',
  in_progress: 'في العيادة',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

export const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const ARABIC_DAYS_SHORT = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

export function formatSAR(amount: number): string {
  const safeNum = Number.isFinite(amount) ? amount : 0;
  return `${safeNum.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ر.س`;
}

export function parseSurgeryCatalog(catalog: string[]): SurgeryCatalogItem[] {
  if (!Array.isArray(catalog)) return [];
  return catalog
    .map((entry) => {
      const [rawName, rawPrice] = String(entry).split('|');
      const name = (rawName || '').trim();
      const price = Number(rawPrice) || 0;
      return { name, price: Math.max(0, price) };
    })
    .filter((item) => item.name.length > 0);
}

export function encodeSurgeryCatalog(items: SurgeryCatalogItem[]): string[] {
  return items
    .slice(0, 20)
    .map((item) => {
      const cleanName = item.name.replace(/\|/g, '-').trim().slice(0, 110);
      const cleanPrice = Math.max(0, Math.min(5000000, Math.round(Number(item.price) || 0)));
      return `${cleanName}|${cleanPrice}`;
    })
    .filter((entry) => entry.length >= 3 && entry.length <= 150);
}

export function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeHHMM(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Generates an Excel (.xls) file with UTF-8 BOM and RTL table structure
 * so Microsoft Excel opens Arabic text and numbers cleanly.
 */
export function downloadExcelTable(
  filename: string,
  sheetTitle: string,
  headers: string[],
  rows: (string | number)[][]
): void {
  const escapeHtml = (val: string | number) =>
    String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const theadCells = headers
    .map(
      (h) =>
        `<th style="background-color:#0F766E;color:#FFFFFF;font-weight:bold;padding:8px 12px;border:1px solid #CBD5E1;text-align:right;">${escapeHtml(
          h
        )}</th>`
    )
    .join('');

  const tbodyRows = rows
    .map((row) => {
      const cells = row
        .map(
          (cell) =>
            `<td style="padding:6px 10px;border:1px solid #E2E8F0;text-align:right;">${escapeHtml(
              cell
            )}</td>`
        )
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  const html = `\uFEFF<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40" dir="rtl" lang="ar">
<head>
<meta charset="UTF-8" />
<!--[if gte mso 9]>
<xml>
  <x:ExcelWorkbook>
    <x:ExcelWorksheets>
      <x:ExcelWorksheet>
        <x:Name>${escapeHtml(sheetTitle)}</x:Name>
        <x:WorksheetOptions>
          <x:DisplayRightToLeft/>
        </x:WorksheetOptions>
      </x:ExcelWorksheet>
    </x:ExcelWorksheets>
  </x:ExcelWorkbook>
</xml>
<![endif]-->
</head>
<body dir="rtl" style="font-family:'Tajawal','Arial',sans-serif;">
  <table dir="rtl" style="border-collapse:collapse;width:100%;">
    <thead><tr>${theadCells}</tr></thead>
    <tbody>${tbodyRows}</tbody>
  </table>
</body>
</html>`;

  const blob = new Blob([html], {
    type: 'application/vnd.ms-excel;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.xls') ? filename : `${filename}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
