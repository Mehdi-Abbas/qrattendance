 ///simple action to be triggered from UI and will update reducer on the basis of type
 export const OnSubmit = (email) => { 
    return {
     type:'SUBMIT',
     value:email
    }
 }
 
 export const OnDelete = () => {
   return {
     type:'DELETE'
   }
 }
 
//  export const OnDeleteComplete = (index) => {
//    return {
//      type:'DELETE_COMPLETE',
//      value:index
//    }
//  }
//  export const OnEdit = () => { 
//     return {
//      type:'EDIT'
//     }
//  }
//  export const OnUpdate = (index,text) => { 
//     return {
//      type:'UPDATE',
//      index:index,
//      text:text
//     }
//  }
//  export const OnComplete = (index) => {
//    return {
//      type:'COMPLETE',
//      index:index,
    
//    }
//  }