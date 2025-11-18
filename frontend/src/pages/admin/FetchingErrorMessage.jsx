export default function FetchingErrorMessage({message, className}){
  return (
    <div className="text-center">
      <p className={`text-gray-400 oswald-400 ${className}`}>{message}</p>
    </div> 
  )
}