export default function ItemCard({ article }) {
  return (
    <div className="bg-black border border-purple-900 rounded-lg p-5 hover:border-purple-700 transition">
      <h3 className="text-xl font-semibold text-white mb-2 oswald-700">
        {article.title}
      </h3>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 oswald-400 text-sm break-all transition"
      >
        {article.link}
      </a>
    </div>
  );
}