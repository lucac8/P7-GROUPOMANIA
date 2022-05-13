import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const Create = ({ alert, setAlert }) => {

    const [file, setFile] = useState({})
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const createPost = (e) => {

        let formdata = new FormData()

        formdata.append("title", title);
        formdata.append("content", content);
        formdata.append("image", file);

        console.log(formdata.get('image'));
        e.preventDefault();

        axios.post("http://localhost:5000/api/post", formdata, {
            headers: {
                "Content-Type": "multipart/form-data", "Authorization": "Bearer " + localStorage.getItem('token'),
            },
        })
            .then((res) => {
                console.log(res.data);
                setAlert(alert + 1)
                setFile({}), setTitle(""), setContent("")
                var preview = document.getElementById("preview");
                preview.style.display = "none";
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const preview = (e) => {
        console.log(e.target.files[0])
        if (e.target.files.length > 0) {
            let src = URL.createObjectURL(e.target.files[0]);
            let preview = document.getElementById("preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }

    return (
        <form action="" onSubmit={createPost} id="createPost">
            <input type="text" id="title" name="title" required={true} placeholder='Titre' onChange={(e) => setTitle(e.target.value)} value={title} />
            <br />
            <input type="text" name="content" id="content" required={true} placeholder='Message' onChange={(e) => setContent(e.target.value)} value={content} />
            <br />
            <label htmlFor="image"><FontAwesomeIcon icon={faImages} /> Choisir une image</label>
            <input type="file" name='image' id='image' accept="image/png, image/jpeg" onChange={(e) => { setFile(e.target.files[0]); preview(e) }} />
            <img id='preview' ></img>
            <br />
            <input type="submit" value="Poster" className='button' />
        </form>
    );
};

export default Create;