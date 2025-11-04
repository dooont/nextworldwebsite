import SingleArticle from "./SingleArticle";


export default function Articles({articles}){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <SingleArticle article={article}/>
          ))}
        </div>
    )
}