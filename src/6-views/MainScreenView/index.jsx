import PropTypes from 'prop-types'

export const MainScreenView = ({getJoke, jokeList}) => { 
  return (
    <div className='container'>
      <div className='btn-container'>
        <button onClick={getJoke} className='btn'>MORE!!!</button>
      </div>
      {jokeList.map(joke => <div key={joke.id} className='card-container'><div className='card'>{joke.value}</div></div>)}
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