import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  UserPlus,
  Search,
  Edit3,
  Eye,
  X,
} from 'lucide-react';
import {
  Patient,
  Transaction,
  SERVICE_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  formatSAR,
  downloadExcelTable,
  getTodayISO,
} from '../types';

interface PatientsDatabaseViewProps {
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
}

export const PatientsDatabaseView: React.FC<PatientsDatabaseViewProps> = ({
  patients,
  transactions,
  onAddPatient,
  onUpdatePatient,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'has_surgery' | 'has_balance'>('all');

  // Add / Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [pFullName, setPFullName] = useState('');
  const [pPhone, setPPhone] = useState('05');
  const [pNationalId, setPNationalId] = useState('');
  const [pAge, setPAge] = useState<number>(30);
  const [pGender, setPGender] = useState<'male' | 'female'>('male');
  const [pNotes, setPNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Selected Patient History Modal
  const [inspectPatient, setInspectPatient] = useState<Patient | null>(null);

  // Enrich each patient with their complete visit & financial statistics
  const enrichedPatients = useMemo(() => {
    return patients.map((p) => {
      const pTxs = transactions.filter(
        (t) => t.patientId === p.id && t.status !== 'cancelled'
      );
      const consultations = pTxs.filter((t) => t.type === 'consultation').length;
      const followups = pTxs.filter((t) => t.type === 'followup').length;
      const surgeries = pTxs.filter((t) => t.type === 'surgery').length;
      const totalBilled = pTxs.reduce((s, t) => s + (Number(t.amount) || 0), 0);
      const totalPaid = pTxs.reduce((s, t) => s + (Number(t.paidAmount) || 0), 0);
      const remaining = Math.max(0, totalBilled - totalPaid);
      const sortedDates = pTxs.map((t) => t.date).sort((a, b) => b.localeCompare(a));
      const lastVisit = sortedDates[0] || '—';

      return {
        ...p,
        consultations,
        followups,
        surgeries,
        totalVisits: pTxs.length,
        totalBilled,
        totalPaid,
        remaining,
        lastVisit,
      };
    });
  }, [patients, transactions]);

  const filteredPatients = useMemo(() => {
    return enrichedPatients
      .filter((p) => {
        if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
        if (categoryFilter === 'has_surgery' && p.surgeries === 0) return false;
        if (categoryFilter === 'has_balance' && p.remaining <= 0) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          return (
            p.fullName.toLowerCase().includes(q) ||
            p.phone.toLowerCase().includes(q) ||
            p.fileNumber.toLowerCase().includes(q) ||
            p.nationalId.toLowerCase().includes(q) ||
            p.notes.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => a.fileNumber.localeCompare(b.fileNumber));
  }, [enrichedPatients, genderFilter, categoryFilter, searchQuery]);

  // Summary Totals
  const dbTotals = useMemo(() => {
    return {
      totalPatients: patients.length,
      surgeryPatients: enrichedPatients.filter((p) => p.surgeries > 0).length,
      totalCollected: enrichedPatients.reduce((s, p) => s + p.totalPaid, 0),
      totalRemaining: enrichedPatients.reduce((s, p) => s + p.remaining, 0),
    };
  }, [patients.length, enrichedPatients]);

  // Export Patients Database to Microsoft Excel (.xls)
  const handleExportPatientsExcel = () => {
    const headers = [
      'رقم الملف الطبي (MRN)',
      'اسم المريض الرباعي',
      'رقم الجوال السعودي',
      'رقم الهوية / الإقامة',
      'العمر',
      'الجنس',
      'عدد الكشوفات',
      'عدد المتابعات',
      'عدد العمليات الجراحية',
      'إجمالي الفواتير (ر.س)',
      'إجمالي المدفوع (ر.س)',
      'المتبقي للتحصيل (ر.س)',
      'تاريخ آخر زيارة',
      'الملاحظات الطبية',
    ];

    const rows = filteredPatients.map((p) => [
      p.fileNumber,
      p.fullName,
      p.phone,
      p.nationalId || '—',
      p.age,
      p.gender === 'female' ? 'أنثى' : 'ذكر',
      p.consultations,
      p.followups,
      p.surgeries,
      p.totalBilled,
      p.totalPaid,
      p.remaining,
      p.lastVisit,
      p.notes || '—',
    ]);

    downloadExcelTable(
      `قاعدة_بيانات_المرضى_${getTodayISO()}.xls`,
      'قاعدة بيانات المرضى',
      headers,
      rows
    );
  };

  // Export All Visits & Surgeries Ledger to Excel (.xls)
  const handleExportVisitsExcel = () => {
    const headers = [
      'رقم الفاتورة',
      'التاريخ',
      'الوقت',
      'رقم الملف الطبي',
      'اسم المريض',
      'رقم الجوال',
      'نوع الخدمة',
      'البيان / العملية الجراحية',
      'الإجمالي (ر.س)',
      'المدفوع (ر.س)',
      'المتبقي (ر.س)',
      'وسيلة الدفع',
      'ملاحظات الاستقبال',
      'التشخيص والتقرير الطبي',
    ];

    const rows = transactions.map((t) => [
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
      t.receptionNotes || '—',
      t.doctorNotes || '—',
    ]);

    downloadExcelTable(
      `سجل_الكشوفات_والعمليات_${getTodayISO()}.xls`,
      'سجل الكشوفات والعمليات',
      headers,
      rows
    );
  };

  const openNewModal = () => {
    setEditingPatient(null);
    setPFullName('');
    setPPhone('05');
    setPNationalId('');
    setPAge(30);
    setPGender('male');
    setPNotes('');
    setShowModal(true);
  };

  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setPFullName(patient.fullName);
    setPPhone(patient.phone);
    setPNationalId(patient.nationalId);
    setPAge(patient.age);
    setPGender(patient.gender);
    setPNotes(patient.notes);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pFullName.trim() || !pPhone.trim() || isSaving) return;
    setIsSaving(true);
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
      setShowModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Excel Export Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">
            قاعدة بيانات المرضى والعملاء الشاملة
          </h1>
          <p className="text-xs text-slate-500">
            سجل مركزي لجميع ملفات المرضى، إحصائيات الكشوفات والعمليات الجراحية لكل مريض، مع إمكانية التصدير المباشر كملف إكسيل (Excel Sheet)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-teal-700" />
            <span>إضافة مريض للقاعدة</span>
          </button>

          <button
            type="button"
            onClick={handleExportVisitsExcel}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-700" />
            <span>تصدير سجل الزيارات (Excel)</span>
          </button>

          <button
            type="button"
            onClick={handleExportPatientsExcel}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>تصدير قاعدة بيانات المرضى (Excel Sheet)</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="bg-white border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-200">
        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">إجمالي المرضى المسجلين</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {dbTotals.totalPatients}
          </div>
          <div className="text-xs text-slate-500 mt-1">ملف طبي نشط في قاعدة البيانات</div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">مرضى العمليات الجراحية</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {dbTotals.surgeryPatients}
          </div>
          <div className="text-xs text-slate-500 mt-1">عملاء أجروا عمليات جراحية بالعيادة</div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">إجمالي المدفوعات المحصّلة</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-700">
            {formatSAR(dbTotals.totalCollected)}
          </div>
          <div className="text-xs text-slate-500 mt-1">إجمالي ما تم تحصيله من العملاء</div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">إجمالي المستحقات المتبقية</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-700">
            {formatSAR(dbTotals.totalRemaining)}
          </div>
          <div className="text-xs text-slate-500 mt-1">ذمم مالية متبقية قيد التحصيل</div>
        </div>
      </div>

      {/* Search & Filter Controls + Database Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
              {(
                [
                  { id: 'all', label: 'جميع المرضى' },
                  { id: 'has_surgery', label: 'مرضى العمليات الجراحية' },
                  { id: 'has_balance', label: 'لديهم مبالغ متبقية' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setCategoryFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    categoryFilter === f.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as 'all' | 'male' | 'female')}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700"
            >
              <option value="all">الجنس: الكل</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم، رقم الملف، الجوال، أو الهوية..."
              className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 focus:bg-white"
            />
          </div>
        </div>

        {/* High-Density Database Table */}
        <div className="overflow-x-auto">
          {filteredPatients.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              لا توجد سجلات مرضى مطابقة لمعايير البحث الحالية.
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="py-3 px-3 text-right font-medium">رقم الملف</th>
                  <th className="py-3 px-3 text-right font-medium">اسم المريض الرباعي</th>
                  <th className="py-3 px-3 text-right font-medium">الجوال والهوية</th>
                  <th className="py-3 px-3 text-right font-medium">العمر / الجنس</th>
                  <th className="py-3 px-3 text-center font-medium">كشوفات</th>
                  <th className="py-3 px-3 text-center font-medium">متابعات</th>
                  <th className="py-3 px-3 text-center font-medium">عمليات</th>
                  <th className="py-3 px-3 text-left font-medium">المدفوع (ر.س)</th>
                  <th className="py-3 px-3 text-left font-medium">المتبقي (ر.س)</th>
                  <th className="py-3 px-3 text-left font-medium">آخر زيارة</th>
                  <th className="py-3 px-3 text-left font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono tabular-nums text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {p.fileNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{p.fullName}</div>
                      {p.notes && (
                        <div className="text-xs text-slate-500 truncate max-w-xs">{p.notes}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums text-xs text-slate-700 whitespace-nowrap">
                      <div>{p.phone}</div>
                      {p.nationalId && <div className="text-slate-400">هوية: {p.nationalId}</div>}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600 whitespace-nowrap">
                      <span className="font-mono tabular-nums">{p.age}</span> سنة ·{' '}
                      {p.gender === 'female' ? 'أنثى' : 'ذكر'}
                    </td>
                    <td className="py-3 px-3 text-center font-mono tabular-nums text-xs">
                      {p.consultations}
                    </td>
                    <td className="py-3 px-3 text-center font-mono tabular-nums text-xs">
                      {p.followups}
                    </td>
                    <td className="py-3 px-3 text-center font-mono tabular-nums text-xs font-semibold text-slate-900">
                      {p.surgeries}
                    </td>
                    <td className="py-3 px-3 text-left font-mono tabular-nums font-semibold text-teal-700 whitespace-nowrap">
                      {formatSAR(p.totalPaid)}
                    </td>
                    <td className="py-3 px-3 text-left font-mono tabular-nums text-xs whitespace-nowrap">
                      <span className={p.remaining > 0 ? 'text-amber-700 font-semibold' : 'text-slate-400'}>
                        {formatSAR(p.remaining)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-left font-mono tabular-nums text-xs text-slate-500 whitespace-nowrap">
                      {p.lastVisit}
                    </td>
                    <td className="py-3 px-3 text-left whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setInspectPatient(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>السجل</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-200 rounded transition-colors cursor-pointer"
                          title="تعديل بيانات المريض"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingPatient ? 'تعديل بيانات المريض في القاعدة' : 'إضافة مريض جديد لقاعدة البيانات'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  اسم المريض الرباعي <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pFullName}
                  onChange={(e) => setPFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    رقم الجوال السعودي <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={pPhone}
                    onChange={(e) => setPPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    رقم الهوية / الإقامة
                  </label>
                  <input
                    type="text"
                    value={pNationalId}
                    onChange={(e) => setPNationalId(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">العمر</label>
                  <input
                    type="number"
                    min={0}
                    max={150}
                    value={pAge}
                    onChange={(e) => setPAge(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">الجنس</label>
                  <select
                    value={pGender}
                    onChange={(e) => setPGender(e.target.value as 'male' | 'female')}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ملاحظات طبية (أمراض مزمنة / حساسية / تأمين)
                </label>
                <textarea
                  rows={2}
                  value={pNotes}
                  onChange={(e) => setPNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors cursor-pointer"
                >
                  {isSaving ? 'جاري الحفظ...' : 'حفظ البيانات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Full Patient File Modal */}
      {inspectPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ملف المريض: {inspectPatient.fullName}
                </h3>
                <p className="text-xs font-mono tabular-nums text-slate-500 mt-0.5">
                  {inspectPatient.fileNumber} · الجوال: {inspectPatient.phone} · الهوية: {inspectPatient.nationalId || '—'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectPatient(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {inspectPatient.notes && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">الملاحظات الطبية: </span>
                  {inspectPatient.notes}
                </div>
              )}

              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 px-2 text-right font-medium">رقم الفاتورة</th>
                    <th className="py-2.5 px-2 text-right font-medium">التاريخ</th>
                    <th className="py-2.5 px-2 text-right font-medium">الخدمة / العملية</th>
                    <th className="py-2.5 px-2 text-right font-medium">التشخيص الطبي</th>
                    <th className="py-2.5 px-2 text-left font-medium">الإجمالي</th>
                    <th className="py-2.5 px-2 text-left font-medium">المدفوع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions
                    .filter((t) => t.patientId === inspectPatient.id)
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((t) => (
                      <tr key={t.id}>
                        <td className="py-2.5 px-2 font-mono tabular-nums">{t.invoiceNumber}</td>
                        <td className="py-2.5 px-2 font-mono tabular-nums">{t.date}</td>
                        <td className="py-2.5 px-2">
                          <div className="font-semibold text-slate-900">{t.title}</div>
                          <div className="text-slate-500">{SERVICE_TYPE_LABELS[t.type]}</div>
                        </td>
                        <td className="py-2.5 px-2 text-slate-700">
                          {t.doctorNotes || t.receptionNotes || '—'}
                        </td>
                        <td className="py-2.5 px-2 text-left font-mono tabular-nums">
                          {formatSAR(t.amount)}
                        </td>
                        <td className="py-2.5 px-2 text-left font-mono tabular-nums font-semibold text-teal-700">
                          {formatSAR(t.paidAmount)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
