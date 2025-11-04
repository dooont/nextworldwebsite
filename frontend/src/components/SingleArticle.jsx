export default function SingleArticle({article}){
    return (
        <article key={article.title} className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col">
          <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{article.source} • {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
          }).format(new Date(article.date.split('T')[0]))}</p>
          <p className="flex-1 oswald-400 mb-4">{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-blue-400 hover:underline">
              Read More
            </a>
        </article>
    )
}