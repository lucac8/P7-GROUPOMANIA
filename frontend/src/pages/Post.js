import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Create from '../components/Posts/Create';
import { Link } from 'react-router-dom';
import Delete from '../components/Posts/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';



const Post = () => {

    const [data, setData] = useState([])
    const [role, setRole] = useState()
    const [alert, setAlert] = useState(0)

    //Si pas connecter 
    if (localStorage.getItem('token') == null) {
        window.location = 'http://localhost:3000'
    }

    //Deco
    const deco = () => {
        localStorage.clear()
        window.location = 'http://localhost:3000'
    }

    //ADMIN
    const compoDelete = (post) => {
        if (localStorage.getItem('user') == post.User.idUser || role == 1) {
            return <Delete id={post.idPost} />
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/post', { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => {
            setData(res.data.posts);
            setRole(res.data.Admin)
        }))
    }, [alert])

    return (
        <div className='post-page'>
            <Header />
            <div className='center'>
                <div className="account">
                    <Link to={`/profil/${localStorage.getItem('user')}`} className='link'>Profil</Link>
                    <span className='deco' onClick={deco}>Déconnexion</span>
                </div>
                <h3>Créer un post:</h3>
                <Create alert={alert} setAlert={setAlert} />
                <h3>Fil d'actualité:</h3>
                <ul className='post'>
                    {
                        data.map((post => (
                            <li id={post.idPost} className="post-card" key={post.idPost}>
                                <span>Poster par : {post.User.username}</span>
                                <h4> {post.title} </h4>
                                <p> {post.content} </p>
                                <img src={post.imageUrl} alt={post.imageUrl} />
                                <div className="wrapper">
                                    {compoDelete(post)}
                                    <Link to={`/post/${post.idPost}`} state={post}> <div className='icon'> <FontAwesomeIcon icon={faComment} /> <span className="tooltip">Comment</span> </div> </Link>
                                </div>
                            </li>
                        )))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Post;