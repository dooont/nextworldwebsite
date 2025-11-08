import { authenticateUser } from "../services/adminService.js";

export async function login(req, res){
  const {email, password} = req.body;

  if(await authenticateUser(email, password)){
    req.session.user = {email: email};
    return res.status(200).send();
  }else{
    return res.status(401).send();
  }
}