import { sendInquiryEmail } from "./emailService.js";

export async function submitInquiry(firstName, lastName, userEmail, inquiryBody){
  await sendInquiryEmail(firstName, lastName, userEmail, inquiryBody);
}