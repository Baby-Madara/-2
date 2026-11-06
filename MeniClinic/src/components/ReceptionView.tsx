import React, { useState, useMemo } from 'react';
import {
  UserPlus,
  CalendarPlus,
  Stethoscope,
  Search,
  CreditCard,
  FileText,
  Check,
  X,
  Edit3,
  Phone,
} from 'lucide-react';
import {
  ClinicSettings,
  Patient,
  Transaction,
  ServiceType,
  PaymentMethod,
  VisitStatus,
  SERVICE_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  VISIT_STATUS_LABELS,
  formatSAR,
  parseSurgeryCatalog,
  getTodayISO,
  getCurrentTimeHHMM,
} from '../types';

interface ReceptionViewProps {
  settings: ClinicSettings;
  patients: Patient[];
  transactions: Transaction[];
  onAddPatient: (
    data: Omit<Patient, 'id' | 'clinicOwnerId' | 'createdAt' | 'updatedAt'>
  ) => Promise<Patient | null>;
  onUpdatePatient: (
    patientId: string,
    existingPatient: Patient,
    updates: Partial<Patient>
  ) => Promise<void>;
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
  onOpenInvoice: (tx: Transaction) => void;
}

export const ReceptionView: React.FC<ReceptionViewProps> = ({
  settings,
  patients,
  transactions,
  onAddPatient,
  onUpdatePatient,
  onCreateTransaction,
  onUpdateTransactionPaymentAndStatus,
  onOpenInvoice,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'patients'>('queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'all' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(getTodayISO());
  const [typeFilter, setTypeFilter] = useState<'all' | ServiceType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | VisitStatus>('all');

  // Modals state
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<ServiceType>('consultation');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [bookingPhoneSearch, setBookingPhoneSearch] = useState<string>('');
  const [quickNewPatientMode, setQuickNewPatientMode] = useState(false);

  // Payment / Settlement Modal for existing transaction
  const [settlingTx, setSettlingTx] = useState<Transaction | null>(null);
  const [settlePaidAmount, setSettlePaidAmount] = useState<number>(0);
  const [settleMethod, setSettleMethod] = useState<PaymentMethod>('mada');
  const [settleStatus, setSettleStatus] = useState<VisitStatus>('completed');
  const [settleNotes, setSettleNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Patient Form Fields
  const [pFullName, setPFullName] = useState('');
  const [pPhone, setPPhone] = useState('');
  const [pNationalId, setPNationalId] = useState('');
  const [pAge, setPAge] = useState<number>(30);
  const [pGender, setPGender] = useState<'male' | 'female'>('male');
  const [pNotes, setPNotes] = useState('');

  // Booking Form Fields
  const [bTitle, setBTitle] = useState('');
  const [bDate, setBDate] = useState(getTodayISO());
  const [bTime, setBTime] = useState(getCurrentTimeHHMM());
  const [bAmount, setBAmount] = useState<number>(settings.consultationPrice);
  const [bPaidAmount, setBPaidAmount] = useState<number>(settings.consultationPrice);
  const [bPaymentMethod, setBPaymentMethod] = useState<PaymentMethod>('mada');
  const [bStatus, setBStatus] = useState<VisitStatus>('waiting');
  const [bReceptionNotes, setBReceptionNotes] = useState('');

  const surgeryCatalogItems = useMemo(
    () => parseSurgeryCatalog(settings.surgeryCatalog),
    [settings.surgeryCatalog]
  );

  const todayISO = getTodayISO();

  // Today's reception metrics
  const receptionSummary = useMemo(() => {
    const todayTxs = transactions.filter((t) => t.date === todayISO && t.status !== 'cancelled');
    const consultationsAndFollowups = todayTxs.filter(
      (t) => t.type === 'consultation' || t.type === 'followup'
    ).length;
    const surgeriesCount = transactions.filter(
      (t) => t.type === 'surgery' && t.status !== 'cancelled'
    ).length;
    const todayCollected = todayTxs.reduce((acc, t) => acc + (Number(t.paidAmount) || 0), 0);
    const totalPendingBalance = transactions
      .filter((t) => t.status !== 'cancelled')
      .reduce((acc, t) => acc + Math.max(0, (Number(t.amount) || 0) - (Number(t.paidAmount) || 0)), 0);

    return {
      consultationsAndFollowups,
      surgeriesCount,
      todayCollected,
      totalPendingBalance,
    };
  }, [transactions, todayISO]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        if (dateFilter === 'today' && t.date !== todayISO) return false;
        if (dateFilter === 'custom' && t.date !== customDate) return false;
        if (typeFilter !== 'all' && t.type !== typeFilter) return false;
        if (statusFilter !== 'all' && t.status !== statusFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchName = t.patientName.toLowerCase().includes(q);
          const matchPhone = t.patientPhone.toLowerCase().includes(q);
          const matchFile = t.patientFileNumber.toLowerCase().includes(q);
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchInv = t.invoiceNumber.toLowerCase().includes(q);
          if (!matchName && !matchPhone && !matchFile && !matchTitle && !matchInv) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.time.localeCompare(a.time);
      });
  }, [transactions, dateFilter, customDate, typeFilter, statusFilter, searchQuery, todayISO]);

  // Filtered Patients with financial aggregates
  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.trim().toLowerCase();
        return (
          p.fullName.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.fileNumber.toLowerCase().includes(q) ||
          p.nationalId.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.fullName.localeCompare(b.fullName, 'ar'));
  }, [patients, searchQuery]);

  // Open New Patient Modal
  const openNewPatientModal = () => {
    setEditingPatient(null);
    setPFullName('');
    setPPhone('05');
    setPNationalId('');
    setPAge(30);
    setPGender('male');
    setPNotes('');
    setShowPatientModal(true);
  };

  // Open Edit Patient Modal
  const openEditPatientModal = (patient: Patient) => {
    setEditingPatient(patient);
    setPFullName(patient.fullName);
    setPPhone(patient.phone);
    setPNationalId(patient.nationalId);
    setPAge(patient.age);
    setPGender(patient.gender);
    setPNotes(patient.notes);
    setShowPatientModal(true);
  };

  const bookingFilteredPatients = useMemo(() => {
    const q = bookingPhoneSearch.trim().toLowerCase();
    if (!q) return [];
    return patients.filter(
      (p) =>
        p.phone.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.fileNumber.toLowerCase().includes(q) ||
        (p.nationalId && p.nationalId.toLowerCase().includes(q))
    );
  }, [patients, bookingPhoneSearch]);

  const selectedBookingPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || null,
    [patients, selectedPatientId]
  );

  const handleBookingPhoneSearchChange = (val: string) => {
    setBookingPhoneSearch(val);
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

  // Open Booking Modal for a specific ServiceType & optional Patient
  const openBookingModalFor = (type: ServiceType, preselectPatientId?: string) => {
    setBookingType(type);
    setBookingPhoneSearch('');
    const defaultPatientId = preselectPatientId || '';
    setSelectedPatientId(defaultPatientId);
    setQuickNewPatientMode(patients.length === 0);
    setPFullName('');
    setPPhone('05');
    setPNationalId('');
    setPAge(30);
    setPGender('male');
    setPNotes('');

    setBDate(getTodayISO());
    setBTime(getCurrentTimeHHMM());
    setBPaymentMethod('mada');
    setBStatus('waiting');
    setBReceptionNotes('');

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
    setShowBookingModal(true);
  };

  const handleBookingTypeChange = (type: ServiceType) => {
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
  };

  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pFullName.trim() || !pPhone.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (editingPatient) {
        await onUpdatePatient(editingPatient.id, editingPatient, {
          fullName: pFullName.trim(),
          phone: pPhone.trim(),
          nationalId: pNationalId.trim(),
          age: Number(pAge) || 30,
          gender: pGender,
          notes: pNotes.trim(),
        });
      } else {
        const nextNum = 1001 + patients.length;
        await onAddPatient({
          fileNumber: `MRN-${nextNum}`,
          fullName: pFullName.trim(),
          phone: pPhone.trim(),
          nationalId: pNationalId.trim(),
          age: Number(pAge) || 30,
          gender: pGender,
          notes: pNotes.trim(),
        });
      }
      setShowPatientModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let targetPatient: Patient | null | undefined = patients.find(
        (p) => p.id === selectedPatientId
      );

      if (quickNewPatientMode) {
        if (!pFullName.trim() || !pPhone.trim()) {
          setIsSubmitting(false);
          return;
        }
        const nextNum = 1001 + patients.length;
        targetPatient = await onAddPatient({
          fileNumber: `MRN-${nextNum}`,
          fullName: pFullName.trim(),
          phone: pPhone.trim(),
          nationalId: pNationalId.trim(),
          age: Number(pAge) || 30,
          gender: pGender,
          notes: pNotes.trim(),
        });
      }

      if (!targetPatient) {
        setIsSubmitting(false);
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

      await onCreateTransaction({
        patientId: targetPatient.id,
        patientName: targetPatient.fullName,
        patientPhone: targetPatient.phone,
        patientFileNumber: targetPatient.fileNumber,
        type: bookingType,
        title: bTitle.trim() || SERVICE_TYPE_LABELS[bookingType],
        date: bDate,
        time: bTime,
        amount: safeAmount,
        paidAmount: safePaid,
        paymentMethod: bPaymentMethod,
        paymentStatus,
        status: bStatus,
        receptionNotes: bReceptionNotes.trim(),
        doctorNotes: '',
        invoiceNumber: `INV-${year}-${invSeq}`,
      });

      setShowBookingModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSettleModal = (tx: Transaction) => {
    setSettlingTx(tx);
    setSettlePaidAmount(tx.amount); // Default to settling the full amount
    setSettleMethod(tx.paymentMethod);
    setSettleStatus(tx.status);
    setSettleNotes(tx.receptionNotes);
  };

  const handleConfirmSettlement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlingTx || isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Once a patient is inside the Doctor's room ('in_progress'), Reception can only update payment/notes, not status
      const nextStatus: VisitStatus =
        settlingTx.status === 'in_progress' ? 'in_progress' : settleStatus;
      await onUpdateTransactionPaymentAndStatus(settlingTx, {
        paidAmount: Math.max(0, Math.min(settlingTx.amount, Number(settlePaidAmount) || 0)),
        paymentMethod: settleMethod,
        status: nextStatus,
        receptionNotes: settleNotes.trim(),
      });
      setSettlingTx(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStatusChange = async (tx: Transaction, nextStatus: VisitStatus) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onUpdateTransactionPaymentAndStatus(tx, {
        paidAmount: tx.paidAmount,
        paymentMethod: tx.paymentMethod,
        status: nextStatus,
        receptionNotes: tx.receptionNotes,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar for Reception */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">
            مكتب الاستقبال والحجوزات والتحصيل
          </h1>
          <p className="text-xs text-slate-500">
            إضافة العملاء الجدد · حجز الكشوفات والمتابعات · تسجيل وتحصيل العمليات الجراحية بالريال السعودي
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openNewPatientModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-teal-700" />
            <span>إضافة عميل جديد</span>
          </button>

          <button
            type="button"
            onClick={() => openBookingModalFor('consultation')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-teal-700" />
            <span>حجز كشف / متابعة</span>
          </button>

          <button
            type="button"
            onClick={() => openBookingModalFor('surgery')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>تسجيل ودفع عملية جراحية</span>
          </button>
        </div>
      </div>

      {/* Daily Reception Summary Strip (Single Elevation, Hairline Grid) */}
      <div className="bg-white border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-200">
        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">كشوفات ومتابعات اليوم</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {receptionSummary.consultationsAndFollowups}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            سعر الكشف: <span className="font-mono tabular-nums">{formatSAR(settings.consultationPrice)}</span> · المتابعة: <span className="font-mono tabular-nums">{formatSAR(settings.followupPrice)}</span>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">العمليات الجراحية المسجلة</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {receptionSummary.surgeriesCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            إجراءات جراحية مسجلة في النظام
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">إجمالي المحصّل اليوم</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-700">
            {formatSAR(receptionSummary.todayCollected)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            المدفوعات المستلمة بتاريخ اليوم ({todayISO})
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">مبالغ متبقية قيد التحصيل</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-700">
            {formatSAR(receptionSummary.totalPendingBalance)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            دفعات متبقية من عمليات أو حجوزات
          </div>
        </div>
      </div>

      {/* Sub-Navigation & Search Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Interactive View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md self-start">
            <button
              type="button"
              onClick={() => setActiveSubTab('queue')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSubTab === 'queue'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              سجل الكشوفات والعمليات والتحصيل ({transactions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('patients')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSubTab === 'patients'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              دليل العملاء والمرضى ({patients.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم، الجوال (05...)، رقم الملف، أو الفاتورة..."
              className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls for Queue Tab */}
        {activeSubTab === 'queue' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Date Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">التاريخ:</span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => setDateFilter('today')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dateFilter === 'today'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  اليوم
                </button>
                <button
                  type="button"
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dateFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  كل التواريخ
                </button>
                <button
                  type="button"
                  onClick={() => setDateFilter('custom')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dateFilter === 'custom'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  تاريخ محدد
                </button>
              </div>
              {dateFilter === 'custom' && (
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-2.5 py-1 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                />
              )}
            </div>

            {/* Service Type & Status Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
                {(['all', 'consultation', 'followup', 'surgery'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      typeFilter === t
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t === 'all' ? 'جميع الخدمات' : SERVICE_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | VisitStatus)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:border-teal-700"
              >
                <option value="all">جميع الحالات</option>
                <option value="scheduled">حجز مسبق (بانتظار الحضور)</option>
                <option value="waiting">بالانتظار في الصالة</option>
                <option value="in_progress">في العيادة</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        )}

        {/* TAB 1: Appointments, Surgeries & Billing Table */}
        {activeSubTab === 'queue' && (
          <div className="overflow-x-auto pt-2">
            {filteredTransactions.length === 0 ? (
              <div className="py-12 text-center space-y-3 border border-dashed border-slate-200 rounded-lg">
                <p className="text-sm text-slate-600">
                  لا توجد حجوزات أو عمليات جراحية مطابقة للبحث الحالي.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openBookingModalFor('consultation')}
                    className="px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                  >
                    حجز كشف جديد
                  </button>
                  <button
                    type="button"
                    onClick={() => openBookingModalFor('surgery')}
                    className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    تسجيل عملية جراحية
                  </button>
                </div>
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-3 px-3 text-right font-medium">الفاتورة والتاريخ</th>
                    <th className="py-3 px-3 text-right font-medium">العميل / المريض</th>
                    <th className="py-3 px-3 text-right font-medium">الخدمة / العملية</th>
                    <th className="py-3 px-3 text-left font-medium">الإجمالي</th>
                    <th className="py-3 px-3 text-left font-medium">المدفوع</th>
                    <th className="py-3 px-3 text-left font-medium">المتبقي</th>
                    <th className="py-3 px-3 text-right font-medium">حالة السداد والزيارة</th>
                    <th className="py-3 px-3 text-left font-medium">إجراءات الاستقبال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTransactions.map((tx) => {
                    const remaining = Math.max(0, tx.amount - tx.paidAmount);
                    const isTerminal = tx.status === 'completed' || tx.status === 'cancelled';

                    return (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3 align-top">
                          <div className="font-mono tabular-nums text-xs font-semibold text-slate-900">
                            {tx.invoiceNumber}
                          </div>
                          <div className="font-mono tabular-nums text-xs text-slate-500 mt-0.5">
                            {tx.date} · {tx.time}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 align-top">
                          <div className="font-semibold text-slate-900">{tx.patientName}</div>
                          <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                            {tx.patientFileNumber} · {tx.patientPhone}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 align-top">
                          <div className="font-medium text-slate-900">{tx.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {SERVICE_TYPE_LABELS[tx.type]}
                            {tx.receptionNotes ? ` · ${tx.receptionNotes}` : ''}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 align-top text-left font-mono tabular-nums font-medium text-slate-900 whitespace-nowrap">
                          {formatSAR(tx.amount)}
                        </td>

                        <td className="py-3.5 px-3 align-top text-left font-mono tabular-nums font-semibold text-teal-700 whitespace-nowrap">
                          {formatSAR(tx.paidAmount)}
                        </td>

                        <td className="py-3.5 px-3 align-top text-left font-mono tabular-nums whitespace-nowrap">
                          <span
                            className={
                              remaining > 0
                                ? 'font-semibold text-amber-700'
                                : 'text-slate-400'
                            }
                          >
                            {formatSAR(remaining)}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 align-top">
                          <div className="text-xs text-slate-800 font-medium">
                            {PAYMENT_STATUS_LABELS[tx.paymentStatus]} ·{' '}
                            <span className="text-slate-500">
                              {PAYMENT_METHOD_LABELS[tx.paymentMethod]}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            حالة الزيارة:{' '}
                            <span
                              className={
                                tx.status === 'completed'
                                  ? 'text-teal-700 font-medium'
                                  : tx.status === 'in_progress'
                                  ? 'text-amber-700 font-medium'
                                  : tx.status === 'cancelled'
                                  ? 'text-red-600 font-medium'
                                  : 'text-slate-700 font-medium'
                              }
                            >
                              {VISIT_STATUS_LABELS[tx.status]}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 align-top text-left">
                          <div className="flex items-center justify-end gap-1.5">
                            {!isTerminal && (
                              <button
                                type="button"
                                onClick={() => openSettleModal(tx)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>تحصيل / تحديث</span>
                              </button>
                            )}

                            {tx.status === 'scheduled' && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatusChange(tx, 'waiting')}
                                className="px-2.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                حضور للصالة
                              </button>
                            )}

                            {tx.status === 'waiting' && (
                              <button
                                type="button"
                                onClick={() => handleQuickStatusChange(tx, 'in_progress')}
                                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                إدخال للطبيب
                              </button>
                            )}

                            {tx.status === 'in_progress' && (
                              <span
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded whitespace-nowrap shrink-0"
                                title="المريض داخل غرفة الطبيب الآن — إنهاء الكشف أو الإرجاع من صلاحيات الطبيب"
                              >
                                <span>عند الطبيب بالداخل</span>
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => onOpenInvoice(tx)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              title="عرض وطباعة الإيصال"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>إيصال</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 2: Patients Directory */}
        {activeSubTab === 'patients' && (
          <div className="overflow-x-auto pt-2">
            {filteredPatients.length === 0 ? (
              <div className="py-12 text-center space-y-3 border border-dashed border-slate-200 rounded-lg">
                <p className="text-sm text-slate-600">
                  لا يوجد عملاء مسجلون مطابقون للبحث.
                </p>
                <button
                  type="button"
                  onClick={openNewPatientModal}
                  className="px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  إضافة عميل جديد
                </button>
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-3 px-3 text-right font-medium">رقم الملف</th>
                    <th className="py-3 px-3 text-right font-medium">اسم العميل</th>
                    <th className="py-3 px-3 text-right font-medium">رقم الجوال والهوية</th>
                    <th className="py-3 px-3 text-right font-medium">العمر / الجنس</th>
                    <th className="py-3 px-3 text-left font-medium">إجمالي المدفوعات</th>
                    <th className="py-3 px-3 text-left font-medium">حجز سريع للعميل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredPatients.map((patient) => {
                    const patientTxs = transactions.filter(
                      (t) => t.patientId === patient.id && t.status !== 'cancelled'
                    );
                    const totalPaid = patientTxs.reduce(
                      (sum, t) => sum + (Number(t.paidAmount) || 0),
                      0
                    );

                    return (
                      <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3 font-mono tabular-nums text-xs font-semibold text-slate-800">
                          {patient.fileNumber}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-slate-900">{patient.fullName}</div>
                          {patient.notes && (
                            <div className="text-xs text-slate-500 mt-0.5">{patient.notes}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-3 font-mono tabular-nums text-xs text-slate-700">
                          <div>{patient.phone}</div>
                          {patient.nationalId && (
                            <div className="text-slate-400">هوية: {patient.nationalId}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-600">
                          <span className="font-mono tabular-nums">{patient.age}</span> سنة ·{' '}
                          {patient.gender === 'female' ? 'أنثى' : 'ذكر'}
                        </td>
                        <td className="py-3.5 px-3 text-left font-mono tabular-nums">
                          <div className="font-semibold text-teal-700">{formatSAR(totalPaid)}</div>
                          <div className="text-xs text-slate-400">{patientTxs.length} زيارات/عمليات</div>
                        </td>
                        <td className="py-3.5 px-3 text-left">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openBookingModalFor('consultation', patient.id)}
                              className="px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              + كشف
                            </button>
                            <button
                              type="button"
                              onClick={() => openBookingModalFor('followup', patient.id)}
                              className="px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              + متابعة
                            </button>
                            <button
                              type="button"
                              onClick={() => openBookingModalFor('surgery', patient.id)}
                              className="px-2.5 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              + عملية جراحية
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditPatientModal(patient)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-200 rounded transition-colors cursor-pointer"
                              title="تعديل بيانات العميل"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Add / Edit Patient */}
      {showPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingPatient ? 'تعديل ملف العميل' : 'تسجيل ملف عميل / مريض جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setShowPatientModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePatient} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  اسم العميل الرباعي <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={pFullName}
                  onChange={(e) => setPFullName(e.target.value)}
                  placeholder="مثال: عبد الله بن محمد القحطاني"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    رقم الجوال السعودي <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    minLength={5}
                    maxLength={25}
                    value={pPhone}
                    onChange={(e) => setPPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    رقم الهوية الوطنية / الإقامة
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={pNationalId}
                    onChange={(e) => setPNationalId(e.target.value)}
                    placeholder="10xxxxxxxx / 20xxxxxxxx"
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    العمر (بالسنوات)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={150}
                    value={pAge}
                    onChange={(e) => setPAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    الجنس
                  </label>
                  <select
                    value={pGender}
                    onChange={(e) => setPGender(e.target.value as 'male' | 'female')}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ملاحظات طبية أولية (حساسية / أمراض مزمنة / تأمين)
                </label>
                <textarea
                  rows={2}
                  maxLength={1000}
                  value={pNotes}
                  onChange={(e) => setPNotes(e.target.value)}
                  placeholder="أي ملاحظات هامة للطبيب أو الاستقبال..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowPatientModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'جاري الحفظ...' : editingPatient ? 'حفظ التعديلات' : 'إنشاء ملف العميل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Book Consultation, Follow-up, or Surgical Procedure + Direct Payment */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-lg overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                حجز خدمة طبية أو تسجيل عملية جراحية وتحصيل الرسوم
              </h3>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBooking} className="p-6 space-y-5">
              {/* Step 1: Service Type Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  نوع الحجز أو الإجراء الطبي
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-md">
                  {(['consultation', 'followup', 'surgery'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleBookingTypeChange(type)}
                      className={`py-2 px-3 text-xs font-semibold rounded transition-colors cursor-pointer ${
                        bookingType === type
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {SERVICE_TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Existing Patient or Quick Register New Patient */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">
                    بيانات العميل / المريض
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickNewPatientMode(!quickNewPatientMode);
                      setSelectedPatientId('');
                      setBookingPhoneSearch('');
                    }}
                    className="text-xs font-medium text-teal-700 hover:underline cursor-pointer"
                  >
                    {quickNewPatientMode
                      ? 'البحث عن عميل مسجل مسبقاً'
                      : '+ تسجيل عميل جديد فوراً مع الحجز'}
                  </button>
                </div>

                {!quickNewPatientMode ? (
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-teal-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="search"
                        value={bookingPhoneSearch}
                        onChange={(e) => handleBookingPhoneSearchChange(e.target.value)}
                        placeholder="ابحث بالاسم، رقم الهاتف (05xxxxxxxx)، أو كود العميل (MRN-1001)..."
                        className="w-full pr-9 pl-8 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700 transition-colors"
                      />
                      {bookingPhoneSearch && (
                        <button
                          type="button"
                          onClick={() => handleBookingPhoneSearchChange('')}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="مسح البحث"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {selectedBookingPatient && !bookingPhoneSearch.trim() ? (
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
                            setBookingPhoneSearch('');
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded cursor-pointer"
                        >
                          تغيير العميل
                        </button>
                      </div>
                    ) : bookingPhoneSearch.trim() !== '' ? (
                      bookingFilteredPatients.length > 0 ? (
                        <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-md divide-y divide-slate-100 bg-white">
                          {bookingFilteredPatients.map((p) => {
                            const isSelected = p.id === selectedPatientId;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPatientId(p.id);
                                  setBookingPhoneSearch('');
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
                            لا يوجد عميل مطابق للبحث «{bookingPhoneSearch}»
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (/^[0-9+\s-]+$/.test(bookingPhoneSearch.trim())) {
                                setPPhone(bookingPhoneSearch.trim());
                              } else {
                                setPFullName(bookingPhoneSearch.trim());
                              }
                              setQuickNewPatientMode(true);
                            }}
                            className="px-2.5 py-1 bg-teal-700 text-white font-semibold rounded hover:bg-teal-800 shrink-0 cursor-pointer"
                          >
                            + تسجيله كعميل جديد
                          </button>
                        </div>
                      )
                    ) : null}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-md">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">اسم العميل الجديد *</label>
                      <input
                        type="text"
                        required
                        value={pFullName}
                        onChange={(e) => setPFullName(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">رقم الجوال *</label>
                      <input
                        type="tel"
                        required
                        value={pPhone}
                        onChange={(e) => setPPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-white border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">رقم الهوية / الإقامة</label>
                      <input
                        type="text"
                        value={pNationalId}
                        onChange={(e) => setPNationalId(e.target.value)}
                        placeholder="10xxxxxxxx"
                        className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-white border border-slate-200 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Service / Surgery Details & Date */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                {bookingType === 'surgery' && surgeryCatalogItems.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      اختيار من قائمة العمليات الجراحية المعتمدة بالعيادة
                    </label>
                    <select
                      onChange={(e) => {
                        const chosen = surgeryCatalogItems.find((i) => i.name === e.target.value);
                        if (chosen) {
                          setBTitle(chosen.name);
                          setBAmount(chosen.price);
                          setBPaidAmount(chosen.price);
                        }
                      }}
                      value={
                        surgeryCatalogItems.some((i) => i.name === bTitle) ? bTitle : ''
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    >
                      <option value="">-- اختر العملية لتعبئة السعر تلقائياً أو اكتب اسم العملية أدناه --</option>
                      {surgeryCatalogItems.map((item, idx) => (
                        <option key={idx} value={item.name}>
                          {item.name} ({formatSAR(item.price)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      بيان الخدمة / مسمى العملية <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={160}
                      value={bTitle}
                      onChange={(e) => setBTitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      تاريخ الموعد / العملية
                    </label>
                    <input
                      type="date"
                      required
                      value={bDate}
                      onChange={(e) => {
                        const nextDate = e.target.value;
                        setBDate(nextDate);
                        if (nextDate > getTodayISO()) {
                          setBStatus('scheduled');
                        }
                      }}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
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
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Payment & Billing in SAR */}
              <div className="space-y-4 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    التفاصيل المالية والدفع (بالريال السعودي ر.س)
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBPaidAmount(bAmount)}
                      className="text-teal-700 hover:underline cursor-pointer"
                    >
                      دفع كامل المبلغ
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setBPaidAmount(Math.round(bAmount / 2))}
                      className="text-slate-600 hover:underline cursor-pointer"
                    >
                      دفعة 50%
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setBPaidAmount(0)}
                      className="text-slate-600 hover:underline cursor-pointer"
                    >
                      تحصيل لاحقاً
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      إجمالي التكلفة (ر.س)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={5000000}
                      value={bAmount}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 0;
                        setBAmount(val);
                        setBPaidAmount(val);
                      }}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums font-semibold bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      المبلغ المدفوع الآن (ر.س)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={bAmount}
                      value={bPaidAmount}
                      onChange={(e) => setBPaidAmount(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums font-semibold text-teal-800 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      وسيلة الدفع
                    </label>
                    <select
                      value={bPaymentMethod}
                      onChange={(e) => setBPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    >
                      <option value="mada">شبكة مدى (POS)</option>
                      <option value="cash">نقدي (كاش)</option>
                      <option value="transfer">تحويل بنكي</option>
                      <option value="insurance">تأمين طبي</option>
                      <option value="tabby">تابي / تمارا</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      حالة الموعد الحالية
                    </label>
                    <select
                      value={bStatus}
                      onChange={(e) => setBStatus(e.target.value as VisitStatus)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    >
                      <option value="waiting">حضور فوري — جالس بالانتظار في الصالة الآن</option>
                      <option value="scheduled">حجز موعد مسبق — كرسي شاغر لحين الضغط على حضور</option>
                      <option value="in_progress">داخل العيادة / غرفة العمليات</option>
                      <option value="completed">مكتمل ومنتهي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      ملاحظات الاستقبال
                    </label>
                    <input
                      type="text"
                      maxLength={1000}
                      value={bReceptionNotes}
                      onChange={(e) => setBReceptionNotes(e.target.value)}
                      placeholder="مثال: تم سداد عربون العملية / تأمين بوبا..."
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-600">
                  المتبقي على العميل:{' '}
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {formatSAR(Math.max(0, bAmount - bPaidAmount))}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'جاري التسجيل...' : 'تأكيد الحجز وحفظ الدفعة'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Collect Payment / Update Queue Status */}
      {settlingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                تحصيل دفعة وتحديث حالة الزيارة / العملية
              </h3>
              <button
                type="button"
                onClick={() => setSettlingTx(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmSettlement} className="p-6 space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-1 text-xs">
                <div className="font-semibold text-slate-900">{settlingTx.patientName}</div>
                <div className="text-slate-600">
                  {SERVICE_TYPE_LABELS[settlingTx.type]}: {settlingTx.title}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
                  <span>إجمالي التكلفة:</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {formatSAR(settlingTx.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>المدفوع سابقاً:</span>
                  <span className="font-mono tabular-nums text-teal-700">
                    {formatSAR(settlingTx.paidAmount)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700">
                    إجمالي المبلغ المدفوع بعد التحصيل (ر.س)
                  </label>
                  <button
                    type="button"
                    onClick={() => setSettlePaidAmount(settlingTx.amount)}
                    className="text-xs text-teal-700 hover:underline cursor-pointer"
                  >
                    سداد كامل ({formatSAR(settlingTx.amount)})
                  </button>
                </div>
                <input
                  type="number"
                  min={0}
                  max={settlingTx.amount}
                  value={settlePaidAmount}
                  onChange={(e) => setSettlePaidAmount(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums font-bold text-teal-800 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    وسيلة الدفع
                  </label>
                  <select
                    value={settleMethod}
                    onChange={(e) => setSettleMethod(e.target.value as PaymentMethod)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="mada">شبكة مدى</option>
                    <option value="cash">نقدي</option>
                    <option value="transfer">تحويل بنكي</option>
                    <option value="insurance">تأمين طبي</option>
                    <option value="tabby">تابي / تمارا</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    تحديث حالة الزيارة
                  </label>
                  {settlingTx.status === 'in_progress' ? (
                    <div className="w-full px-3 py-2 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded-md">
                      في العيادة (تغيير الحالة من صلاحيات الطبيب)
                    </div>
                  ) : (
                    <select
                      value={settleStatus}
                      onChange={(e) => setSettleStatus(e.target.value as VisitStatus)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                    >
                      <option value="scheduled">حجز مسبق</option>
                      <option value="waiting">بالانتظار في الصالة</option>
                      <option value="in_progress">إدخال للعيادة</option>
                      <option value="cancelled">ملغي / مرتجع (قبل الدخول للطبيب)</option>
                    </select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ملاحظات السداد / الاستقبال
                </label>
                <input
                  type="text"
                  maxLength={1000}
                  value={settleNotes}
                  onChange={(e) => setSettleNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSettlingTx(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'جاري التحديث...' : 'حفظ التحصيل والحالة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
