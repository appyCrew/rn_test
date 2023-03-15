export const addUser = obj => {
  return {
    type: 'ADD_USER',
    obj,
  };
};

export const editUser = obj => {
  return {
    type: 'EDIT_USER',
    obj,
  };
};

export const deleteUser = id => {
  return {
    type: 'DELETE_USER',
    id,
  };
};
