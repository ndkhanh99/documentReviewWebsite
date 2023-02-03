import { React, useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileItem = ({ file, deleteFile }) => {

    // fetch files from db
    let [items, setItems] = useState([]);
    useEffect(() => { getMenuItems() }, []);

    async function getMenuItems() {
        const response = await fetch('http://localhost:3001/api/file/show');
        // console.log(response);
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
    console.log(hideElement);
    for (let i = 0; i < hideElement.length; i++) {
        hideElement[i].style.display = 'none';
    }

    return (
        <div className='container'>
            <div className='row'>
                {items.map((item, index) =>
                    // <li  key={index}>{item.name}</li>
                    <div className='column1' key={index}>
                        <div>
                            {/* <a href={"/files/details/" + item.name}>
                                <img src="/images/pdfexample.gif" width={300} height={350} alt="Logo" />
                                <p className='item-name'>{item.name}</p>
                            </a> */}
                            <Link
                                to={{
                                    pathname: "/files/details",
                                    state: { data: item.name },
                                }}
                            >
                                <img src="/images/pdfexample.gif" width={300} height={350} alt="Logo" />
                                <p className='item-name'>{item.name}</p>
                            </Link>
                        </div>
                    </div>
                )}

            </div>
            {/* <ul>
                {items.map((item, index) =>
                    <li className='p-4 hover:text-yellow-300' key={index}>{item.name}</li>
                )}
            </ul>
            <div className='pdf'>
                <Document
                    file={{
                        url:
                            'http://localhost:3001/gt2c2.pdf',
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div> */}
        </div>
    )
}

export default FileItem