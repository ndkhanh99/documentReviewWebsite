import { React, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './AllFiles.scss';
import { useLocation } from 'react-router-dom';
import fileDownload from 'js-file-download';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileDetails(props) {
    const location = useLocation();
    const data = location.state?.data;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // // fetch files from db
    // let [items, setItems] = useState([]);
    // useEffect(() => { getMenuItems() }, []);

    // async function getMenuItems() {
    //     const response = await fetch('http://localhost:3001/api/file/show');
    //     // console.log(response);
    //     const data = await response.json();
    //     setItems(data);
    // };

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

    // function download(e) {
    //     console.log("waiting..");
    //     e.preventDefault();
    //     let url = "http://localhost:3001/api/file/show/download";
    //     let filename = data;
    //     let form_data = new FormData();
    //     form_data.append('filename', filename);
    //     console.log(filename);
    //     axios.post(url, form_data, {
    //         responseType: 'blob',
    //     }).then(res => {
    //         fileDownload(res.data, filename);
    //     });
    //     fetch(url, {
    //         method: 'POST',
    //         // We convert the React state to JSON and send it as the POST body
    //         body: JSON.stringify(filename),
    //         responseType: 'blob'
    //     }).then(res => {
    //         fileDownload(res.data, filename);
    //     });
    // }

    function download(e) {
        e.preventDefault();
        let filesname = data;
        console.log(filesname);
        const book = { filesname };
        axios.post('http://localhost:3001/api/file/show/download', book, { responseType: 'blob' })
            .then(res => {
                fileDownload(res.data, filesname);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='pdf'>
            <h1>Tên tài liệu: {data ? data : "no data passing"}</h1>
            <Document
                file={{
                    url:
                        'http://localhost:3001/' + 'Nguyen-Duy-Khanh-TopCV.vn-031022.105542.pdf',
                }}
                onLoadSuccess={onDocumentLoadSuccess}
                onContextMenu={(e) => e.preventDefault()}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <div className='download'>
                <h2>Download to read all the document</h2>
                <button onClick={(e) => download(e)}>Download</button>
            </div>
        </div>
    );
}
