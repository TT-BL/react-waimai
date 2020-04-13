import actionTypes from "../actions/actionTypes"
const initState=
{
    data:[],
    isLoading:false
}
export default (state=initState,actions)=>{
    switch(actions.type){
        case actionTypes.START_GET_FOODS:
            return{
                ...state,
                isLoading:true
            }
        case actionTypes.GET_FOODS_SUCCESS:
            return {
                ...state,
                data:[...actions.payload],
                isLoading:false
            }
        default:
            return state
    }
} 