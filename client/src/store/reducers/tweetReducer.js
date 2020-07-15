const initialStore = {
    tweets: [],
    // likes: []
    // comments: []
}

export const tweetReducer = (state = initialStore, { type, payload }) => {
    switch (type) {
        case 'GET_TWEETS':
            return { ...state, tweets: payload };
        case 'ADD_TWEET':
            return { ...state, tweets: [payload, ...state.tweets] };
        case 'UPDATE_TWEET':
            let updateTweet = state.tweets.filter(el => el.id !== payload.id)
            updateTweet.push(payload)
            return { ...state, tweets: updateTweet };
        case 'DELETE_TWEET':
            return {
                ...state,
                tweets: state.tweets.filter(el => el.id !== payload.id)
            };
        case 'LIKE_TWEET':
            state.tweets.forEach(el => {
                if(el.id === payload.TweetId){
                    el.Likes.push(payload)
                }
            })

            return {
                ...state, 
                tweets: state.tweets 
            }
        case 'UNLIKE_TWEET':
            let newTweets = state.tweets.map(el=>{
                if(el.id === payload.TweetId){
                    let tempLikes = el.Likes.filter(like => like.id !== payload.id)
                    el.Likes = tempLikes
                }
                return el
            })

            return {
                ...state, 
                tweets: newTweets 
            }
        default:
            return state;
    }
}