import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header';


const Profil = () => {

    const { id } = useParams();
    const [data, setData] = useState([])
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [alert, setAlert] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => {
            setBio(res.data.bio), setUsername(res.data.username), setData(res.data)
        }))
    }, [alert])

    const updateProfil = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/user/${id}`, { username, bio, idUser: Number(localStorage.getItem('user')) },
            { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }
        ).then((res => { console.log(res), setAlert(alert + 1) }))
    }

    const deleteProfil = () => {
        if (!window.confirm(`Voulez-vous supprimez le compte ?`)) return;
        axios.delete(`http://localhost:5000/api/user/${id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => {
            window.location = 'http://localhost:3000'
            localStorage.clear()
        }))
    }

    return (
        <div className='post-page'>
            <Header />
            <Link to={"/post"} className='arrow'><FontAwesomeIcon icon={faArrowLeft} /></Link>
            <div className='center'>
                <div className='profil-button'>
                    <span onClick={deleteProfil} >Supprimez le compte </span>
                </div>
                <h3>Email : {data.email}</h3>
                <form action="" onSubmit={updateProfil} id="updateProfil">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required onChange={(e) => setUsername(e.target.value)} value={username} />
                    <br />
                    <label htmlFor="bio">Bio</label>
                    <input type="text" name='bio' id='bio' required onChange={(e) => setBio(e.target.value)} value={bio} />
                    <br />
                    <input type="submit" value="Update" className='button' />
                </form>
            </div>
        </div>

    );
};

export default Profil;