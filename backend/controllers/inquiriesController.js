import { submitInquiry } from "../services/inquiriesService.js";

export async function newInquiry(req, res){
  const {firstName, lastName, userEmail, inquiryBody} = req.body;
  
  await submitInquiry(firstName, lastName, userEmail, inquiryBody);
  res.status(200).send();
}

