import nodemailer from 'nodemailer';
import EmailError from '../errors/EmailError.js';

export async function sendPasswordResetRequestEmail(toEmail, resetUrl){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `nxtworldcollective <${process.env.FROM_EMAIL}>`,
    to: toEmail,
    subject: "Reset Your Admin Password",
    html: /*html*/`
      <h1> Password Reset Request</h1>
      <p>
        <a href="${resetUrl}"> Click this link to reset your password </a>
      </p>
      <br/>
      <p>Also, hi from developers: Matt and Elton :P</p>
    `
  };

  try{
    await transporter.sendMail(mailOptions);
  }catch(err){
    throw new EmailError('Could not send reset email', 500);
  }
}