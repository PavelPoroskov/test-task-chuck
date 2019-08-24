import { connect } from 'react-redux'

import { getJoke } from '5-store/modules/jokeGet';
import { MainScreenView } from '6-views/MainScreenView'

const mapStateToProps = ({ jokeList }) => ({
  jokeList
});

const mapDispatchToProps = (dispatch) => ({
  getJoke: () => dispatch(getJoke())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenView);
