export default function InfoMessage({ className, children }){
  return (
    <div className="text-center">
      <p className={`text-gray-400 oswald-400 ${className}`}>{children}</p>
    </div> 
  )
}