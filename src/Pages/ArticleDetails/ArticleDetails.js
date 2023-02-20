import React from 'react'
import './ArticleDetails.css'
import {useParams} from 'react-router-dom'
import { db } from '../../Config/FirebaseConfig'
import {getDoc, doc} from 'firebase/firestore'
import Likes from '../../Components/Likes/Likes'

function ArticleDetails() {
    //need to know article id
    const {articleId} = useParams();

    //create state for article info
    const [article, setArticle] = React.useState('')
    
    React.useEffect(
        ()=>{
            //create a reference to a specific doc
            const docRef = doc(db, 'articles', articleId)
            //now get the data
            getDoc(docRef)
            .then(res => {
                //console.log(res.data())
                //store data in state
                setArticle(res.data())
            })
            .catch(err => console.log(err))
        }, []
    )

  return (
    <div className="details-container">
        <h1>{article?.title}</h1>
        <h2>{article?.summary}</h2>
        <div className="details-info-container">
          <p>Category: {article?.category}</p>
            <p><span className="article-span">Author:</span>{article?.createdBy?.toUpperCase()}</p>
            <p><span className="article-span published">Published:</span> {article?.createdAt?.toDate().toDateString()}</p>
            <Likes articleId={articleId}/>
            
        </div>
        <div className="details-content">
            <img className="details-img" src={article?.imageUrl} />
            <p className="article-description">{article?.paragraphOne}</p>
            <p className="article-description">{article?.paragraphTwo}</p>
            <p className="article-description">{article?.paragraphThree}</p>   
        </div>
    </div>
  )
}

export default ArticleDetails