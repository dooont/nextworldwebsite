export default function Input({label, type = 'text', ...props}) {
  return (
    <div>
      <label
        htmlFor="title"
        className="block text-white oswald-400 text-sm font-semibold mb-2"
      >
        {label}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
          {...props}
        />
      ) : (
        <input
          type={type}
          className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
          {...props}
        />
      )}
    </div>
  )
}