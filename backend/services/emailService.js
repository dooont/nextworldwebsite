import nodemailer from 'nodemailer';
import EmailError from '../errors/EmailError.js';

function createTransporter(){
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
}

export async function sendPasswordResetRequestEmail(toEmail, resetUrl){
  const transporter = createTransporter();

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

export async function sendInquiryEmail(firstName, lastName, userEmail, inquiryBody){
  const transporter = createTransporter();

  const mailOptions = {
    from: `Next World Collective <${process.env.FROM_EMAIL}>`,
    to: process.env.FROM_EMAIL,
    subject: "New NextWorld Inquiry",
    html: /* html */`
      <h3>You have recieved a new inqury from: </h3>
      <p>${firstName} ${lastName}</p>
      <p>${userEmail}</p>
      <h3>Message: </h3>
      <p>${inquiryBody}</p>
    `
  };

  try{
    await transporter.sendMail(mailOptions);
  }catch(err){
    throw new EmailError('Could not send inquiry email', 500);
  }
}