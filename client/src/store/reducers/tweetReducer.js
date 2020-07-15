const initialStore = {
    tweets: []
}

export const tweetReducer = (state = initialStore, { type, payload }) => {
    switch (type) {
        case 'GET_TWEETS':
            return { ...state, tweets: payload };
        case 'ADD_TWEET':
            return { ...state, tweets: state.tweets.concat(payload) };
        case 'UPDATE_TWEET':
            let updateTweet = state.tweets.filter(el => el.id !== payload.id)
            updateTweet.push(payload)
            return {...state, tweets: updateTweet};
        case 'DELETE_TWEET':
            return {
                ...state,
                tweets: state.tweets.filter(el => el.id !== payload.id)
            };
        default:
            return state;
    }
}