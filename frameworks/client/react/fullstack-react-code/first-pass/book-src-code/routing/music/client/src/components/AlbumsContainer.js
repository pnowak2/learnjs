import React, { Component } from 'react';

import Album from './Album';
import { client } from '../Client';
import VerticalMenu from './VerticalMenu';
import Match from 'react-router/Match';

const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];

class AlbumsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      albums: [],
    };

    this.getAlbums = this.getAlbums.bind(this);
  }

  componentDidMount() {
    this.getAlbums();
  }

  getAlbums() {
    // client.setToken('D6W69PRgCoDKgHZGJmRUNA');
    client.getAlbums(ALBUM_IDS)
      .then((albums) => (
        this.setState({
          fetched: true,
          albums: albums,
        })
      ));
  }

  render() {
    if (!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else {
      return (
        <div className='ui two column divided grid'>
          <div
            className='ui six wide column'
            style={{ maxWidth: 250 }}
          >
            <VerticalMenu 
              albums={this.state.albums} 
              albumsPathname={this.props.pathname} />
          </div>
          <div className='ui ten wide column'>
            <Match
              pattern={`${this.props.pathname}/:albumId`}
              render={({ params }) => {
                const album = this.state.albums.find(
                  (a) => a.id === params.albumId
                ); return (
                  <Album
                    album={album}
                    albumsPathname={this.props.pathname}
                  />);
              }} />
          </div>
        </div>
      );
    }
  }
}

export default AlbumsContainer;
