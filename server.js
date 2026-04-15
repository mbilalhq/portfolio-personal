const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Error configuring email server. Check credentials.", error);
  } else {
    console.log("Ready to Send Emails");
  }
});

router.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, message, phone, meta } = req.body;
  const name = (firstName || '') + " " + (lastName || '');

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
          <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${name.trim()}</td>
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
          <td style="padding:6px 0;color:#a8a8c0;">${meta?.timezone || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Locale</td>
          <td style="padding:6px 0;color:#a8a8c0;">${meta?.locale || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Device</td>
          <td style="padding:6px 0;color:#a8a8c0;">${deviceType} · ${meta?.platform || 'Unknown'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Screen</td>
          <td style="padding:6px 0;color:#a8a8c0;">${meta?.screen || '?'} (viewport ${meta?.viewport || '?'})</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Touch Device</td>
          <td style="padding:6px 0;color:#a8a8c0;">${meta?.touchDevice ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Browser</td>
          <td style="padding:6px 0;color:#a8a8c0;">${browser}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Referrer</td>
          <td style="padding:6px 0;color:#a8a8c0;">${meta?.referrer || 'Direct'}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#606080;">Page URL</td>
          <td style="padding:6px 0;color:#a8a8c0;word-break:break-all;">${meta?.page || 'Unknown'}</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#08080e;padding:14px 28px;text-align:center;">
      <p style="margin:0;font-size:10px;color:#404060;letter-spacing:0.1em;">PORTFOLIO CONTACT FORM · mbilalhq.tech</p>
    </div>
  </div>`;

  const mail = {
    from: name,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `🔔 New Lead: ${name.trim()} — Portfolio Contact`,
    html: mailHtml,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send message." });
    } else {
      res.status(200).json({ code: 200, status: "Message Sent" });
    }
  });
});

app.use("/", router);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
