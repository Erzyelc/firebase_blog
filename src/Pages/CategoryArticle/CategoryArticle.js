import React from 'react'
import './CategoryArticle.css'
import {useParams} from 'react-router-dom'
import { db } from '../../Config/FirebaseConfig'
import {getDocs, collection, query, where} from 'firebase/firestore'
import ArticleCard from '../../Components/ArticleCard/ArticleCard'

function CategoryArticle() {

    //get category from url
    const {categoryName} = useParams();

    //create state to store articles
    const [articles, setArticles] = React.useState([])

    React.useEffect(
        () => {
            const articleRef = collection(db, 'articles')

            //set up query to filter the data by category
            const q = query(articleRef,
                where("category", "==", categoryName))

            //get documents from this collection
            //getDocs(articleRef)
            //to use the query
            getDocs(q, articleRef)
            .then(res => {
                //console.log(res.docs[0].data())
                //get data and store in an array
                const articles = res.docs.map(item =>(
                    {id: item.id,
                    ...item.data()}
                ))
                setArticles(articles)
            })
            .catch(err => console.log(err))
        }, [categoryName]
    )
  return (
    <div className="category-articles">
        {
            articles.length === 0?
            <p>No {categoryName} articles</p>
            :
            articles.map(item => <ArticleCard article={item}/>)
        }
    </div>
  )
}

export default CategoryArticle