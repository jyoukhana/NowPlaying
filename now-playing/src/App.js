import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const spotifyWebAPI = new Spotify();

const useStyles = theme => ({
  root: {
    display: 'flex',
    maxWidth: 100,
  },
  media: {
    height: 140,
  },
});

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

      <div>
        <a href='http://localhost:8888'>
          <button>Log in with your Spotify account</button>
        </a>

        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={this.state.nowPlaying.image}
              title= {this.state.nowPlaying.name}
            />
          <CardContent>
            <canvas id="nowPlaying" width="100" height="100"></canvas>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.nowPlaying.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.nowPlaying.artists}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.nowPlaying.album}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => this.getNowPlaying()} size="small" color="primary">
              Now Playing
            </Button>
          </CardActions>
          </CardActionArea>
        </Card>
        </div>
    );
  }
}

export default withStyles(useStyles)(App);
