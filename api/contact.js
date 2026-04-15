const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, message, phone } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const name = `${firstName} ${lastName || ''}`.trim();

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
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone || 'N/A'}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await contactEmail.sendMail(mail);
    res.status(200).json({ code: 200, status: "Message Sent" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};
