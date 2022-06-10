const SET_ATTACHMENT = "SET_ATTACHMENT"

const defaultState = {
    attachment: ""
}

export default function attachmentReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ATTACHMENT:
            return {
                ...state,
                attachment: action.payload
            }
        default:
            return state
    }
}
export const setAttachment = () => ({ type: SET_ATTACHMENT })