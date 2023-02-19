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
        let filesname = `${data}.pdf`;
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
        <div>
            <nav
                className="
            flex flex-wrap
            items-center
            justify-between
            w-full
            py-4
            md:py-0
            px-4
            text-lg text-gray-700
            bg-slate-100
            "
            >
                <div>
                    <a href="#">
                        <img className='rounded-lg' src="/images/blue-y-logo.jpeg" width={150} height={100} alt="Logo" />
                    </a>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                    <ul
                        className="
                    pt-4
                    text-base text-gray-700
                    md:flex
                    md:justify-between 
                    md:pt-0"
                    >
                        <li className="md:p-4 py-2 block hover:text-[#007bff]">
                            <p>Trang chủ</p>
                        </li>
                        <li>
                            <p className="md:p-4 py-2 block hover:text-[#007bff]" href="#">Đăng nhập</p>
                        </li>
                        <li>
                            <p className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" href="#">Đăng kí</p>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='pdf'>
                <h1 className='text-2xl text-blue-600 border border-solid border-gray-900 p-3'>Tên tài liệu: {data ? data : "no data passing"}</h1>
                <Document
                    file={{
                        url:
                            'http://localhost:3001/' + `${data}.pdf`,
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
                    <h2 className='underline mt-3'>Download to read all the document</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" onClick={(e) => download(e)}>Download</button>
                </div>
            </div>
        </div>

    );
}
