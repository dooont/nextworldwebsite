export default function AdminSection({children}){
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {children}
    </div>
  )
}