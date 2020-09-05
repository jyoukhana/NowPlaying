import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebAPI = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'N/A',
        artists: 'N/A',
        album: 'N/A',
        image: '',
        device: ''
      }
    }

    if(params.access_token){
      spotifyWebAPI.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebAPI.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artists: response.item.artists[0].name,
            album: response.item.album.name,
            image: response.item.album.images[0].url,
            device: response.device
          }
        })
      })
  }

  render(){
    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button>Log in with your Spotify account</button>
        </a>

        <div>
          <img src={ this.state.nowPlaying.image } style={{ width: 400 }}/>
        </div>

        <div>
          Album: { this.state.nowPlaying.album }
        </div>

        <div>
          Now Playing "{ this.state.nowPlaying.name }" by { this.state.nowPlaying.artists }
        </div>

        <button onClick={() => this.getNowPlaying()}>
          Check song that user is now playing
        </button>
      </div>
    );
  }
}

export default App;
