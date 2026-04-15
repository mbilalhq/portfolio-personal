const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, message, phone, meta } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const name = `${firstName} ${lastName || ''}`.trim();

  // Parse device type from user agent
  const ua = (meta && meta.userAgent) || '';
  let deviceType = 'Desktop';
  if (/mobile/i.test(ua)) deviceType = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

  // Parse browser name
  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';

  // Format timestamp
  const ts = meta && meta.timestamp ? new Date(meta.timestamp) : new Date();
  const formattedDate = ts.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });

  const mailHtml = `
  <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d14;color:#e0e0e0;border-radius:12px;overflow:hidden;border:1px solid #1a1a2e;">
    <!-- Header -->
    <div style="background:linear-gradient(90deg,#7fff6e,#6edaff);padding:20px 28px;">
      <h1 style="margin:0;font-size:20px;color:#0a0a0f;font-weight:800;letter-spacing:-0.02em;">📬 New Portfolio Lead</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#0a0a0f;opacity:0.7;">${formattedDate}</p>
    </div>

    <!-- Contact Info -->
    <div style="padding:24px 28px;border-bottom:1px solid #1a1a2e;">
      <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#7fff6e;margin:0 0 14px;font-weight:600;">Contact Information</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#808090;font-size:13px;width:100px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#808090;font-size:13px;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#6edaff;text-decoration:none;font-size:14px;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#808090;font-size:13px;vertical-align:top;">Phone</td>
          <td style="padding:8px 0;color:#fff;font-size:14px;">${phone || 'Not provided'}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="padding:24px 28px;border-bottom:1px solid #1a1a2e;">
      <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#6edaff;margin:0 0 14px;font-weight:600;">Message</h2>
      <div style="background:#111120;border:1px solid #222238;border-radius:10px;padding:16px 18px;font-size:14px;line-height:1.7;color:#c8c8e0;white-space:pre-wrap;">${message}</div>
    </div>

    <!-- Lead Intelligence -->
    <div style="padding:24px 28px;">
      <h2 style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#ff6eb4;margin:0 0 14px;font-weight:600;">🔍 Lead Intelligence</h2>
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <tr>
          <td style="padding:6px 0;color:#606080;width:120px;">Timezone</td>
          <td style="padding:6px 0;color:#a8a8c0;">${(meta && meta.timezone) || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Locale</td>
          <td style="padding:6px 0;color:#a8a8c0;">${(meta && meta.locale) || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Device</td>
          <td style="padding:6px 0;color:#a8a8c0;">${deviceType} · ${(meta && meta.platform) || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Screen</td>
          <td style="padding:6px 0;color:#a8a8c0;">${(meta && meta.screen) || '?'} (viewport ${(meta && meta.viewport) || '?'})</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Touch Device</td>
          <td style="padding:6px 0;color:#a8a8c0;">${meta && meta.touchDevice ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Browser</td>
          <td style="padding:6px 0;color:#a8a8c0;">${browser}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Referrer</td>
          <td style="padding:6px 0;color:#a8a8c0;">${(meta && meta.referrer) || 'Direct'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Page URL</td>
          <td style="padding:6px 0;color:#a8a8c0;word-break:break-all;">${(meta && meta.page) || 'Unknown'}</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#08080e;padding:14px 28px;text-align:center;">
      <p style="margin:0;font-size:10px;color:#404060;letter-spacing:0.1em;">PORTFOLIO CONTACT FORM · mbilalhq.tech</p>
    </div>
  </div>`;

  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await contactEmail.verify();
  } catch (error) {
    console.error("Email server verification failed:", error);
    return res.status(500).json({ message: "Email server not ready. Please try again later." });
  }

  const mail = {
    from: name,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `🔔 New Lead: ${name} — Portfolio Contact`,
    html: mailHtml,
  };

  try {
    await contactEmail.sendMail(mail);
    res.status(200).json({ code: 200, status: "Message Sent" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};
