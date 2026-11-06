import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart3,
  Settings,
  ClipboardList,
  FileSpreadsheet,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  FileText,
  Calendar,
  KeyRound,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import {
  ClinicSettings,
  Patient,
  Transaction,
  VisitStatus,
  SERVICE_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  VISIT_STATUS_LABELS,
  formatSAR,
  parseSurgeryCatalog,
  encodeSurgeryCatalog,
  SurgeryCatalogItem,
  downloadExcelTable,
  getTodayISO,
} from '../types';

interface DoctorViewProps {
  activeSection: 'reports' | 'clinical' | 'settings';
  onChangeSection: (section: 'reports' | 'clinical' | 'settings') => void;
  settings: ClinicSettings;
  patients: Patient[];
  transactions: Transaction[];
  onSaveSettings: (updated: Partial<ClinicSettings>) => Promise<void>;
  onUpdateDoctorNotes: (
    transaction: Transaction,
    doctorNotes: string,
    status: VisitStatus
  ) => Promise<void>;
  onOpenInvoice: (tx: Transaction) => void;
  onSeedSampleData: () => Promise<void>;
  isSeeding: boolean;
}

type DatePreset = 'this_month' | 'last_month' | 'last_3_months' | 'this_year' | 'all' | 'custom';

export const DoctorView: React.FC<DoctorViewProps> = ({
  activeSection,
  onChangeSection,
  settings,
  patients,
  transactions,
  onSaveSettings,
  onUpdateDoctorNotes,
  onOpenInvoice,
  onSeedSampleData,
  isSeeding,
}) => {
  // Date Range Filter State
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

  const [datePreset, setDatePreset] = useState<DatePreset>('this_month');
  const [startDate, setStartDate] = useState<string>(`${currentYear}-${currentMonth}-01`);
  const [endDate, setEndDate] = useState<string>(getTodayISO());

  // Clinical Note Editing Modal State
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [clinicalNotesInput, setClinicalNotesInput] = useState('');
  const [clinicalStatusInput, setClinicalStatusInput] = useState<VisitStatus>('completed');
  const [isSavingClinical, setIsSavingClinical] = useState(false);

  // Selected Patient History Modal
  const [selectedPatientForHistory, setSelectedPatientForHistory] = useState<Patient | null>(null);

  // Settings Form State
  const [sClinicName, setSClinicName] = useState(settings.clinicName);
  const [sDoctorName, setSDoctorName] = useState(settings.doctorName);
  const [sSpecialty, setSSpecialty] = useState(settings.specialty);
  const [sPhone, setSPhone] = useState(settings.phone);
  const [sCity, setSCity] = useState(settings.city);
  const [sAddress, setSAddress] = useState(settings.address);
  const [sTaxNumber, setSTaxNumber] = useState(settings.taxNumber);
  const [sConsultationPrice, setSConsultationPrice] = useState<number>(settings.consultationPrice);
  const [sFollowupPrice, setSFollowupPrice] = useState<number>(settings.followupPrice);
  const [sDefaultSurgeryPrice, setSDefaultSurgeryPrice] = useState<number>(
    settings.defaultSurgeryPrice
  );
  const [sCatalogItems, setSCatalogItems] = useState<SurgeryCatalogItem[]>(() =>
    parseSurgeryCatalog(settings.surgeryCatalog)
  );

  // Credentials Form State (Doctor & Receptionist)
  const [sDoctorUsername, setSDoctorUsername] = useState(settings.doctorUsername || 'admin');
  const [sDoctorPassword, setSDoctorPassword] = useState(settings.doctorPassword || '123');
  const [sReceptionName, setSReceptionName] = useState(
    settings.receptionName || 'موظف الاستقبال الرئيسي'
  );
  const [sReceptionUsername, setSReceptionUsername] = useState(
    settings.receptionUsername || 'reception'
  );
  const [sReceptionPassword, setSReceptionPassword] = useState(
    settings.receptionPassword || '123'
  );
  const [showPasswords, setShowPasswords] = useState(false);

  const [newSurgeryName, setNewSurgeryName] = useState('');
  const [newSurgeryPrice, setNewSurgeryPrice] = useState<number>(3500);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedBanner, setSettingsSavedBanner] = useState(false);

  useEffect(() => {
    setSClinicName(settings.clinicName);
    setSDoctorName(settings.doctorName);
    setSSpecialty(settings.specialty);
    setSPhone(settings.phone);
    setSCity(settings.city);
    setSAddress(settings.address);
    setSTaxNumber(settings.taxNumber);
    setSConsultationPrice(settings.consultationPrice);
    setSFollowupPrice(settings.followupPrice);
    setSDefaultSurgeryPrice(settings.defaultSurgeryPrice);
    setSCatalogItems(parseSurgeryCatalog(settings.surgeryCatalog));
    setSDoctorUsername(settings.doctorUsername || 'admin');
    setSDoctorPassword(settings.doctorPassword || '123');
    setSReceptionName(settings.receptionName || 'موظف الاستقبال الرئيسي');
    setSReceptionUsername(settings.receptionUsername || 'reception');
    setSReceptionPassword(settings.receptionPassword || '123');
  }, [settings]);

  const applyPreset = (preset: DatePreset) => {
    setDatePreset(preset);
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();

    if (preset === 'this_month') {
      const mStr = String(m + 1).padStart(2, '0');
      setStartDate(`${y}-${mStr}-01`);
      setEndDate(getTodayISO());
    } else if (preset === 'last_month') {
      const lastMonthDate = new Date(y, m - 1, 1);
      const lastMonthEnd = new Date(y, m, 0);
      const ly = lastMonthDate.getFullYear();
      const lm = String(lastMonthDate.getMonth() + 1).padStart(2, '0');
      const ld = String(lastMonthEnd.getDate()).padStart(2, '0');
      setStartDate(`${ly}-${lm}-01`);
      setEndDate(`${ly}-${lm}-${ld}`);
    } else if (preset === 'last_3_months') {
      const threeMonthsAgo = new Date(y, m - 2, 1);
      const ty = threeMonthsAgo.getFullYear();
      const tm = String(threeMonthsAgo.getMonth() + 1).padStart(2, '0');
      setStartDate(`${ty}-${tm}-01`);
      setEndDate(getTodayISO());
    } else if (preset === 'this_year') {
      setStartDate(`${y}-01-01`);
      setEndDate(`${y}-12-31`);
    } else if (preset === 'all') {
      setStartDate('2020-01-01');
      setEndDate('2030-12-31');
    }
  };

  // Transactions within the selected date range (excluding cancelled)
  const periodTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        if (t.status === 'cancelled') return false;
        if (datePreset !== 'all') {
          if (startDate && t.date < startDate) return false;
          if (endDate && t.date > endDate) return false;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, datePreset, startDate, endDate]);

  // Period Financial & Clinical Analytics
  const analytics = useMemo(() => {
    let totalBilled = 0;
    let totalCollected = 0;
    let consultationsRevenue = 0;
    let consultationsCount = 0;
    let followupsRevenue = 0;
    let followupsCount = 0;
    let surgeriesRevenue = 0;
    let surgeriesCount = 0;

    const uniquePatientIds = new Set<string>();
    const paymentMethodTotals: Record<string, number> = {
      mada: 0,
      cash: 0,
      transfer: 0,
      insurance: 0,
      tabby: 0,
    };

    for (const tx of periodTransactions) {
      const amt = Number(tx.amount) || 0;
      const paid = Number(tx.paidAmount) || 0;
      totalBilled += amt;
      totalCollected += paid;
      uniquePatientIds.add(tx.patientId);

      if (tx.type === 'consultation') {
        consultationsRevenue += paid;
        consultationsCount += 1;
      } else if (tx.type === 'followup') {
        followupsRevenue += paid;
        followupsCount += 1;
      } else if (tx.type === 'surgery') {
        surgeriesRevenue += paid;
        surgeriesCount += 1;
      }

      if (paymentMethodTotals[tx.paymentMethod] !== undefined) {
        paymentMethodTotals[tx.paymentMethod] += paid;
      }
    }

    const totalRemaining = Math.max(0, totalBilled - totalCollected);
    const collectionRate =
      totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 100;
    const activeCustomersCount = uniquePatientIds.size;
    const avgRevenuePerCustomer =
      activeCustomersCount > 0 ? Math.round(totalCollected / activeCustomersCount) : 0;

    return {
      totalBilled,
      totalCollected,
      totalRemaining,
      collectionRate,
      consultationsRevenue,
      consultationsCount,
      followupsRevenue,
      followupsCount,
      surgeriesRevenue,
      surgeriesCount,
      activeCustomersCount,
      avgRevenuePerCustomer,
      paymentMethodTotals,
    };
  }, [periodTransactions]);

  // Monthly Revenue Breakdown (Grouped by YYYY-MM)
  const monthlyBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        month: string;
        consultationsRev: number;
        followupsRev: number;
        surgeriesRev: number;
        totalCollected: number;
        totalRemaining: number;
        count: number;
      }
    >();

    const sourceList =
      datePreset === 'all'
        ? transactions.filter((t) => t.status !== 'cancelled')
        : periodTransactions;

    for (const tx of sourceList) {
      const monthKey = tx.date.slice(0, 7);
      const cur = map.get(monthKey) || {
        month: monthKey,
        consultationsRev: 0,
        followupsRev: 0,
        surgeriesRev: 0,
        totalCollected: 0,
        totalRemaining: 0,
        count: 0,
      };
      const paid = Number(tx.paidAmount) || 0;
      const rem = Math.max(0, (Number(tx.amount) || 0) - paid);

      if (tx.type === 'consultation') cur.consultationsRev += paid;
      else if (tx.type === 'followup') cur.followupsRev += paid;
      else if (tx.type === 'surgery') cur.surgeriesRev += paid;

      cur.totalCollected += paid;
      cur.totalRemaining += rem;
      cur.count += 1;
      map.set(monthKey, cur);
    }

    return Array.from(map.values()).sort((a, b) => b.month.localeCompare(a.month));
  }, [transactions, periodTransactions, datePreset]);

  // Customer Analytics Report for the selected period
  const customerReportRows = useMemo(() => {
    const customerMap = new Map<
      string,
      {
        patientId: string;
        patientName: string;
        patientPhone: string;
        patientFileNumber: string;
        consultations: number;
        followups: number;
        surgeries: number;
        totalBilled: number;
        totalPaid: number;
        lastVisitDate: string;
      }
    >();

    for (const tx of periodTransactions) {
      const existing = customerMap.get(tx.patientId) || {
        patientId: tx.patientId,
        patientName: tx.patientName,
        patientPhone: tx.patientPhone,
        patientFileNumber: tx.patientFileNumber,
        consultations: 0,
        followups: 0,
        surgeries: 0,
        totalBilled: 0,
        totalPaid: 0,
        lastVisitDate: tx.date,
      };

      if (tx.type === 'consultation') existing.consultations += 1;
      else if (tx.type === 'followup') existing.followups += 1;
      else if (tx.type === 'surgery') existing.surgeries += 1;

      existing.totalBilled += Number(tx.amount) || 0;
      existing.totalPaid += Number(tx.paidAmount) || 0;
      if (tx.date > existing.lastVisitDate) {
        existing.lastVisitDate = tx.date;
      }

      customerMap.set(tx.patientId, existing);
    }

    return Array.from(customerMap.values()).sort((a, b) => b.totalPaid - a.totalPaid);
  }, [periodTransactions]);

  const handleExportReportExcel = () => {
    const headers = [
      'رقم الفاتورة',
      'التاريخ',
      'الوقت',
      'رقم الملف',
      'اسم العميل',
      'الجوال',
      'نوع الخدمة',
      'البيان / العملية',
      'الإجمالي (ر.س)',
      'المدفوع (ر.س)',
      'المتبقي (ر.س)',
      'وسيلة الدفع',
      'الحالة',
    ];
    const rows = periodTransactions.map((t) => [
      t.invoiceNumber,
      t.date,
      t.time,
      t.patientFileNumber,
      t.patientName,
      t.patientPhone,
      SERVICE_TYPE_LABELS[t.type],
      t.title,
      t.amount,
      t.paidAmount,
      Math.max(0, t.amount - t.paidAmount),
      PAYMENT_METHOD_LABELS[t.paymentMethod],
      VISIT_STATUS_LABELS[t.status],
    ]);

    downloadExcelTable(
      `التقرير_المالي_${startDate}_إلى_${endDate}.xls`,
      'التقرير المالي للعيادة',
      headers,
      rows
    );
  };

  const openClinicalModal = (tx: Transaction) => {
    setSelectedTx(tx);
    setClinicalNotesInput(tx.doctorNotes || '');
    setClinicalStatusInput(tx.status === 'waiting' ? 'completed' : tx.status);
  };

  const handleSaveClinicalNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx || isSavingClinical) return;
    setIsSavingClinical(true);
    try {
      await onUpdateDoctorNotes(selectedTx, clinicalNotesInput.trim(), clinicalStatusInput);
      setSelectedTx(null);
    } finally {
      setIsSavingClinical(false);
    }
  };

  const handleAddSurgeryCatalogItem = () => {
    if (!newSurgeryName.trim() || sCatalogItems.length >= 20) return;
    setSCatalogItems([
      ...sCatalogItems,
      {
        name: newSurgeryName.trim(),
        price: Math.max(0, Number(newSurgeryPrice) || 0),
      },
    ]);
    setNewSurgeryName('');
    setNewSurgeryPrice(3500);
  };

  const handleRemoveSurgeryCatalogItem = (index: number) => {
    setSCatalogItems(sCatalogItems.filter((_, i) => i !== index));
  };

  const handleSaveSettingsForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingSettings) return;
    setIsSavingSettings(true);
    setSettingsSavedBanner(false);
    try {
      await onSaveSettings({
        clinicName: sClinicName.trim(),
        doctorName: sDoctorName.trim(),
        specialty: sSpecialty.trim(),
        phone: sPhone.trim(),
        city: sCity.trim(),
        address: sAddress.trim(),
        taxNumber: sTaxNumber.trim(),
        consultationPrice: Math.max(0, Number(sConsultationPrice) || 0),
        followupPrice: Math.max(0, Number(sFollowupPrice) || 0),
        defaultSurgeryPrice: Math.max(0, Number(sDefaultSurgeryPrice) || 0),
        surgeryCatalog: encodeSurgeryCatalog(sCatalogItems),
        doctorUsername: sDoctorUsername.trim() || 'admin',
        doctorPassword: sDoctorPassword.trim() || '123',
        receptionName: sReceptionName.trim() || 'موظف الاستقبال',
        receptionUsername: sReceptionUsername.trim() || 'reception',
        receptionPassword: sReceptionPassword.trim() || '123',
      });
      setSettingsSavedBanner(true);
      setTimeout(() => setSettingsSavedBanner(false), 3500);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const maxMonthlyRevenue = useMemo(() => {
    if (monthlyBreakdown.length === 0) return 1;
    return Math.max(1, ...monthlyBreakdown.map((m) => m.totalCollected));
  }, [monthlyBreakdown]);

  return (
    <div className="space-y-6">
      {/* Top Executive Navigation Bar for Doctor / Clinic Director */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">
            إدارة العيادة والتقارير — {settings.doctorName}
          </h1>
          <p className="text-xs text-slate-500">
            {settings.clinicName} · {settings.specialty} · تقارير الدخل الشهري وإحصائيات العملاء وإعدادات الأسعار والحسابات
          </p>
        </div>

        {/* Sub-view Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-md self-start lg:self-auto">
          <button
            type="button"
            onClick={() => onChangeSection('reports')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'reports'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-teal-700" />
            <span>التقارير المالية والإحصائيات</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSection('clinical')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'clinical'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5 text-teal-700" />
            <span>عيادة الطبيب والتشخيص</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSection('settings')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'settings'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-teal-700" />
            <span>إعدادات العيادة والأسعار والحسابات</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: FINANCIAL REPORTS, CUSTOM PERIOD STATS & CUSTOMER ANALYTICS
         ===================================================================== */}
      {activeSection === 'reports' && (
        <div className="space-y-6">
          {/* Date Period Selector Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>تخصيص فترة الإحصائيات والتقارير المالية</span>
                </div>
                <p className="text-xs text-slate-500">
                  اختر فترة زمنية محددة لعرض إجمالي الدخل بالريال السعودي، تفصيل الكشوفات والعمليات، وتقرير العملاء
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-md">
                  {(
                    [
                      { id: 'this_month', label: 'هذا الشهر' },
                      { id: 'last_month', label: 'الشهر الماضي' },
                      { id: 'last_3_months', label: 'آخر 3 أشهر' },
                      { id: 'this_year', label: 'هذا العام' },
                      { id: 'all', label: 'كل الفترات' },
                      { id: 'custom', label: 'فترة مخصصة' },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        datePreset === p.id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleExportReportExcel}
                  disabled={periodTransactions.length === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>تصدير التقرير (Excel)</span>
                </button>
              </div>
            </div>

            {/* Custom Start & End Date Inputs */}
            {datePreset !== 'all' && (
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <label className="text-slate-600 font-medium">من تاريخ:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setDatePreset('custom');
                      setStartDate(e.target.value);
                    }}
                    className="px-3 py-1.5 font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-slate-600 font-medium">إلى تاريخ:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setDatePreset('custom');
                      setEndDate(e.target.value);
                    }}
                    className="px-3 py-1.5 font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div className="text-slate-500">
                  عدد العمليات والزيارات في الفترة:{' '}
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {periodTransactions.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {transactions.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                لا توجد بيانات مالية أو حجوزات مسجلة حتى الآن
              </h3>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                يمكنك إضافة عملاء وحجوزات من واجهة الاستقبال، أو تحميل بيانات نموذجية لعيادة سعودية لتجربة التقارير المالية فوراً.
              </p>
              <button
                type="button"
                onClick={onSeedSampleData}
                disabled={isSeeding}
                className="px-5 py-2.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSeeding ? 'جاري إنشاء البيانات النموذجية...' : 'تحميل بيانات عيادة نموذجية للتجربة'}
              </button>
            </div>
          )}

          {/* Primary KPI Strip for the Selected Period */}
          <div className="bg-white border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-200">
            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1">إجمالي الدخل المحصّل (للفترة)</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-teal-700">
                {formatSAR(analytics.totalCollected)}
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                من إجمالي فواتير <span className="font-mono tabular-nums">{formatSAR(analytics.totalBilled)}</span> · تحصيل <span className="font-mono tabular-nums">{analytics.collectionRate}%</span>
              </div>
            </div>

            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1">إيراد العمليات الجراحية</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {formatSAR(analytics.surgeriesRevenue)}
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                عدد العمليات المنفذة: <span className="font-mono tabular-nums font-semibold text-slate-800">{analytics.surgeriesCount}</span> عملية جراحية
              </div>
            </div>

            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1">إيراد الكشوفات والمتابعات</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {formatSAR(analytics.consultationsRevenue + analytics.followupsRevenue)}
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                الكشوفات: <span className="font-mono tabular-nums">{analytics.consultationsCount}</span> ({formatSAR(analytics.consultationsRevenue)}) · المتابعات: <span className="font-mono tabular-nums">{analytics.followupsCount}</span> ({formatSAR(analytics.followupsRevenue)})
              </div>
            </div>

            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1">إحصائيات العملاء والمستحقات</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {analytics.activeCustomersCount}{' '}
                <span className="text-sm font-normal text-slate-500">عميل نشط</span>
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                متوسط العائد/عميل: <span className="font-mono tabular-nums">{formatSAR(analytics.avgRevenuePerCustomer)}</span> · متبقي للتحصيل: <span className="font-mono tabular-nums text-amber-700">{formatSAR(analytics.totalRemaining)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Income Breakdown & Payment Methods Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    تقرير الدخل الشهري وتوزيع الإيرادات (ر.س)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    مقارنة الدخل الشهري المحصّل من الكشوفات والمتابعات والعمليات الجراحية
                  </p>
                </div>
              </div>

              {monthlyBreakdown.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  لا توجد إيرادات مسجلة في هذه الفترة.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {monthlyBreakdown.map((m) => {
                      const widthPct = Math.max(
                        4,
                        Math.round((m.totalCollected / maxMonthlyRevenue) * 100)
                      );
                      return (
                        <div key={m.month} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono tabular-nums font-semibold text-slate-800">
                              شهر {m.month} ({m.count} زيارة/عملية)
                            </span>
                            <span className="font-mono tabular-nums font-bold text-teal-700">
                              {formatSAR(m.totalCollected)}
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-teal-700 rounded-sm transition-all duration-200"
                              style={{ width: `${widthPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="overflow-x-auto pt-3 border-t border-slate-200">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="py-2.5 px-2 text-right font-medium">الشهر</th>
                          <th className="py-2.5 px-2 text-left font-medium">إيراد الكشوفات</th>
                          <th className="py-2.5 px-2 text-left font-medium">إيراد المتابعات</th>
                          <th className="py-2.5 px-2 text-left font-medium">إيراد العمليات</th>
                          <th className="py-2.5 px-2 text-left font-medium">إجمالي المحصّل</th>
                          <th className="py-2.5 px-2 text-left font-medium">المتبقي</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                        {monthlyBreakdown.map((m) => (
                          <tr key={m.month} className="hover:bg-slate-50">
                            <td className="py-2.5 px-2 font-semibold text-slate-900">
                              {m.month}
                            </td>
                            <td className="py-2.5 px-2 text-left text-slate-700">
                              {formatSAR(m.consultationsRev)}
                            </td>
                            <td className="py-2.5 px-2 text-left text-slate-700">
                              {formatSAR(m.followupsRev)}
                            </td>
                            <td className="py-2.5 px-2 text-left font-medium text-slate-900">
                              {formatSAR(m.surgeriesRev)}
                            </td>
                            <td className="py-2.5 px-2 text-left font-bold text-teal-700">
                              {formatSAR(m.totalCollected)}
                            </td>
                            <td className="py-2.5 px-2 text-left text-amber-700">
                              {formatSAR(m.totalRemaining)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-base font-bold text-slate-900">
                    توزيع الدخل حسب وسائل الدفع
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    إجمالي المبالغ المحصّلة خلال الفترة المحددة
                  </p>
                </div>

                <div className="space-y-3">
                  {(['mada', 'cash', 'transfer', 'insurance', 'tabby'] as const).map(
                    (method) => {
                      const amount = analytics.paymentMethodTotals[method] || 0;
                      const pct =
                        analytics.totalCollected > 0
                          ? Math.round((amount / analytics.totalCollected) * 100)
                          : 0;
                      return (
                        <div key={method} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-700">
                              {PAYMENT_METHOD_LABELS[method]}
                            </span>
                            <span className="font-mono tabular-nums font-semibold text-slate-900">
                              {formatSAR(amount)} ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-slate-700 rounded-sm transition-all duration-200"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>إجمالي العملاء المسجلين بالعيادة:</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {patients.length} عميل
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>العملاء النشطين خلال الفترة:</span>
                  <span className="font-mono tabular-nums font-bold text-teal-700">
                    {analytics.activeCustomersCount} عميل
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Financial & Clinical Report Table */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  تقرير العملاء والمرضى خلال الفترة المحددة ({customerReportRows.length} عميل)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  ملخص زيارات كل عميل، عدد الكشوفات والمتابعات والعمليات الجراحية، وإجمالي المدفوعات بالريال
                </p>
              </div>
            </div>

            {customerReportRows.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                لا توجد زيارات للعملاء في الفترة المختارة.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-500">
                      <th className="py-3 px-3 text-right font-medium">رقم الملف</th>
                      <th className="py-3 px-3 text-right font-medium">اسم العميل</th>
                      <th className="py-3 px-3 text-right font-medium">الجوال</th>
                      <th className="py-3 px-3 text-center font-medium">كشوفات</th>
                      <th className="py-3 px-3 text-center font-medium">متابعات</th>
                      <th className="py-3 px-3 text-center font-medium">عمليات جراحية</th>
                      <th className="py-3 px-3 text-left font-medium">المدفوع (ر.س)</th>
                      <th className="py-3 px-3 text-left font-medium">المتبقي (ر.س)</th>
                      <th className="py-3 px-3 text-left font-medium">آخر زيارة</th>
                      <th className="py-3 px-3 text-left font-medium">ملف المريض</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {customerReportRows.map((row) => {
                      const rem = Math.max(0, row.totalBilled - row.totalPaid);
                      const fullPatient = patients.find((p) => p.id === row.patientId);

                      return (
                        <tr key={row.patientId} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono tabular-nums text-xs font-semibold text-slate-700">
                            {row.patientFileNumber}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {row.patientName}
                          </td>
                          <td className="py-3 px-3 font-mono tabular-nums text-xs text-slate-600">
                            {row.patientPhone}
                          </td>
                          <td className="py-3 px-3 text-center font-mono tabular-nums text-xs">
                            {row.consultations}
                          </td>
                          <td className="py-3 px-3 text-center font-mono tabular-nums text-xs">
                            {row.followups}
                          </td>
                          <td className="py-3 px-3 text-center font-mono tabular-nums text-xs font-semibold text-slate-900">
                            {row.surgeries}
                          </td>
                          <td className="py-3 px-3 text-left font-mono tabular-nums font-semibold text-teal-700">
                            {formatSAR(row.totalPaid)}
                          </td>
                          <td className="py-3 px-3 text-left font-mono tabular-nums text-xs">
                            <span className={rem > 0 ? 'text-amber-700 font-semibold' : 'text-slate-400'}>
                              {formatSAR(rem)}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-left font-mono tabular-nums text-xs text-slate-500">
                            {row.lastVisitDate}
                          </td>
                          <td className="py-3 px-3 text-left">
                            {fullPatient && (
                              <button
                                type="button"
                                onClick={() => setSelectedPatientForHistory(fullPatient)}
                                className="px-2.5 py-1 text-xs font-medium text-teal-700 hover:bg-teal-50 border border-slate-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                السجل الكامل
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 2: DOCTOR'S CLINICAL DESK & PATIENT DIAGNOSIS / SURGERY LOG
         ===================================================================== */}
      {activeSection === 'clinical' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              سجل الكشوفات، المتابعات، والتقارير الجراحية للعملاء
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              تدوين التشخيص الطبي، التوصيات العلاجية، أو تفاصيل العملية الجراحية لكل عميل
            </p>
          </div>

          {transactions.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500">
              لا توجد زيارات مسجلة حالياً.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-3 px-3 text-right font-medium">التاريخ والوقت</th>
                    <th className="py-3 px-3 text-right font-medium">العميل</th>
                    <th className="py-3 px-3 text-right font-medium">نوع الخدمة / العملية</th>
                    <th className="py-3 px-3 text-right font-medium">التقرير الطبي / التشخيص</th>
                    <th className="py-3 px-3 text-right font-medium">الحالة</th>
                    <th className="py-3 px-3 text-left font-medium">إجراء الطبيب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 align-top font-mono tabular-nums text-xs text-slate-700">
                        <div className="font-semibold text-slate-900">{tx.date}</div>
                        <div className="text-slate-400">{tx.time}</div>
                      </td>
                      <td className="py-3.5 px-3 align-top">
                        <div className="font-semibold text-slate-900">{tx.patientName}</div>
                        <div className="text-xs font-mono tabular-nums text-slate-500">
                          {tx.patientFileNumber} · {tx.patientPhone}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 align-top">
                        <div className="font-medium text-slate-900">{tx.title}</div>
                        <div className="text-xs text-slate-500">
                          {SERVICE_TYPE_LABELS[tx.type]} ·{' '}
                          <span className="font-mono tabular-nums">{formatSAR(tx.amount)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 align-top max-w-md">
                        {tx.doctorNotes ? (
                          <p className="text-xs text-slate-700 leading-relaxed">{tx.doctorNotes}</p>
                        ) : (
                          <span className="text-xs text-slate-400">لم يُسجّل تشخيص بعد</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 align-top text-xs font-medium text-slate-700">
                        {VISIT_STATUS_LABELS[tx.status]}
                      </td>
                      <td className="py-3.5 px-3 align-top text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openClinicalModal(tx)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            كتابة التشخيص / التقرير
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenInvoice(tx)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-200 rounded transition-colors cursor-pointer"
                            title="عرض الفاتورة"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          VIEW 3: CLINIC SETTINGS, PRICING, AND STAFF LOGIN CREDENTIALS
         ===================================================================== */}
      {activeSection === 'settings' && (
        <form onSubmit={handleSaveSettingsForm} className="space-y-6">
          {settingsSavedBanner && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center gap-2 text-xs font-medium text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                تم حفظ إعدادات العيادة، أسعار الكشوفات والعمليات، وبيانات تسجيل الدخول للطبيب والريسبشن بنجاح.
              </span>
            </div>
          )}

          {/* Section 1: Staff Login Credentials Management (Doctor & Receptionist) */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-teal-700" />
                  <h2 className="text-base font-bold text-slate-900">
                    إدارة حسابات تسجيل الدخول (الطبيب المدير وموظف الريسبشن)
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  تعيين أو تغيير اسم المستخدم وكلمة المرور الخاصة بالطبيب المدير، وإنشاء أو تعديل بيانات دخول موظف الاستقبال (الريسبشن)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors self-start cursor-pointer"
              >
                {showPasswords ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>إخفاء كلمات المرور</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>إظهار كلمات المرور</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Doctor Account Credentials */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                  بيانات دخول الطبيب مدير العيادة (الصلاحيات الكاملة)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      اسم المستخدم للطبيب <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      minLength={1}
                      maxLength={60}
                      value={sDoctorUsername}
                      onChange={(e) => setSDoctorUsername(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      كلمة المرور للطبيب <span className="text-red-600">*</span>
                    </label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      required
                      minLength={1}
                      maxLength={100}
                      value={sDoctorPassword}
                      onChange={(e) => setSDoctorPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>
                </div>
              </div>

              {/* Receptionist Account Credentials created by Doctor */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                  بيانات دخول موظف الاستقبال (الريسبشن) التي ينشئها الطبيب
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      اسم موظف الاستقبال
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={sReceptionName}
                      onChange={(e) => setSReceptionName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      اسم المستخدم للريسبشن <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      minLength={1}
                      maxLength={60}
                      value={sReceptionUsername}
                      onChange={(e) => setSReceptionUsername(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      كلمة المرور للريسبشن <span className="text-red-600">*</span>
                    </label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      required
                      minLength={1}
                      maxLength={100}
                      value={sReceptionPassword}
                      onChange={(e) => setSReceptionPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Section 2: Clinic Profile & Doctor Data */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  بيانات العيادة والطبيب المدير
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  تظهر هذه البيانات في ترويسة النظام وإيصالات الدفع والفواتير الصادرة للعملاء
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  اسم العيادة / المركز الطبي <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={sClinicName}
                  onChange={(e) => setSClinicName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    اسم الطبيب مدير العيادة <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={sDoctorName}
                    onChange={(e) => setSDoctorName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    التخصص الطبي والجراحي <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={sSpecialty}
                    onChange={(e) => setSSpecialty(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    رقم هاتف / جوال العيادة <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={5}
                    maxLength={30}
                    value={sPhone}
                    onChange={(e) => setSPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    المدينة (المملكة العربية السعودية) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    value={sCity}
                    onChange={(e) => setSCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  العنوان التفصيلي للعيادة <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={200}
                  value={sAddress}
                  onChange={(e) => setSAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  الرقم الضريبي / رقم ترخيص وزارة الصحة
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={sTaxNumber}
                  onChange={(e) => setSTaxNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>
            </div>

            {/* Section 3: Pricing Configuration in Saudi Riyals (SAR) */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  تعيين أسعار الكشوفات والمتابعات والعمليات الجراحية (ر.س)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  تُطبّق هذه الأسعار تلقائياً لدى موظف الاستقبال عند حجز كشف أو متابعة أو تسجيل عملية
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    سعر الكشف الأساسي (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={1000000}
                    value={sConsultationPrice}
                    onChange={(e) => setSConsultationPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums font-bold text-teal-800 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    سعر المتابعة الطبية (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={1000000}
                    value={sFollowupPrice}
                    onChange={(e) => setSFollowupPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums font-bold text-teal-800 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    السعر الافتراضي للعملية (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5000000}
                    value={sDefaultSurgeryPrice}
                    onChange={(e) => setSDefaultSurgeryPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Approved Surgical Procedures List */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-800">
                    قائمة العمليات الجراحية المعتمدة وأسعارها بالريال ({sCatalogItems.length}/20)
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    maxLength={100}
                    value={newSurgeryName}
                    onChange={(e) => setNewSurgeryName(e.target.value)}
                    placeholder="اسم العملية الجراحية الجديدة..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                  <input
                    type="number"
                    min={0}
                    max={5000000}
                    value={newSurgeryPrice}
                    onChange={(e) => setNewSurgeryPrice(Number(e.target.value) || 0)}
                    placeholder="السعر ر.س"
                    className="w-full sm:w-32 px-3 py-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSurgeryCatalogItem}
                    className="inline-flex items-center justify-center gap-1 px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة للقائمة</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-200 border border-slate-200 rounded-md max-h-60 overflow-y-auto">
                  {sCatalogItems.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      لا توجد عمليات مضافة في القائمة السريعة.
                    </div>
                  ) : (
                    sCatalogItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-slate-50"
                      >
                        <span className="font-medium text-slate-800">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono tabular-nums font-semibold text-teal-700">
                            {formatSAR(item.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSurgeryCatalogItem(idx)}
                            className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="حذف العملية"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isSavingSettings
                      ? 'جاري حفظ الإعدادات...'
                      : 'حفظ جميع الإعدادات والأسعار والحسابات'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* MODAL: Doctor Clinical Diagnosis & Notes */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                التشخيص الطبي والتقرير الجراحي للعميل
              </h3>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClinicalNotes} className="p-6 space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-1">
                <div className="font-semibold text-slate-900">
                  {selectedTx.patientName} ({selectedTx.patientFileNumber})
                </div>
                <div className="text-slate-600">
                  {SERVICE_TYPE_LABELS[selectedTx.type]}: {selectedTx.title} · بتاريخ{' '}
                  <span className="font-mono tabular-nums">{selectedTx.date}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  التشخيص الطبي / التوصيات العلاجية / تقرير العملية الجراحية
                </label>
                <textarea
                  rows={5}
                  maxLength={2000}
                  value={clinicalNotesInput}
                  onChange={(e) => setClinicalNotesInput(e.target.value)}
                  placeholder="اكتب تفاصيل الفحص السريري، التشخيص، الأدوية الموصوفة، أو ملخص الإجراء الجراحي..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  تحديث حالة الزيارة / العملية
                </label>
                <select
                  value={clinicalStatusInput}
                  onChange={(e) => setClinicalStatusInput(e.target.value as VisitStatus)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                >
                  <option value="waiting">بالانتظار</option>
                  <option value="in_progress">في العيادة</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSavingClinical}
                  className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSavingClinical ? 'جاري الحفظ...' : 'حفظ التقرير الطبي'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Full Patient Medical & Financial History */}
      {selectedPatientForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  السجل الطبي والمالي الكامل — {selectedPatientForHistory.fullName}
                </h3>
                <p className="text-xs font-mono tabular-nums text-slate-500 mt-0.5">
                  {selectedPatientForHistory.fileNumber} · الجوال: {selectedPatientForHistory.phone} · العمر: {selectedPatientForHistory.age} سنة
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatientForHistory(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {selectedPatientForHistory.notes && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">ملاحظات طبية مسجلة بملف العميل: </span>
                  {selectedPatientForHistory.notes}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5 px-2 text-right font-medium">التاريخ</th>
                      <th className="py-2.5 px-2 text-right font-medium">الخدمة / العملية</th>
                      <th className="py-2.5 px-2 text-right font-medium">التقرير الطبي</th>
                      <th className="py-2.5 px-2 text-left font-medium">الإجمالي</th>
                      <th className="py-2.5 px-2 text-left font-medium">المدفوع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {transactions
                      .filter((t) => t.patientId === selectedPatientForHistory.id)
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((t) => (
                        <tr key={t.id}>
                          <td className="py-3 px-2 font-mono tabular-nums text-slate-700">
                            {t.date}
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-semibold text-slate-900">{t.title}</div>
                            <div className="text-slate-500">{SERVICE_TYPE_LABELS[t.type]}</div>
                          </td>
                          <td className="py-3 px-2 text-slate-700">
                            {t.doctorNotes || t.receptionNotes || '—'}
                          </td>
                          <td className="py-3 px-2 text-left font-mono tabular-nums font-medium">
                            {formatSAR(t.amount)}
                          </td>
                          <td className="py-3 px-2 text-left font-mono tabular-nums font-semibold text-teal-700">
                            {formatSAR(t.paidAmount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
