import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from "../../actions/user_actions";
import { changeTrack, pauseTrack } from '../../actions/footer_player_actions';
import { createFavoriteTrack, deleteFavoriteTrack } from "../../actions/favorite_track_actions";
import { fetchCurrentUser } from "../../actions/session_actions";
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUser.id];
    const user = state.entities.users[ownProps.match.params.userId];

    return {
        tracks: Object.values(state.entities.tracks).slice().reverse().filter(track => track.user_id === user.id),
        user: user,
        currentTrack: state.ui.currentTrack,
        percent: state.ui.percent,
        playing: state.ui.playing,
        currentUser: currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    changeTrack: (trackId) => dispatch(changeTrack(trackId)),
    pauseTrack: () => dispatch(pauseTrack()),
    createFavoriteTrack: (trackId) => dispatch(createFavoriteTrack(trackId)),
    deleteFavoriteTrack: (trackId) => dispatch(deleteFavoriteTrack(trackId)),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));