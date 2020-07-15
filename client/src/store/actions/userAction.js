import axios from 'axios';
const URL = 'http://localhost:3000/user/auth/'

export const login = (userLogin) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + 'login',
            data : userLogin
        }).then((result) => {
            console.log(result.data)
            localStorage.setItem('access_token', result.data.access_token)
            localStorage.setItem('UserId', result.data.UserId)
            dispatch({
                type: "LOGIN",
                payload: result.data
            })
        }).catch((err) => {
            console.log(err)
        });
    }
}

export const register = (userRegister) => {
    console.log(userRegister)
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + 'register',
            data : userRegister
        }).then((result) => {
            
            localStorage.setItem('access_token', result.data.access_token)
            localStorage.setItem('UserId', result.data.UserId)
            dispatch({
                type: "REGISTER",
                payload: result.data
            })
        }).catch((err) => {
            console.log(err)
        });
    }
}
