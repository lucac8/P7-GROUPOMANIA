import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const Delete = ({ id }) => {

    const postSupp = () => {
        if (!window.confirm(`Voulez-vous supprimez le post ?`)) return;
        axios.delete(`http://localhost:5000/api/post/${id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => { console.log(res); location.reload() }))
    }

    return (
        <div className="icon" onClick={postSupp}>
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="tooltip">Delete</span>
        </div>
    );
};

export default Delete;