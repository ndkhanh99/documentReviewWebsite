import React from 'react'

export default function ClientHeader(props) {


    return (
        <>
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
                            <a href='/'>Trang chủ</a>
                        </li>
                        <li>
                            <a className="md:p-4 py-2 block hover:text-[#007bff]" href="/login">Đăng nhập</a>
                        </li>
                        <li>
                            <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" href="/register">Đăng kí</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
