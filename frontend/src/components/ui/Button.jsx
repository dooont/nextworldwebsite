export default function Button({children, ...props}){
  return (
    <button
      className="w-full py-3 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold oswald-700 text-lg transition transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-[1] disabled:bg-gray-800 shadow-lg shadow-purple-900/50"
      {...props}
    >
      {children}
    </button>
  )
}