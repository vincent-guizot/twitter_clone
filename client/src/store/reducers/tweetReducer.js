const initialStore = {
    tweets : []
}

export const tweetReducer = (state = initialStore, { type, payload }) => {
    switch (type) {
        case 'GET_TWEETS':
            return { ...state, tweets: payload };
        case 'ADD_TWEET':
            return { ...state, tweets: state.tweets.concat(payload) };
        // case 'UPDATE_TWEET':
            // let updateTweet = state.tweets.filter(el=> el.id === payload.id )
            // updateTweet[0] = {
            //     ...updateTweet[0], 
            //     ...payload
            // }
            // state.tweets.forEach(el=>{
            //     if(el.id === payload.id){
            //         el = {...el, ...payload}
            //     }
            // })

            // return state;
        // case 'DELETE_TWEET':
        //     return {
        //         ...state, 
        //         tweets: state.tweets.filter(el => {
        //             el.id !== payload.id

        //         })
        //     };
        default:
            return state;
    }
}