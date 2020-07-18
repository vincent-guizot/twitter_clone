import axios from 'axios';
const URL = 'http://localhost:3000/user/'

export const login = (userLogin) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + 'auth/login',
            data: userLogin
        }).then((result) => {
            console.log(result.data)
            localStorage.setItem('access_token', result.data.access_token)
            localStorage.setItem('UserId', result.data.UserId)
            localStorage.setItem('avatar', result.data.avatar)
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
    console.log(userRegister.image_url)
    var formData = new FormData();
    formData.append("image", userRegister.image_url, userRegister.image_url.name)
    return (dispatch) => {
        axios({
            method: 'POST',
            url: "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload",
            headers: {
                Authorization: "Client-ID 24c11b941941402",
                "Access-Control-Allow-Origin": "*",
            },
            data: formData,
        })
            .then(result => {
                console.log(result.data, 'result')
                return axios({
                    method: 'POST',
                    url: URL + 'auth/register',
                    data: {...userRegister, image_url: result.data.data.link}
                
                })
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

export const getUsers = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: URL + 'getUsers'
        })
        .then((result) => {
            dispatch({
                type: 'FECTH_USERS',
                payload: result.data
            })
        }).catch((err) => {
            console.log(err)
        });
    }
}

export const loginGoogle = (tokenId) => {
    return (dispatch) => {
        axios({
            method: "POST",
            url: URL + 'auth/loginGoogle',
            data : {
                tokenId
            }
        })
        .then(result=> {
            console.log(result.data)
            localStorage.setItem('access_token', result.data.access_token)
            localStorage.setItem('UserId', result.data.UserId)
            localStorage.setItem('avatar', result.data.avatar)
            dispatch({
                type: "LOGIN",
                payload: result.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}