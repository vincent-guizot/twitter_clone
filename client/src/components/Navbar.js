import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    const onHandleLogout= () => {
        localStorage.clear()
    }

    return (
        <div className="navbar-component container-fluid">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/" className="navbar-brand">Woodpecker</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                        </div>
                    </div>
                    <div className="ml-auto">
                        <Link to="/auth" onClick={()=> onHandleLogout()} className="btn btn-outline-info">LOGOUT</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
