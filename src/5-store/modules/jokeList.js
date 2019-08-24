
// Actions
const ADD = 'test-task-chuck/jokeList/ADD';

const initState = []

// Reducer
export default function reducer( state=initState, action ) {
  switch (action.type) {
    case ADD:
      return state.concat(action.payload)
    default:
      return state;
  }
}

// Action Creators
export const add = (item) => ({ type: ADD, payload: item });
