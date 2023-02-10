import React from 'react'
import './ArticleCard.css'
import {Link} from 'react-router-dom'

function ArticleCard(article) {
    //show article data
  return (
    <div className="article-card">
        <img src={article?.imageUrl} />
        <div className="article-card-info">
            <p>{article?.title}</p>
            <Link to={`/article/${article.id}`}>Read</Link>
        </div>
    </div>
  )
}

export default ArticleCard