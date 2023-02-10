import React from 'react'
import './AddArticle.css'
import { db, auth, storage } from '../../Config/FirebaseConfig'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function AddArticle() {
    const [user] = useAuthState(auth)
    let navigate = useNavigate()

    const categories = ["Health", "Food", "Travel", "Technology"]

    //create state to hold form data in a single object
    const [formData, setFormData] = React.useState({
        title: '',
        summary: '',
        paragraphOne: '',
        paragraphTwo: '',
        paragraphThree: '',
        category: '',
        image: ''

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData)
        //create a reference for the image
        const imageRef = ref(storage, `images/${formData.image.name + v4()}`)
        //upload image to storage bucket
        uploadBytes(imageRef, formData.image)
        .then(res => {
            console.log(res.ref)
            //now get url from this ref
            getDownloadURL(res.ref)
            .then(url => {
                //create a reference to articles collection
                const articleRef = collection(db, 'articles')
                //add the new document
                addDoc(articleRef, {
                    title: formData.title,
                    summary: formData.summary,
                    paragraphOne: formData.paragraphOne,
                    paragraphTwo: formData.paragraphTwo,
                    paragraphThree: formData.paragraphThree,
                    category: formData.category,
                    imageUrl: url,
                    createdBy: user.displayName,
                    userId: user.uid,
                    createdAt: Timestamp.now().toDate()
                })
            })
            .then(res => {
                //alert('article saved')
                toast('Article Saved!', {
                    type: "success",
                    autoClose: 1500
                })
                //delay navigate to home
                setTimeout(() => {
                    navigate('/')
                }, 2000)          
            })
        })
        .catch(err => {
            //console.log(err))
            toast("Could not save", {
                type: "error"})
        })
    }

  return (
    <div className="add-article-container">
        <form className="add-article-form"  onSubmit={handleSubmit}>
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text"  id="title"
                onChange={(e) => setFormData(
                    {...formData, title: e.target.value}
                )}
                placeholder="Maximum 100 characters"
                maxLength="100"
                />
            </div> 
            <div className="input-group">        
                <label htmlFor="summary">Summary</label>
                <textarea id="summary"
                onChange={(e) => setFormData(
                    {...formData, summary: e.target.value}
                )}
                placeholder="Maximum 120 characters"
                maxLength="120"
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea name="paragraphOne" 
                onChange={(e) => setFormData(
                    {...formData, paragraphOne: e.target.value}
                )}
                placeholder="Maximum 650 characters"
                maxLength="650"
                
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea id="paragraphTwo"
                onChange={(e) => setFormData(
                    {...formData, paragraphTwo: e.target.value}
                )}
                placeholder="Maximum 650 characters"
                maxLength="650"
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea id="paragraphThree" 
                onChange={(e) => setFormData(
                    {...formData, paragraphThree: e.target.value}
                )}
                placeholder="Maximum 650 characters"
                maxLength="650"
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category"
                onChange={(e) => setFormData(
                    {...formData, category: e.target.value}
                )}>
                    <option value="">Select</option>
                    {
                        categories.map(item => 
                        <option key={item} 
                            value={item}>{item}</option>)
                    }
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*"
                onChange={(e) => setFormData(
                    {...formData, image: e.target.files[0]}
                )}
                
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddArticle