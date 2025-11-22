export default function Loading({size,item}){ //item is whatever is loading
  return(
      <p className={`text-gray-400 oswald-400 text-${size}`}>Loading {item}...</p>
  )
}