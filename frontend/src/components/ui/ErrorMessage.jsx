export default function ErrorMessage({className, children}){
  return <div className={`text-red-700 oswald-400 ${className}`}>{children}</div>
}