import React from 'react';
import { Printer, X, CheckCircle2 } from 'lucide-react';
import {
  ClinicSettings,
  Transaction,
  formatSAR,
  SERVICE_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '../types';

interface InvoiceModalProps {
  transaction: Transaction | null;
  settings: ClinicSettings;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  transaction,
  settings,
  onClose,
}) => {
  if (!transaction) return null;

  const remaining = Math.max(0, transaction.amount - transaction.paidAmount);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-lg overflow-hidden">
        {/* Top Action Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 no-print">
          <div className="text-sm font-semibold text-slate-900">
            إيصال سداد وفاتورة خدمات طبية
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الإيصال</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-md transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Content */}
        <div className="p-8 space-y-6 text-slate-900">
          {/* Clinic Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                {settings.clinicName}
              </h2>
              <p className="text-sm text-slate-600">
                {settings.doctorName} · {settings.specialty}
              </p>
              <p className="text-xs text-slate-500">
                {settings.city} — {settings.address}
              </p>
              {settings.taxNumber && (
                <p className="text-xs text-slate-500 font-mono tabular-nums">
                  الرقم الضريبي / الترخيص: {settings.taxNumber}
                </p>
              )}
            </div>
            <div className="text-left space-y-1">
              <div className="text-xs text-slate-500">رقم الفاتورة</div>
              <div className="text-base font-bold font-mono tabular-nums text-teal-800">
                {transaction.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 font-mono tabular-nums">
                {transaction.date} · {transaction.time}
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-sm">
            <div>
              <span className="text-xs text-slate-500 block mb-1">اسم المريض / العميل</span>
              <span className="font-semibold text-slate-900">{transaction.patientName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-1">رقم الملف والجوال</span>
              <span className="font-mono tabular-nums text-slate-800">
                {transaction.patientFileNumber} · {transaction.patientPhone}
              </span>
            </div>
          </div>

          {/* Service Breakdown Table */}
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="py-2.5 text-right font-medium">نوع الخدمة</th>
                  <th className="py-2.5 text-right font-medium">البيان / الإجراء الطبي</th>
                  <th className="py-2.5 text-left font-medium">القيمة (ر.س)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 text-slate-700">
                    {SERVICE_TYPE_LABELS[transaction.type]}
                  </td>
                  <td className="py-3.5 font-medium text-slate-900">
                    {transaction.title}
                  </td>
                  <td className="py-3.5 text-left font-mono tabular-nums font-semibold text-slate-900">
                    {formatSAR(transaction.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">إجمالي قيمة الخدمة</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                {formatSAR(transaction.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                المبلغ المدفوع ({PAYMENT_METHOD_LABELS[transaction.paymentMethod]})
              </span>
              <span className="font-mono tabular-nums font-bold text-teal-700">
                {formatSAR(transaction.paidAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-medium text-slate-800">المبلغ المتبقي</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                {formatSAR(remaining)}
              </span>
            </div>
          </div>

          {/* Footer Confirmation */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-teal-800 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>حالة السداد: {PAYMENT_STATUS_LABELS[transaction.paymentStatus]}</span>
            </div>
            <div>هاتف العيادة: <span className="font-mono tabular-nums">{settings.phone}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
