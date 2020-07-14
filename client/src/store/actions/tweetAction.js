import axios from 'axios'
const URL = 'http://localhost:3000/tweet'

export const getTweets = () => {
    return (dispatch) => {
        axios({
            method : 'GET',
            url: URL + '/all',
            headers: {
                access_token : localStorage.getItem('access_token')
            }
        })
        .then(tweets=>{
            dispatch({
                type: 'GET_TWEETS',
                payload: tweets.data
            })
        })
        .catch(err=>{
            console.error(err)
        })
    }
}