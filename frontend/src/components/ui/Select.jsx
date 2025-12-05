//options is an array of { value: '', label: '' }. Value determines what value it returns. Label is what is displayed
export default function Select({ label, options = [], ...props }) {
  return (
    <div>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-white oswald-400 text-sm font-semibold mb-2"
        >
          {label}
        </label>
      )}
      <select
        className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(147 51 234)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}
