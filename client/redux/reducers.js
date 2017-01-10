
export const sessionReducer = (state={data: null, service: null}, action) => {
  switch(action.type) {
    case 'INIT_SESSION':
      return {
        ...state,
        service: action.service,
        data: action.data,
      };
    case 'END_SESSION':
      return {
        ...state,
        service: null,
        data: null,
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
