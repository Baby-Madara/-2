import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  CalendarPlus,
  Clock,
  FileText,
  Check,
  X,
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
  VISIT_STATUS_LABELS,
  ARABIC_MONTHS,
  ARABIC_DAYS_SHORT,
  formatSAR,
  parseSurgeryCatalog,
  getTodayISO,
  getCurrentTimeHHMM,
} from '../types';

interface CalendarViewProps {
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
  onOpenInvoice: (tx: Transaction) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  settings,
  patients,
  transactions,
  onAddPatient,
  onCreateTransaction,
  onUpdateTransactionPaymentAndStatus,
  onOpenInvoice,
}) => {
  const todayISO = getTodayISO();
  const initialDate = useMemo(() => new Date(), []);

  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth()); // 0..11
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [typeFilter, setTypeFilter] = useState<'all' | ServiceType>('all');

  // Booking Modal State for Selected Calendar Day
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<ServiceType>('consultation');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [quickNewPatientMode, setQuickNewPatientMode] = useState(false);
  const [pFullName, setPFullName] = useState('');
  const [pPhone, setPPhone] = useState('05');
  const [pNationalId, setPNationalId] = useState('');
  const [bTitle, setBTitle] = useState('كشف استشاري أولي');
  const [bTime, setBTime] = useState(getCurrentTimeHHMM());
  const [bAmount, setBAmount] = useState<number>(settings.consultationPrice);
  const [bPaidAmount, setBPaidAmount] = useState<number>(settings.consultationPrice);
  const [bPaymentMethod, setBPaymentMethod] = useState<PaymentMethod>('mada');
  const [bReceptionNotes, setBReceptionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const surgeryCatalogItems = useMemo(
    () => parseSurgeryCatalog(settings.surgeryCatalog),
    [settings.surgeryCatalog]
  );

  // Navigate Month
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleGoToToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(getTodayISO());
  };

  // Group non-cancelled transactions by date (YYYY-MM-DD)
  const transactionsByDate = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const tx of transactions) {
      if (tx.status === 'cancelled') continue;
      if (typeFilter !== 'all' && tx.type !== typeFilter) continue;
      const list = map.get(tx.date) || [];
      list.push(tx);
      map.set(tx.date, list);
    }
    for (const [key, list] of map.entries()) {
      list.sort((a, b) => a.time.localeCompare(b.time));
      map.set(key, list);
    }
    return map;
  }, [transactions, typeFilter]);

  // Build Calendar Days Matrix for current viewYear & viewMonth
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const startWeekday = firstDayOfMonth.getDay(); // 0 (Sunday) .. 6 (Saturday)
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: Array<{
      dateISO: string | null;
      dayNumber: number | null;
      isToday: boolean;
      isSelected: boolean;
      bookings: Transaction[];
    }> = [];

    // Leading empty cells
    for (let i = 0; i < startWeekday; i++) {
      cells.push({
        dateISO: null,
        dayNumber: null,
        isToday: false,
        isSelected: false,
        bookings: [],
      });
    }

    const monthStr = String(viewMonth + 1).padStart(2, '0');
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = String(d).padStart(2, '0');
      const iso = `${viewYear}-${monthStr}-${dayStr}`;
      cells.push({
        dateISO: iso,
        dayNumber: d,
        isToday: iso === todayISO,
        isSelected: iso === selectedDate,
        bookings: transactionsByDate.get(iso) || [],
      });
    }

    return cells;
  }, [viewYear, viewMonth, todayISO, selectedDate, transactionsByDate]);

  const selectedDayBookings = useMemo(
    () => transactionsByDate.get(selectedDate) || [],
    [transactionsByDate, selectedDate]
  );

  // Month Summary Stats
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const monthSummary = useMemo(() => {
    const list = transactions.filter(
      (t) => t.date.startsWith(monthPrefix) && t.status !== 'cancelled'
    );
    return {
      totalCount: list.length,
      consultations: list.filter((t) => t.type === 'consultation').length,
      followups: list.filter((t) => t.type === 'followup').length,
      surgeries: list.filter((t) => t.type === 'surgery').length,
    };
  }, [transactions, monthPrefix]);

  const openQuickBookForSelectedDate = (type: ServiceType = 'consultation') => {
    setBookingType(type);
    setSelectedPatientId(patients[0]?.id ?? '');
    setQuickNewPatientMode(patients.length === 0);
    setPFullName('');
    setPPhone('05');
    setPNationalId('');
    setBTime(getCurrentTimeHHMM());
    setBPaymentMethod('mada');
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

  const handleSaveCalendarBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      let targetPatient = patients.find((p) => p.id === selectedPatientId) || null;
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
          age: 30,
          gender: 'male',
          notes: '',
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
        date: selectedDate,
        time: bTime,
        amount: safeAmount,
        paidAmount: safePaid,
        paymentMethod: bPaymentMethod,
        paymentStatus,
        status: 'scheduled',
        receptionNotes: bReceptionNotes.trim(),
        doctorNotes: '',
        invoiceNumber: `INV-${year}-${invSeq}`,
      });
      setShowBookingModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Calendar Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">
            تقويم الحجوزات والمواعيد والعمليات الجراحية
          </h1>
          <p className="text-xs text-slate-500">
            استعراض مواعيد الكشوفات والمتابعات والعمليات الجراحية موزعة على أيام الشهر مع إمكانية الحجز المباشر لأي يوم
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
            {(['all', 'consultation', 'followup', 'surgery'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  typeFilter === t
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'كل الحجوزات' : SERVICE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openQuickBookForSelectedDate('consultation')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>حجز موعد في ({selectedDate})</span>
          </button>
        </div>
      </div>

      {/* Main Calendar Grid + Selected Day Details Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Monthly Calendar Grid (2 Columns wide on XL) */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
          {/* Month Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">
                {ARABIC_MONTHS[viewMonth]} <span className="font-mono tabular-nums">{viewYear}</span>
              </h2>
              <span className="text-xs text-slate-500">
                ({monthSummary.totalCount} حجز في الشهر: {monthSummary.consultations} كشف · {monthSummary.followups} متابعة · {monthSummary.surgeries} عملية)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer"
                title="الشهر السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleGoToToday}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer"
              >
                اليوم
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer"
                title="الشهر التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/60">
            {ARABIC_DAYS_SHORT.map((dayName) => (
              <div
                key={dayName}
                className="py-2.5 text-center text-xs font-semibold text-slate-600 border-l last:border-l-0 border-slate-200"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 divide-y divide-slate-200">
            {calendarDays.map((cell, idx) => {
              if (!cell.dateISO || cell.dayNumber === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-28 bg-slate-50/40 border-l last:border-l-0 border-slate-200"
                  />
                );
              }

              return (
                <div
                  key={cell.dateISO}
                  onClick={() => setSelectedDate(cell.dateISO!)}
                  className={`min-h-28 p-2 border-l last:border-l-0 border-slate-200 transition-colors cursor-pointer flex flex-col justify-between ${
                    cell.isSelected
                      ? 'bg-teal-50/70 ring-1 ring-inset ring-teal-700'
                      : cell.isToday
                      ? 'bg-slate-50'
                      : 'bg-white hover:bg-slate-50/70'
                  }`}
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-mono tabular-nums font-bold px-1.5 py-0.5 rounded ${
                        cell.isToday
                          ? 'bg-teal-700 text-white'
                          : cell.isSelected
                          ? 'text-teal-800'
                          : 'text-slate-700'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {cell.bookings.length > 0 && (
                      <span className="text-[11px] font-mono tabular-nums text-slate-500">
                        {cell.bookings.length} مواعيد
                      </span>
                    )}
                  </div>

                  {/* Bookings Preview Inside Day Cell */}
                  <div className="space-y-1 overflow-hidden">
                    {cell.bookings.slice(0, 3).map((tx) => (
                      <div
                        key={tx.id}
                        className={`px-1.5 py-1 rounded text-[11px] truncate border ${
                          tx.type === 'surgery'
                            ? 'bg-amber-50/80 border-amber-200 text-amber-900 font-medium'
                            : tx.type === 'followup'
                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-teal-50/80 border-teal-200 text-teal-900'
                        }`}
                        title={`${tx.time} - ${tx.patientName} (${SERVICE_TYPE_LABELS[tx.type]})`}
                      >
                        <span className="font-mono tabular-nums">{tx.time}</span> · {tx.patientName}
                      </div>
                    ))}
                    {cell.bookings.length > 3 && (
                      <div className="text-[10px] text-slate-500 pr-1 font-medium">
                        + {cell.bookings.length - 3} حجوزات أخرى...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Schedule Panel (1 Column wide on XL) */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs text-slate-500">جدول مواعيد وحجوزات يوم</div>
              <h3 className="text-base font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {selectedDate} {selectedDate === todayISO && '(اليوم)'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => openQuickBookForSelectedDate('consultation')}
              className="px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              + إضافة حجز
            </button>
          </div>

          {selectedDayBookings.length === 0 ? (
            <div className="py-12 text-center space-y-3 border border-dashed border-slate-200 rounded-lg">
              <p className="text-xs text-slate-500">
                لا توجد حجوزات أو عمليات مسجلة في هذا اليوم ({selectedDate}).
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openQuickBookForSelectedDate('consultation')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors cursor-pointer"
                >
                  حجز كشف
                </button>
                <button
                  type="button"
                  onClick={() => openQuickBookForSelectedDate('surgery')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                >
                  تسجيل عملية
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {selectedDayBookings.map((tx) => {
                const remaining = Math.max(0, tx.amount - tx.paidAmount);
                return (
                  <div key={tx.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-sm text-slate-900">
                          {tx.patientName}
                        </div>
                        <div className="text-xs font-mono tabular-nums text-slate-500">
                          {tx.patientFileNumber} · {tx.patientPhone}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-mono tabular-nums font-semibold text-teal-800 bg-slate-100 px-2 py-1 rounded">
                        <Clock className="w-3 h-3" />
                        <span>{tx.time}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700">
                      <span className="font-semibold">{SERVICE_TYPE_LABELS[tx.type]}:</span>{' '}
                      {tx.title}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="font-mono tabular-nums">
                        <span className="text-slate-500">المدفوع: </span>
                        <span className="font-semibold text-teal-700">
                          {formatSAR(tx.paidAmount)}
                        </span>
                        {remaining > 0 && (
                          <span className="text-amber-700 mr-2">
                            (متبقي: {formatSAR(remaining)})
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{VISIT_STATUS_LABELS[tx.status]}</span>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      {tx.status === 'scheduled' && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateTransactionPaymentAndStatus(tx, {
                              paidAmount: tx.paidAmount,
                              paymentMethod: tx.paymentMethod,
                              status: 'waiting',
                              receptionNotes: tx.receptionNotes,
                            })
                          }
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors cursor-pointer"
                        >
                          تسجيل حضور بالصالة
                        </button>
                      )}
                      {tx.status === 'waiting' && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateTransactionPaymentAndStatus(tx, {
                              paidAmount: tx.paidAmount,
                              paymentMethod: tx.paymentMethod,
                              status: 'in_progress',
                              receptionNotes: tx.receptionNotes,
                            })
                          }
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                        >
                          إدخال للطبيب
                        </button>
                      )}
                      {tx.status === 'in_progress' && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateTransactionPaymentAndStatus(tx, {
                              paidAmount: tx.paidAmount,
                              paymentMethod: tx.paymentMethod,
                              status: 'completed',
                              receptionNotes: tx.receptionNotes,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded transition-colors cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>إكمال</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onOpenInvoice(tx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded transition-colors cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>إيصال</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Booking Modal for Selected Calendar Date */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-lg overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                حجز موعد جديد ليوم ({selectedDate})
              </h3>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCalendarBooking} className="p-6 space-y-4">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">العميل / المريض</label>
                  <button
                    type="button"
                    onClick={() => setQuickNewPatientMode(!quickNewPatientMode)}
                    className="text-xs font-medium text-teal-700 hover:underline cursor-pointer"
                  >
                    {quickNewPatientMode ? 'اختيار عميل مسجل' : '+ تسجيل عميل جديد فوراً'}
                  </button>
                </div>

                {!quickNewPatientMode ? (
                  <select
                    required
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} — ({p.phone} · {p.fileNumber})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <input
                      type="text"
                      required
                      value={pFullName}
                      onChange={(e) => setPFullName(e.target.value)}
                      placeholder="اسم العميل الرباعي *"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    البيان / اسم العملية
                  </label>
                  <input
                    type="text"
                    required
                    value={bTitle}
                    onChange={(e) => setBTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    وقت الموعد
                  </label>
                  <input
                    type="time"
                    required
                    value={bTime}
                    onChange={(e) => setBTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    الإجمالي (ر.س)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bAmount}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 0;
                      setBAmount(v);
                      setBPaidAmount(v);
                    }}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
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
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums text-teal-800 font-bold bg-slate-50 border border-slate-200 rounded-md"
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
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'جاري الحفظ...' : 'تأكيد الحجز في التقويم'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
