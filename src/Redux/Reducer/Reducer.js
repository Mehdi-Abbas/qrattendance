let initialState = { //Defining initial state of this reducer to have intial value in view from thi reducer
    data:{a:"a"},
  }
  
  // A very simple reducer
  function Function(state = initialState, action) {
   switch (action.type) { //Catching type in reducer using switch
      case 'SUBMIT':
        return {
          data:{email:action.value}
        };
      case 'DELETE':
        return {
            data:{a:"a"}
        };
    //   case 'DELETE_COMPLETE':
    //     return {
    //       ...state,
    //       completeData:[
    //         ...state.completeData.slice(0, action.value),
    //         ...state.completeData.slice(action.value + 1)
    //       ]
    //     };
      
    //   case 'UPDATE':
    //     return { 
    //      ...state, 
    //      data: [ ...state.data.slice(0,action.index),{title: action.text},...state.data.slice(action.index+1)]
    //     }
    //   case 'COMPLETE':
    //     return {
    //       ...state,
    //       completeData:[...state.completeData,...state.data.splice(action.index,1)]
    //     };
        
      default:
        return state;
    }
  }
  
  export default Function;//Export reducer so it can be used in combineReducer Method to create store
  