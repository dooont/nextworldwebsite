export default function Anchor({ children, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 oswald-400 text-sm break-all transition mr-4">
      {children}
    </a>
  )
}