import React, { useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar'
import MainContent from '../components/MainContent'

function Home() {
    const access_token = localStorage.getItem('access_token')
    const history = useHistory()

    useEffect(() => {
        if (!access_token) {
            history.push('/login')
        }
    }, [])

    return (
        <div className="h-100">
            <Navbar></Navbar>
            <MainContent></MainContent>
        </div>
    )
}

export default Home
