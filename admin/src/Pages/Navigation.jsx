import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Class from './Class'
import Home from './Home'
import Login from './Login'

export default function Navigation(props) {


    return (
            <Routes >
                <Route path = "/" element ={<Home/>}/>
                <Route exact path = "login" element = {<Login/>}/>
                <Route path = "class/:id" element = {<Class/>}/>
            </Routes>
    )
}
