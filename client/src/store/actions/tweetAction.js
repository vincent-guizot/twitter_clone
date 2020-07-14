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

export const addTweet = (tweet) => {
    console.log('tweet: ', tweet);
    return (dispatch) => {
        axios({
            method: 'post',
            url: URL ,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: tweet,
        })
        .then((result) => {
            dispatch(getTweets())
            // dispatch({
            //     type: 'ADD_TWEET',
            //     payload: result.data
            // })
        }).catch((err) => {
            console.log(err)
        });
    }    
}