import actionTypes from "../actions/actionTypes"
const initState={
    count:0
}
export default (state=initState,actions)=>{
    switch(actions.type){
        case actionTypes.GET_RESTAURANT_SUCCESS:
            return {
                name:actions.payload.name,
                count:actions.payload.count
            }
        default:
            return state
    }
} 