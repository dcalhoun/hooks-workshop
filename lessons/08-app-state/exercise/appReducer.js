const initialState = { authAttempted: false, auth: null, user: null }

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_CHANGE": {
      return { ...state, auth: action.auth, authAttempted: true }
    }
    case "SET_USER": {
      return { ...state, user: action.user }
    }
    case "FETCH_USER_FAILED": {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export { initialState }
export default appStateReducer
