const initialState = {
    user : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOGIN":
        return { ...state, user: payload }
    default:
        return state
    }
}
