import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Delete from '../components/Posts/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import DeleteComment from '../components/Posts/DeleteComment';
import Header from '../components/Header';

const Comment = () => {

    const { id } = useParams();
    const [data, setData] = useState([])
    const [role, setRole] = useState()
    const [content, setContent] = useState("")
    const [alert, setAlert] = useState(0)

    //Recup info mis ds le lien
    const location = useLocation();
    const post = location.state;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/comment/${id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => {
            setData(res.data.comment)
            setRole(res.data.Admin)
        }))
    }, [alert])

    const createComment = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/comment/${id}`, { content }, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }
        ).then((res => {
            console.log(res);
            setContent("");
            setAlert(alert + 1)
        }))
    }

    //Revenir page
    let navigate = useNavigate();
    function handleClick() {
        navigate(-1)
    }


    //Affichage delete 
    const compoDelete = () => {
        if (localStorage.getItem('user') == post.User.idUser || role == 1) {
            return <Delete id={post.idPost} />
        }
    }
    const commentDelete = (Comment) => {
        if (localStorage.getItem('user') == Comment.User.idUser || role == 1) {
            return <DeleteComment id={Comment.idComment} />
        }
    }

    return (
        <div className='post-page'>
            <Header />
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} className='arrow' />
            <div className='center'>
                <div className='post'>
                    <div className='post-card'>
                        <span>Poster par : {post.User.username}</span>
                        <h4> {post.title} </h4>
                        <p> {post.content} </p>
                        <img src={post.imageUrl} alt="" />
                        <div className="wrapper">
                            {compoDelete()}
                        </div>
                    </div>
                </div>
                <form action="" onSubmit={createComment} id="createComment">
                    <input type="text" name="content" id="content" required={true} placeholder='Message' onChange={(e) => setContent(e.target.value)} value={content} />
                    <br />
                    <input type="submit" value="Commenter" className='button' />
                </form>
                <ul className='post'>
                    {
                        data.map((Comment => (
                            <li key={Comment.idComment} className='post-card'>
                                <span>Commenter par : {Comment.User.username}</span>
                                <p>{Comment.content}</p>
                                <div className="wrapper">
                                    {commentDelete(Comment)}
                                </div>
                            </li>
                        )))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Comment;