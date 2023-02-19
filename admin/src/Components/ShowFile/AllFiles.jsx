import { React, useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileItem(filesFilter) {
    // fetch files from db
    let [items, setItems] = useState([]);
    useEffect(() => { getMenuItems() }, [filesFilter.filesFilter]);

    async function getMenuItems() {
        if (filesFilter.filesFilter.length === 0) {
            const response = await fetch('http://localhost:3001/api/file/show');
            // console.log(response);
            const data = await response.json();
            setItems(data);
        } else {
            setItems(filesFilter.filesFilter);
        };
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
            <div className='row w-full gap-3'>
                {items.map((item, index) =>
                    <div className='item-center text-center justify-center' key={index}>
                        <div className='column1' >
                            <div>
                                {/* <a href={"/files/details/" + item.name}>
                                    <img src="/images/pdfexample.gif" width={300} height={350} alt="Logo" />
                                    <p className='item-name'>{item.name}</p>
                                </a> */}
                                <Link to="/files/details" state={{ data: item.name }}
                                >
                                    <img src="/images/pdfexample.gif" width={300} height={350} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <p className='item-name'>{item.name}</p>
                    </div>
                )}

            </div>
        </div>
    );
}