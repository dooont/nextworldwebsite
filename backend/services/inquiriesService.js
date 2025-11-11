import nodemailer from 'nodemailer';
import { AppError } from "../errors/AppError.js";

export async function submitInquiry(firstName, lastName, userEmail, inquiryBody){
  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `Next World Collective <${process.env.FROM_EMAIL}>`,
      to: 'elton.salanic@gmail.com',
      subject: "New NextWorld Inquiry",
      html: /* html */`
        <h3>You have recieved a new inqury from: </h3>
        <p>${firstName} ${lastName}</p>
        <p>${userEmail}</p>
        <h3>Message: </h3>
        <p>${inquiryBody}</p>
      `
    };

    await transporter.sendMail(mailOptions);
  }catch(err){
    throw new AppError('Could not send inquiry email', 500);
  }
}