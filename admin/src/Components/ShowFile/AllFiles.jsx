import { React, useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileItem(file, deleteFile) {
    // fetch files from db
    let [items, setItems] = useState([]);
    useEffect(() => { getMenuItems() }, []);

    async function getMenuItems() {
        const response = await fetch('http://localhost:3001/api/file/show');
        const data = await response.json();
        setItems(data);
    };

    //custom react-pdf style

    const pdfStyle = document.getElementsByClassName('pdf');
    for (let i = 0; i < pdfStyle.length; i++) {
        // canvasStyle[i].style.display = "none";
        pdfStyle[i].style.display = 'flex';
        pdfStyle[i].style.flexDirection = 'column';
        pdfStyle[i].style.alignItems = 'center';
        pdfStyle[i].style.justifyContent = 'center';
    }

    const hideElement = document.getElementsByClassName('react-pdf__Page__annotations annotationLayer');
    // console.log(hideElement);
    for (let i = 0; i < hideElement.length; i++) {
        hideElement[i].style.display = 'none';
    }

    return (
        <div className='container'>
            <div className='row'>
                {items.map((item, index) =>
                    <div className='column1' key={index}>
                        <div className='column-item'>
                            <p className='item-name'>{item.name}</p>
                            <Link to="/files/details" state={{ data: item.name }}
                            >
                                <img src="/images/pdfexample.gif" width={200} height={250} alt="Logo" />
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}