import React from 'react'
import './Likes.css'
import {auth} from '../../Config/FirebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { db } from '../../Config/FirebaseConfig'
import {getDocs, collection, query, addDoc, where, deleteDoc, doc} from 'firebase/firestore'
import {FaHeart, FaRegHeart} from 'react-icons/fa'

function Likes(articleId) {

    //get user info
    const [user] = useAuthState(auth);

   //create state for whether this article has been liked by the user 
    const [isLiked, setIsLiked] = React.useState(false)

    const handleLike = () => {
        //make sure a user is logged in
        if (user){
            //create a reference to likes collection(created by this)
            const likesRef = collection(db, 'likes')
            //add a doc with articleId and userId
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId
            })
            .then( res => {
                setIsLiked(true)
            })
            .catch(err => console.log(err))
        }
    }

    const handleUnlike = () =>{
        //console.log('unlike')
        if (user){
            //find document with this articleId and userId
            const likesRef = collection(db, "likes")
            //set up query to find this record
            const q = query(likesRef, 
                where("articleId", "==", articleId),
                where("userId", "==", user?.uid)
            )

            //look for match
            getDocs(q, likesRef)
            .then(res => {
                console.log(res.size)
                console.log(res.docs[0].id)
                const likeId = res.docs[0].id
                //now delete this doc from collection
                deleteDoc(doc(db, "likes", likeId))
                .then(res=>{
                    //change the icon
                    setIsLiked(false)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        }
    }

  return (
    <div>
        {
            isLiked?
            <div className="like-icon" onClick={handleUnlike}>
                <FaHeart />
            </div>
            :
            <div className="like-icon" onClick={handleLike}>
                <FaRegHeart />
            </div>
        }
    </div>
  )
}

export default Likes