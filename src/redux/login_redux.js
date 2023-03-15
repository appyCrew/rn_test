let initValues = {
  isLoad: false,
  usersList: [],
};

export const login_redux = (state = initValues, action) => {
  switch (action.type) {
    case 'ADD_USER':
      state = {
        ...state,
        isLoad: false,
        usersList: state.usersList.concat(action.obj).sort(function (x, y) {
          return y.id - x.id;
        }),
      };
      return state;
    case 'EDIT_USER':
      if (action.obj !== undefined && action.obj !== null) {
        return Object.assign({}, state, {
          usersList: state.usersList.map((item, index) => {
            if (item.id == action.obj.id) {
              return Object.assign({}, item, {
                value: action.obj.value,
              });
            }
            return item;
          }),
        });
      }
      return state;
    case 'DELETE_USER':
      state = {
        ...state,
        usersList: [
          ...state.usersList.filter((item, index) => item.id !== action.id),
        ],
      };
    default:
      return state;
  }
};
