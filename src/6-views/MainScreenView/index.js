import React from 'react'
import PropTypes from 'prop-types'

export const MainScreenView = ({getJoke, jokeList}) => { 
  return (
    <div>
      <button onClick={getJoke}>MORE!!!</button>
      {jokeList.map(joke => <div key={joke.id}>{joke.value}</div>)}
    </div>
  );
}

MainScreenView.propTypes = {
  getJoke: PropTypes.func.isRequired,
  jokeList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired
};