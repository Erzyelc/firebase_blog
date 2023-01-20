import React from 'react'
import { db } from '../../Config/FirebaseConfig'
import {getDocs, collection, query, orderBy, limit} from 'firebase/firestore'
import './Banner.css'

function Banner() {

    //create state to hold the article data
    const [mainArticle, setMainArticle] = React.useState('')
    const [otherArticles, setOtherArticles] = React.useState([])

    //get data from articles collection to display when this component loads
    React.useEffect(
        () => {
            //create a reference to articles collection
            const articleRef = collection(db, 'articles')

            //get documents from this collection
            getDocs(articleRef)
            .then(res => {
                //console.log(res.docs[0].data())
                //get data and store in an array
                const articles = res.docs.map(item =>(
                    {id: item.id,
                    ...item.data()}
                ))
                //store the first one in main article
                setMainArticle(articles[0])
                //put the rest in otherArticles
                setOtherArticles(articles.splice(1))
            })
            .catch(err => console.log(err))

        }, []
    )
  return (
    <div className="banner-container">
        <div className="main-article-container"
            style={{backgroundImage: `url(${mainArticle?.imageUrl})`}}>
            <div className="banner-info">
                <h2>{mainArticle?.title}</h2>
                <div className="main-article-info">
                    <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
                </div>
            </div>
        </div>
        <div className="other-articles-container">
            {
                otherArticles.map(item => (
                    <div className="other-article-item"
                        style={{backgroundImage: `url(${item?.imageUrl})`}}>
                        <div className="banner-info">
                            <h3>{item?.title}</h3>
                            <small>{item?.createdAt?.toDate().toDateString()}</small>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Banner