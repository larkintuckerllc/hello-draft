const SET_CONTACT = 'SET_CONTACT';
// REDUCERS
export default (state = null, action) => {
  switch (action.type) {
    case SET_CONTACT:
      return action.value;
    default:
      return state;
  }
};
// SELECTORS
export const getContact = state => state.contact;
// ACTION CREATORS
export const setContact = value => ({
  type: SET_CONTACT,
  value,
});
