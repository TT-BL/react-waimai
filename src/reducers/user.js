import actionTypes from '../actions/actionTypes'
const isLogin=localStorage.getItem('username')

const initState = {
    isLogin,
    isLoading: false
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLoading: false,
                isLogin: true,
            }
        case actionTypes.QUIT_LOGIN:
            return {
                isLogin:false,
                isLoading: false
            }
        default:
            return state
    }
}