import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InfoMessage from "../ui/InfoMessage.jsx";

export default function AdminValidator({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/admin");
    }
  });

  if(isAuthenticated){
    return children;
  }

  return <InfoMessage className="h-screen">Loading...</InfoMessage>

}
