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

export function logout(req, res){
  if(req.session.user){
    req.session.destroy((err) => {
      if (err) { //error while destroying session
        throw Error("Session not destroyed");
      } else {
        res.clearCookie('connect.sid');
        return res.status(200).send();
      }
    });
  }else{
    console.log("user not found");
    return res.status(404).send();
  }
}