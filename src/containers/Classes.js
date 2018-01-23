// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchGames, { fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateClassButton from '../components/games/CreateClassButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Classes.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToWebsocket()
  }

  goToGame = gameId => event => this.props.push(`/play/${gameId}`)


  render() {
    return (
      <div className="Classes">
        <h1>All classes</h1>
        <CreateClassButton />
        
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentUser }) => ({ games, currentUser })

export default connect(mapStateToProps, { fetchGames, subscribeToWebsocket, fetchPlayers, push })(Lobby)
