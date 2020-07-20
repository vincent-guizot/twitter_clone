import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, register, loginGoogle } from '../store/actions/userAction'
import { GoogleLogin } from 'react-google-login'
import { Link, Redirect, useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.userReducer)

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

    const responseGoogle = (response) => {
        console.log(response.tokenId);
        dispatch(loginGoogle(response.tokenId))
    }

    if (localStorage.getItem("access_token")) return <Redirect to="/" />

    {
        // page login
        if (page === "login") {
            return (
                    <div className="w-100 auth d-flex justify-content-center align-items-center ">
                <div className="w-50 auth-login border rounded">
                            <div className="row">
                                <div className="col-5 bg-info"></div>
                                <div className="col-7 bg-white">
                                    <div className="p-4">
                                        <h3>Login</h3>
                                        <hr/>
                                        <form>
                                            <div className="form-group">
                                                <label >Email </label>
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
                                            <button onClick={onHandleLogin} type="button" className="btn btn-block btn-info">LOGIN</button>
                                        </form>
                                        <GoogleLogin
                                            clientId="736902288211-6rgfasm0s0rr15j2q5kb7r7lhr6ujl12.apps.googleusercontent.com"
                                            buttonText="Login"
                                            jsSrc="https://apis.google.com/js/api.js"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                        <button className="btn btn-" onClick={() => setPage('register')} >Register Now</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
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
                                                <input type="file" className="form-control"
                                                    onChange={(e) => setImage(e.target.files[0])} />

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
                                                <label className="form-check-label" >Remember account</label>
                                            </div>
                                            <button onClick={onHandleRegister} type="button" className="btn btn-block btn-info">REGISTER</button>
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
