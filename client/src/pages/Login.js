import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    return (
        <div className="container">
            <div className="row">
                <div className="col-5">


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
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
