import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, register } from '../store/actions/userAction'
import { Link, Redirect, useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.userReducer)
    console.log(user)
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            history.push('/home')
            // <Redirect to="/home" />
            // return () => {
            
            // }
        }
    }, [user])

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
            image_url: image
        }))
    }

    // if (localStorage.getItem("access_token")) {
    //     return (
    //         <Redirect to="/home" />
    //     )
    // }

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
                                                <label className="form-check-label" >Remember account</label>
                                            </div>
                                            <button onClick={onHandleLogin} type="button" className="btn btn-block btn-primary">LOGIN</button>
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
                                            <button onClick={onHandleRegister} type="button" className="btn btn-block btn-primary">REGISTER</button>
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
