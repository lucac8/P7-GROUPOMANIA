import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const DeleteComment = ({ id }) => {

    const CommentSupp = () => {
        axios.delete(`http://localhost:5000/api/comment/${id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then((res => {
            console.log(res); location.reload()
        }))
    }

    return (
        <div className="icon" onClick={CommentSupp}>
            <FontAwesomeIcon icon={faTrashCan} />
            <span className="tooltip">Delete</span>
        </div>
    );
};

export default DeleteComment;