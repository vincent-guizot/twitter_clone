import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login, register } from '../store/actions/userAction'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const [page, setPage] = useState('login')

    const onHandleLogin = () => {
        history.push('/home')
        dispatch(login({
            email,
            password: pwd
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
                                            <Link to="/home" onClick={onHandleLogin} type="button" className="btn btn-primary">LOGIN</Link>
                                        </form>
                                        <a onClick={() => setPage('register')} href="true">Register Now</a>
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
                                            <button onClick={onHandleLogin} type="button" className="btn btn-primary">LOGIN</button>
                                        </form>
                                        <a onClick={() => setPage('login')} href="true">Have account, Login Now</a>
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
