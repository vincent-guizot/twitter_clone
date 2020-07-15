import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login, register } from '../store/actions/userAction'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")

    const [page, setPage] = useState('login')

    const onHandleLogin = () => {
        dispatch(login({
            email,
            password: pwd
        }))
    }

    const onHandleRegister = () => {
        dispatch(register({
            email,
            password: pwd,
            username,
            image_url : image
        }))
    }
    
    {
        // page login
        if (page === "login") {
            return (
                <>
                    <div className="h-100">
                        <div className="container">
                            <div className="row w-100 justify-content-center align-middle">
                                <div className="col-5">
                                    <div className="card p-4">
                                        <form>
                                            <div className="form-group">
                                                <label >Email address</label>
                                                <input type="email" className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)} />

                                                <small id="emailHelp" className="form-text text-muted">Input with email format, thanks!</small>
                                            </div>
                                            <div className="form-group">
                                                <label >Password</label>
                                                <input type="password" className="form-control" onChange={(e) => setPwd(e.target.value)} />
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Remember account</label>
                                            </div>
                                            <Link to="/home" onClick={onHandleLogin} type="button" className="btn btn-block btn-primary">LOGIN</Link>
                                        </form>
                                        <button onClick={() => setPage('register')} >Register Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            // page register
            return (
                <>
                    <div className="h-100">
                        <div className="container">
                            <div className="row w-100 justify-content-center align-middle">
                                <div className="col-5">
                                    <div className="card p-4">
                                        <form>
                                        <div className="form-group">
                                                <label >Username</label>
                                                <input type="text" className="form-control"
                                                    onChange={(e) => setUsername(e.target.value)} />

                                                <small id="emailHelp" className="form-text text-muted"></small>
                                            </div>
                                            <div className="form-group">
                                                <label >Image</label>
                                                <input type="text" className="form-control"
                                                    onChange={(e) => setImage(e.target.value)} />

                                                <small id="emailHelp" className="form-text text-muted">Must link format!!</small>
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input type="email" className="form-control"
                                                    onChange={(e) => setEmail(e.target.value)} />

                                                <small id="emailHelp" className="form-text text-muted">Input with email format, thanks!</small>
                                            </div>
                                            <div className="form-group">
                                                <label >Password</label>
                                                <input type="password" className="form-control" onChange={(e) => setPwd(e.target.value)} />
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Remember account</label>
                                            </div>
                                            <Link to="/register" onClick={onHandleRegister} type="button" className="btn btn-block btn-primary">REGISTER</Link>
                                        </form>
                                        <button onClick={() => setPage('login')} >Have account, Login Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Login
