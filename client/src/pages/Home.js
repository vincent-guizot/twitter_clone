import React, { useEffect} from 'react'
import { useHistory, Redirect } from "react-router-dom";
import Navbar from '../components/Navbar'
import MainContent from '../components/MainContent'

function Home() {
     return (
        <div className="h-100">
            <Navbar></Navbar>
            <MainContent></MainContent>
        </div>
    )
}

export default Home
