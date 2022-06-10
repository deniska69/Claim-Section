const SET_ONECLAIM = "SET_ONECLAIM"
const SET_ALLCLAIMS = "SET_ALLCLAIMS"


const defaultState = {
    oneClaim: {},
    listClaims: []
}

export default function claimReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ONECLAIM:
            return {
                ...state,
                oneClaim: action.payload
            }
        case SET_ALLCLAIMS:
            return {
                ...state,
                listClaims: action.payload
            }
        default:
            return state
    }
}
export const setOneClaim = claim => ({ type: SET_ONECLAIM, payload: claim })
export const setAllClaims = claims => ({ type: SET_ALLCLAIMS, payload: claims })