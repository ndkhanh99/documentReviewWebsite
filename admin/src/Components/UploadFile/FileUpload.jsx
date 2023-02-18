import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUpload.scss';
import axios from 'axios';

const FileUpload = ({ files, setFiles, removeFile, isClicked, setIsClicked }) => {
    const [file, setNewFile] = useState([]);
    const uploadHandler = (event) => {
        setNewFile(event.target.files[0]);
        if (!file) return;
        file.isUploading = true;
        setFiles([...files, file])
    }

    // upload file
    if (isClicked === 'true') {
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        );
        setTimeout(() => {
            axios.post('http://localhost:3001/api/file/upload', formData)
                .then(
                    setIsClicked('fasle'),
                    (res) => {
                        file.isUploading = false;
                        setFiles([...files, file]);
                        console.log(res.data);
                        console.log(res.data.result);
                    })
                .catch((err) => {
                    // inform the user
                    console.error(err)
                    removeFile(file.name)
                });
        }, 1000);
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <button>
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>
        </>
    )
}

export default FileUpload