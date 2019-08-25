
// Actions
const ADD = 'test-task-chuck/jokeList/ADD';

const initState = []

// Reducer
export default function reducer( state=initState, action ) {
  switch (action.type) {
    case ADD:
      return [action.payload].concat(state)
    default:
      return state;
  }
}

// Action Creators
export const add = (item) => ({ type: ADD, payload: item });
