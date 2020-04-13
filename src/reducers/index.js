import {combineReducers} from 'redux'
import users from './user'
import retaurants from './restaurant'
export default combineReducers({
    users,
    retaurants
})