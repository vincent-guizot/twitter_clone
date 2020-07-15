const initialState = {
    user : {},
    users : []
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "LOGIN":
        return { ...state, user: payload }
    case "REGISTER":
        return {...state, user : payload}
    default:
        return state
    }
}
