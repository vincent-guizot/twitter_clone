import axios from 'axios'
const URL = 'http://localhost:3000/tweet'

export const getTweets = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: URL + '/all',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(result => {
                dispatch({
                    type: 'GET_TWEETS',
                    payload: result.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export const addTweet = (tweet) => {
    console.log('tweet: ', tweet);
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: tweet,
        })
            .then((result) => {
                // dispatch(getTweets())
                dispatch({
                    type: 'ADD_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const deleteTweet = (id) => {
    return (dispatch) => {
        axios({
            method: 'DELETE',
            url: URL + '/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(result => {
                // dispatch(getTweets())
                dispatch({
                    type: 'DELETE_TWEET',
                    payload: { id }
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export const likeTweet = (TweetId) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + '/like',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                TweetId
            }
        })
            .then((result) => {
                dispatch({
                    type: 'LIKE_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const unlikeTweet = (TweetId) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + '/unlike',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                TweetId
            }
        })
            .then((result) => {
                dispatch({
                    type: 'UNLIKE_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}