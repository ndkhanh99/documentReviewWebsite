import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Class from './Class'
import Home from './Home'
import Login from './Login'
import Files from './Files'
import FileDetails from '../Components/ShowFile/FileDetails'

export default function Navigation(props) {


    return (
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/files" element={<Files />} />
            <Route path="/files/details" element={<FileDetails />} />
            <Route exact path="login" element={<Login />} />
            <Route path="class/:id" element={<Class />} />
        </Routes>

    )
}
