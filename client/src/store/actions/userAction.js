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

// IMGUR
// ID : 24c11b941941402
// Secret : 0a287465309c0bfdb69029fa224643ee4753da6d

export const register = (userRegister) => {
    console.log(userRegister.image_url.name)
    return (dispatch) => {
        fetch({
            method: 'POST',
            url: "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload",
            headers: {
                Authorization : "Client-ID 24c11b941941402",
                "Access-Control-Allow-Origin" : "*"
            },
            data: {
                image :userRegister.image_url
            }
        })
        .then(result=> result.json())
        .then(result=>{
            console.log(result.data)
        })
        .catch(err=>{
            console.log(err)
        })

        // axios({
        //     method: 'POST',
        //     url: URL + 'register',
        //     data : userRegister
        // }).then((result) => {
            
        //     localStorage.setItem('access_token', result.data.access_token)
        //     localStorage.setItem('UserId', result.data.UserId)
        //     dispatch({
        //         type: "REGISTER",
        //         payload: result.data
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // });
    }
}
