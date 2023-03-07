import React from 'react'
import './Comments.css'
import {auth} from '../../Config/FirebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { db } from '../../Config/FirebaseConfig'
import {getDocs, collection, query, addDoc, where, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import {toast} from 'react-toastify'



function Comments({articleId}) {

    const [user] = useAuthState(auth);

    const [newComment, setNewComment] = React.useState('');

    const [comments, setComments] = React.useState([])

    React.useEffect(
        ()=> {
            const commentsRef = collection(db, "comments")

            /*
            getDocs(commentsRef)
            .then(res => {
                const comments = res.docs.map
                (item => (
                    {id: item.id,
                    ...item.data()}
                ))
                console.log(comments)
                setComments(comments)
            })
            .catch(err => console.log(err))
            */

            const q = query(commentsRef,
                where("articleId","==", articleId
            ))

            onSnapshot( q, snapshot => {
                const comments = snapshot.docs.map
                (item => (
                    {id: item.id,
                    ...item.data()}
                ))
                console.log(comments)
                setComments(comments)
            })

        }, []
    )

    const addNewComment = (e) => {
        e.preventDefault()
        //console.log(newComment)
        //need to add a doc to comments collection
        const commentsRef = collection(db, "comments")
        //add doc with articleid, userid, text, and username
        addDoc(commentsRef, {
            userId: user?.uid,
            articleId: articleId,
            content: newComment,
            username: user?.displayName
        })
        .then( res => {
            toast('Comment Added', {
                type: "success",
                autoClose: 1500
            })
            setNewComment('')
        })
        .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        //console.log(id)
        deleteDoc(doc(db, "comments", id))
        .then( res => {
            //alert('comment deleted')
            toast('Comment Deleted', {
                type: "success",
                autoClose: 1500
            })
        })
        .catch(err => console.log(err))
    }


  return (
    <div>
        <div className="comments-container">
            {
                comments.map(item => 
                <div key={item.id} className="comment">
                    <p><span>{item.username}</span>
                    {item.content}</p>
                    {
                        user?.uid === item.userId?
                        <button onClick={() =>deleteComment(item.id)}>Delete</button>
                        :
                        null
                    }
                </div>
                )
            }
        </div>
        {
        user?
        <form onSubmit={addNewComment}>
            <input type="text"
            placeholder="add comment"
            onChange={(e) =>setNewComment(e.target.value)}
            value={newComment}
            />
            <button type="submit">Add Comment</button>
        </form>
        :
        <p>Please login to comment</p>
        }
    </div>
  )
}

export default Comments