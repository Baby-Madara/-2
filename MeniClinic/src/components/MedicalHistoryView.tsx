import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Phone,
  FileText,
  FileSpreadsheet,
  Save,
  CheckCircle2,
  Edit3,
  Stethoscope,
  ClipboardList,
  Calendar,
  Printer,
  X,
} from 'lucide-react';
import {
  Patient,
  Transaction,
  VisitStatus,
  SERVICE_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  VISIT_STATUS_LABELS,
  formatSAR,
  downloadExcelTable,
  getTodayISO,
} from '../types';

interface MedicalHistoryViewProps {
  patients: Patient[];
  transactions: Transaction[];
  onUpdatePatient: (
    patientId: string,
    existingPatient: Patient,
    updates: Partial<Patient>
  ) => Promise<void>;
  onUpdateDoctorNotes: (
    transaction: Transaction,
    doctorNotes: string,
    status: VisitStatus
  ) => Promise<void>;
  onOpenInvoice: (tx: Transaction) => void;
}

export const MedicalHistoryView: React.FC<MedicalHistoryViewProps> = ({
  patients,
  transactions,
  onUpdatePatient,
  onUpdateDoctorNotes,
  onOpenInvoice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    () => patients[0]?.id || ''
  );
  const [serviceFilter, setServiceFilter] = useState<
    'all' | 'consultation' | 'followup' | 'surgery'
  >('all');

  // Medical notes editor state for selected patient
  const [generalMedicalNotes, setGeneralMedicalNotes] = useState('');
  const [isSavingPatientNotes, setIsSavingPatientNotes] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

  // Edit Diagnosis Modal for a specific visit
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [diagnosisInput, setDiagnosisInput] = useState('');
  const [statusInput, setStatusInput] = useState<VisitStatus>('completed');
  const [isSavingDiagnosis, setIsSavingDiagnosis] = useState(false);

  // Filter patients by phone number, name, file number, or national ID
  const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.phone.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.fileNumber.toLowerCase().includes(q) ||
        p.nationalId.toLowerCase().includes(q)
    );
  }, [patients, searchQuery]);

  // Auto-select first matching patient when searching by phone or name
  useEffect(() => {
    if (
      filteredPatients.length > 0 &&
      !filteredPatients.some((p) => p.id === selectedPatientId)
    ) {
      setSelectedPatientId(filteredPatients[0].id);
    }
  }, [filteredPatients, selectedPatientId]);

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) || null,
    [patients, selectedPatientId]
  );

  useEffect(() => {
    if (selectedPatient) {
      setGeneralMedicalNotes(selectedPatient.notes || '');
      setSavedBanner(false);
    }
  }, [selectedPatient]);

  // All visits/surgeries for the selected patient sorted newest first
  const patientTransactions = useMemo(() => {
    if (!selectedPatient) return [];
    return transactions
      .filter((t) => {
        if (t.patientId !== selectedPatient.id) return false;
        if (serviceFilter !== 'all' && t.type !== serviceFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.time.localeCompare(a.time);
      });
  }, [transactions, selectedPatient, serviceFilter]);

  // Patient clinical & financial summary
  const patientSummary = useMemo(() => {
    if (!selectedPatient) {
      return {
        totalVisits: 0,
        consultations: 0,
        followups: 0,
        surgeries: 0,
        totalBilled: 0,
        totalPaid: 0,
        remaining: 0,
      };
    }
    const allForPatient = transactions.filter(
      (t) => t.patientId === selectedPatient.id && t.status !== 'cancelled'
    );
    const consultations = allForPatient.filter((t) => t.type === 'consultation').length;
    const followups = allForPatient.filter((t) => t.type === 'followup').length;
    const surgeries = allForPatient.filter((t) => t.type === 'surgery').length;
    const totalBilled = allForPatient.reduce((s, t) => s + (Number(t.amount) || 0), 0);
    const totalPaid = allForPatient.reduce((s, t) => s + (Number(t.paidAmount) || 0), 0);
    const remaining = Math.max(0, totalBilled - totalPaid);

    return {
      totalVisits: allForPatient.length,
      consultations,
      followups,
      surgeries,
      totalBilled,
      totalPaid,
      remaining,
    };
  }, [selectedPatient, transactions]);

  const handleSaveGeneralMedicalNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || isSavingPatientNotes) return;
    setIsSavingPatientNotes(true);
    setSavedBanner(false);
    try {
      await onUpdatePatient(selectedPatient.id, selectedPatient, {
        notes: generalMedicalNotes.trim(),
      });
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 3000);
    } finally {
      setIsSavingPatientNotes(false);
    }
  };

  const openDiagnosisEditor = (tx: Transaction) => {
    setEditingTx(tx);
    setDiagnosisInput(tx.doctorNotes || '');
    setStatusInput(tx.status);
  };

  const handleSaveDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTx || isSavingDiagnosis) return;
    setIsSavingDiagnosis(true);
    try {
      await onUpdateDoctorNotes(editingTx, diagnosisInput.trim(), statusInput);
      setEditingTx(null);
    } finally {
      setIsSavingDiagnosis(false);
    }
  };

  const handleExportPatientHistoryExcel = () => {
    if (!selectedPatient) return;
    const headers = [
      'رقم الفاتورة',
      'التاريخ',
      'الوقت',
      'نوع الخدمة',
      'البيان / العملية الجراحية',
      'التشخيص والتقرير الطبي',
      'ملاحظات الاستقبال',
      'الإجمالي (ر.س)',
      'المدفوع (ر.س)',
      'المتبقي (ر.س)',
      'وسيلة الدفع',
      'حالة الزيارة',
    ];
    const rows = patientTransactions.map((t) => [
      t.invoiceNumber,
      t.date,
      t.time,
      SERVICE_TYPE_LABELS[t.type],
      t.title,
      t.doctorNotes || 'لم يسجل تشخيص',
      t.receptionNotes || '—',
      t.amount,
      t.paidAmount,
      Math.max(0, t.amount - t.paidAmount),
      PAYMENT_METHOD_LABELS[t.paymentMethod],
      VISIT_STATUS_LABELS[t.status],
    ]);

    downloadExcelTable(
      `التاريخ_المرضي_${selectedPatient.fullName.replace(/\s+/g, '_')}_${getTodayISO()}.xls`,
      `التاريخ المرضي - ${selectedPatient.fileNumber}`,
      headers,
      rows
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Header Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900">
              التاريخ المرضي الشامل وسجل التشخيصات
            </h1>
            <p className="text-xs text-slate-500">
              ابحث عن أي مريض برقم الجوال السعودي (05xxxxxxxx) أو الاسم لعرض كافة كشوفاته، متابعاته، عملياته الجراحية، وتشخيصاته الطبية
            </p>
          </div>

          {selectedPatient && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة السجل الطبي</span>
              </button>
              <button
                type="button"
                onClick={handleExportPatientHistoryExcel}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>تصدير التاريخ المرضي (Excel)</span>
              </button>
            </div>
          )}
        </div>

        {/* Prominent Phone & Name Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-teal-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث هنا برقم الجوال (مثال: 0504112233) أو اسم المريض أو رقم الملف الطبي (MRN-1001)..."
            className="w-full pr-10 pl-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              مسح البحث
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Split: Patient Selector List (Right) + Full Medical Dossier (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Matching Patients List (4 Columns wide on LG) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg overflow-hidden no-print">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              قائمة المرضى المطابقين ({filteredPatients.length})
            </span>
            <span className="text-[11px] text-slate-500">اختر المريض لعرض تاريخه</span>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              لا يوجد مريض مسجل بهذا الرقم أو الاسم ({searchQuery}).
            </div>
          ) : (
            <div className="divide-y divide-slate-200 max-h-[680px] overflow-y-auto">
              {filteredPatients.map((p) => {
                const isSelected = p.id === selectedPatient?.id;
                const visitCount = transactions.filter(
                  (t) => t.patientId === p.id && t.status !== 'cancelled'
                ).length;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`w-full text-right p-4 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-teal-50/80 font-semibold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div
                        className={`text-sm truncate ${
                          isSelected ? 'text-teal-950 font-bold' : 'text-slate-900 font-semibold'
                        }`}
                      >
                        {p.fullName}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-slate-600">
                        <Phone className="w-3 h-3 text-teal-700 shrink-0" />
                        <span>{p.phone}</span>
                        <span>·</span>
                        <span className="text-slate-400">{p.fileNumber}</span>
                      </div>
                      {p.nationalId && (
                        <div className="text-[11px] font-mono tabular-nums text-slate-400">
                          هوية: {p.nationalId}
                        </div>
                      )}
                    </div>

                    <div className="text-left shrink-0 space-y-1">
                      <div className="text-xs font-mono tabular-nums text-teal-700 font-semibold">
                        {visitCount} زيارات
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {p.age} سنة · {p.gender === 'female' ? 'أنثى' : 'ذكر'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Left Column: Complete Patient Medical History & Diagnoses Dossier (8 Columns wide on LG) */}
        <div className="lg:col-span-8 space-y-6">
          {!selectedPatient ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-sm text-slate-500">
              اختر مريضاً من القائمة الجانبية أو ابحث برقم الجوال لعرض تاريخه المرضي الكامل.
            </div>
          ) : (
            <>
              {/* Card 1: Patient Profile & Chronic Medical Notes */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        {selectedPatient.fullName}
                      </h2>
                      <span className="text-xs font-mono tabular-nums text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-semibold">
                        {selectedPatient.fileNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-mono tabular-nums">
                      رقم الجوال: {selectedPatient.phone} · رقم الهوية/الإقامة:{' '}
                      {selectedPatient.nationalId || 'غير مسجل'} · العمر: {selectedPatient.age} سنة (
                      {selectedPatient.gender === 'female' ? 'أنثى' : 'ذكر'})
                    </p>
                  </div>

                  {/* Quick Summary Numbers */}
                  <div className="flex items-center gap-4 text-xs bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2">
                    <div>
                      <span className="text-slate-500 block">إجمالي المدفوع</span>
                      <span className="font-mono tabular-nums font-bold text-teal-700">
                        {formatSAR(patientSummary.totalPaid)}
                      </span>
                    </div>
                    <div className="border-r border-slate-200 pr-4">
                      <span className="text-slate-500 block">المتبقي</span>
                      <span className="font-mono tabular-nums font-bold text-amber-700">
                        {formatSAR(patientSummary.remaining)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary Strip of Patient's Visits */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <div className="text-[11px] text-slate-500">إجمالي الزيارات</div>
                    <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                      {patientSummary.totalVisits}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <div className="text-[11px] text-slate-500">الكشوفات الطبية</div>
                    <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                      {patientSummary.consultations}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <div className="text-[11px] text-slate-500">المتابعات</div>
                    <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                      {patientSummary.followups}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <div className="text-[11px] text-slate-500">العمليات الجراحية</div>
                    <div className="text-lg font-bold font-mono tabular-nums text-teal-700 mt-0.5">
                      {patientSummary.surgeries}
                    </div>
                  </div>
                </div>

                {/* Editable Chronic Conditions / Allergies / Medical Background */}
                <form onSubmit={handleSaveGeneralMedicalNotes} className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                      <span>التاريخ المرضي العام للمريض (أمراض مزمنة، حساسية دوائية، عمليات سابقة)</span>
                    </label>
                    {savedBanner && (
                      <span className="inline-flex items-center gap-1 text-xs text-teal-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تم الحفظ</span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <textarea
                      rows={2}
                      maxLength={1000}
                      value={generalMedicalNotes}
                      onChange={(e) => setGeneralMedicalNotes(e.target.value)}
                      placeholder="سجّل هنا أي أمراض مزمنة (ضغط، سكري)، حساسية لأدوية معينة، أو ملاحظات طبية دائمة..."
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                    <button
                      type="submit"
                      disabled={isSavingPatientNotes}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors shrink-0 self-end sm:self-stretch cursor-pointer no-print"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>حفظ الملاحظات</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Chronological Timeline of All Consultations, Follow-ups, Surgeries & Diagnoses */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-teal-700" />
                      <span>سجل الزيارات والتشخيصات والعمليات المسجلة ({patientTransactions.length})</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      جميع الكشوفات والمتابعات والعمليات الجراحية والتقارير الطبية المسجلة لهذا المريض
                    </p>
                  </div>

                  {/* Filter by Service Type */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md self-start no-print">
                    {(['all', 'consultation', 'followup', 'surgery'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setServiceFilter(t)}
                        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          serviceFilter === t
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t === 'all' ? 'الكل' : SERVICE_TYPE_LABELS[t]}
                      </button>
                    ))}
                  </div>
                </div>

                {patientTransactions.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
                    لا توجد زيارات أو عمليات مسجلة لهذا المريض ضمن التصنيف المختار.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientTransactions.map((tx) => {
                      const remaining = Math.max(0, tx.amount - tx.paidAmount);
                      return (
                        <div
                          key={tx.id}
                          className="border border-slate-200 rounded-lg p-4 space-y-3 hover:border-slate-300 transition-colors"
                        >
                          {/* Top Row: Service Type, Title, Date/Time, Invoice */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-teal-800">
                                  {SERVICE_TYPE_LABELS[tx.type]}
                                </span>
                                <span className="text-slate-300">·</span>
                                <span className="text-sm font-bold text-slate-900">
                                  {tx.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-slate-500">
                                <Calendar className="w-3 h-3" />
                                <span>{tx.date}</span>
                                <span>·</span>
                                <span>الساعة {tx.time}</span>
                                <span>·</span>
                                <span>فاتورة {tx.invoiceNumber}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-auto no-print">
                              <button
                                type="button"
                                onClick={() => openDiagnosisEditor(tx)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>
                                  {tx.doctorNotes ? 'تعديل التشخيص' : '+ إضافة تشخيص طبي'}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onOpenInvoice(tx)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded transition-colors cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>الإيصال</span>
                              </button>
                            </div>
                          </div>

                          {/* Diagnosis & Clinical Report Box */}
                          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
                            <div className="text-xs font-bold text-slate-800">
                              التشخيص الطبي والتقرير العلاجي / الجراحي:
                            </div>
                            {tx.doctorNotes ? (
                              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {tx.doctorNotes}
                              </p>
                            ) : (
                              <p className="text-xs text-slate-400">
                                لم يتم تدوين تشخيص طبي لهذه الزيارة بعد. اضغط على «+ إضافة تشخيص طبي» لتدوينه.
                              </p>
                            )}
                          </div>

                          {/* Reception Notes & Financial Footer */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                            <div>
                              <span>حالة الزيارة: </span>
                              <strong className="text-slate-900">
                                {VISIT_STATUS_LABELS[tx.status]}
                              </strong>
                              {tx.receptionNotes && (
                                <span className="text-slate-500 mr-2">
                                  · ملاحظات الاستقبال: {tx.receptionNotes}
                                </span>
                              )}
                            </div>

                            <div className="font-mono tabular-nums flex items-center gap-3">
                              <span>
                                الإجمالي: <strong>{formatSAR(tx.amount)}</strong>
                              </span>
                              <span className="text-teal-700 font-semibold">
                                المدفوع: {formatSAR(tx.paidAmount)} ({PAYMENT_METHOD_LABELS[tx.paymentMethod]})
                              </span>
                              {remaining > 0 && (
                                <span className="text-amber-700 font-semibold">
                                  المتبقي: {formatSAR(remaining)}
                                </span>
                              )}
                              {remaining === 0 && (
                                <span className="text-slate-400">
                                  ({PAYMENT_STATUS_LABELS[tx.paymentStatus]})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal: Edit / Add Clinical Diagnosis for a Specific Visit */}
      {editingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                تدوين أو تعديل التشخيص الطبي — {editingTx.patientName}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTx(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDiagnosis} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div className="font-semibold text-slate-900">
                  {SERVICE_TYPE_LABELS[editingTx.type]}: {editingTx.title}
                </div>
                <div className="font-mono tabular-nums text-slate-500">
                  التاريخ: {editingTx.date} · الوقت: {editingTx.time} · الفاتورة: {editingTx.invoiceNumber}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  التشخيص الطبي / التوصيات العلاجية / تفاصيل العملية الجراحية
                </label>
                <textarea
                  rows={5}
                  maxLength={2000}
                  value={diagnosisInput}
                  onChange={(e) => setDiagnosisInput(e.target.value)}
                  placeholder="اكتب التشخيص الطبي الكامل، الأدوية الموصوفة، أو تقرير العملية الجراحية..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  حالة الزيارة
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as VisitStatus)}
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
                  onClick={() => setEditingTx(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSavingDiagnosis}
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  {isSavingDiagnosis ? 'جاري الحفظ...' : 'حفظ التشخيص في السجل المرضي'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
