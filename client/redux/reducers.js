
export const sessionReducer = (state={}, action) => {
  switch(action.type) {
    case 'INIT_SESSION':
      return {
        ...state,
        service: action.service,
        data: action.data,
      };
    default:
      return state;
  }
};

// export const reducer = (state ={}, action) => {
//   switch(action.type) {
//     default:
//       return state;
//   }
// };
