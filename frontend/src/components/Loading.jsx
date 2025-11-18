export default function Loading({size,item}){ //item is whatever is loading
  return(
    <div className="text-center py-12">
      <p className={`text-gray-400 oswald-400 text-${size}`}>Loading {item}...</p>
    </div>
  )
}