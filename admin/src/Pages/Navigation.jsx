import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Class from './Class'
import Home from './Home'
import Login from './Login'
import Files from './Files'
import FileDetails from '../Components/ShowFile/FileDetails'
import ClientHome from './ClientRoute/ClientHome'

export default function Navigation(props) {


    return (
        <Routes >
            {/* Dung cho client page */}
            <Route path='/' element={<ClientHome/>}/>

            {/*  */}
            {/* Dung cho admin page */}
            <Route path="admin/" element={<Home />} />
            <Route exact path="admin/login" element={<Login />} />
            <Route path="class/:id" element={<Class />} />
            <Route path="/files" element={<Files />} />
            <Route path="/files/details" element={<FileDetails />} />
            {/*  */}
        </Routes>

    )
}
