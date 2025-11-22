export default function Form({title, onSubmit, children}){
  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-200 flex-1">
      <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
        {title}
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {children}
      </form>
    </div>
  )
}