import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios.js";

export default function DeleteButton({onClick}){
  function handleClick(){
    onClick();
  }
  return <button onClick={handleClick} className="bg-red-500 oswald-400 rounded-sm px-3 hover:bg-red-400 transition">Delete</button>
}