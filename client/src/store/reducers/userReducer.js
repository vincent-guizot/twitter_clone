const initialState = {
    user : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOGIN":
        return { ...state, user: payload }
    case "REGISTER":
        return {...state, user : state.user.concat(payload)}
    default:
        return state
    }
}
