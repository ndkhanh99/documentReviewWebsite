import { React, useState, useEffect } from 'react';
import AllFile from '../../Components/ShowFile/AllFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import ClientHeader from '../../Components/ClientHeader';
import docServices from '../../services/docServices';
import { baseUrl } from '../../services';

export default function ClientHome(props) {
    // fetch files from db
    const [items, setItems] = useState([]);
    const [filesFilter, setFilesFilter] = useState([]);
    const [activeMenu, setactiveMenu] = useState()

    useEffect(() => { getMenuItems() }, []);

    async function getMenuItems() {
        const response = await fetch(`${baseUrl}/file/show/doctype`);
        const data = await response.json();
        setItems([{name : 'Tất cả', _id : ''},...data]);
        setactiveMenu('')
    };

    async function filterItems(docTypeId) {
        if (docTypeId == '' ) {
            const response = await docServices.getAllDoc()
            setFilesFilter(response)
        }else {
            const response = await fetch(`${baseUrl}/file/show/filter?foo=${encodeURIComponent(docTypeId)}`, {
                method: "GET",
            });
            const data = await response.json();
            setFilesFilter(data);
        }
    };
    return (
        <>
            <div className='flex flex-col'>
                <ClientHeader/>
                <div className="px-4 bg-slate-100">
                    <div
                        className="
                        items-center
                        justify-center
                        bg-white
                        mx-auto
                        max-w-7xl
                        rounded-lg
                        my-3
                        "
                    >
                        <nav className="bg-[#007bff] justify-start items-center flex flex-row">
                            <div className="ml-5toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none text-white gap-4 ml-5 pl-2">
                                {items.map((item, index) =>
                                    <div key={item._id}>
                                        <div className= {item._id === activeMenu ? 'bg-purple-600' : ''} 
                                            onClick={() => {setactiveMenu(item._id)
                                                            filterItems(item._id)}}>
                                            <FontAwesomeIcon icon={faBookOpen} className="pl-2"/>
                                            <a  className="block md:inline-block text-white hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">{item.name}</a>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </nav>
                        <AllFile filesFilter={filesFilter} />
                    </div>
                </div>
            </div>


        </>
    )
}
