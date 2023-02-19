import { React, useState, useEffect } from 'react';
import AllFile from '../../Components/ShowFile/AllFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function ClientHome(props) {
    // fetch files from db
    let [items, setItems] = useState([]);
    let [filesFilter, setFilesFilter] = useState([]);

    useEffect(() => { getMenuItems() }, []);

    async function getMenuItems() {
        const response = await fetch('http://localhost:3001/api/file/show/doctype');
        // console.log(response);
        const data = await response.json();
        setItems(data);
    };

    async function filterItems(docTypeId) {
        const response = await fetch(`http://localhost:3001/api/file/show/filter?foo=${encodeURIComponent(docTypeId)}`, {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setFilesFilter(data);
    };
    return (
        <>
            <div className='flex flex-col'>
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
                <div className="px-4 bg-slate-100">
                    <div
                        className="
                        justify-center
                        items-center
                        bg-white
                        mx-auto
                        max-w-2xl
                        rounded-lg
                        my-16
                        "
                    >
                        <nav className="flex flex-row items-center justify-center p-5 bg-[#007bff] gap-3">
                            <div className="flex md:hidden">
                                <button id="hamburger">
                                    <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
                                    <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
                                </button>
                            </div>
                            <div className="toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none text-white">
                                {items.map((item, index) =>
                                    <div key={index}>
                                        <div className='hover:bg-purple-700' onClick={() => filterItems(item._id)}>
                                            <FontAwesomeIcon icon={faBookOpen} />
                                            <p href="#" className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">{item.name}</p>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </nav>
                        <h1 className='text-xl text-blue-500'>
                            Day la trang home cua client
                        </h1>
                        <AllFile filesFilter={filesFilter} />
                    </div>
                </div>
            </div>


        </>
    )
}
