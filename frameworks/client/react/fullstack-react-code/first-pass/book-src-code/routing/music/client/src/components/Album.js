import React from 'react';

import Link from 'react-router/Link';

import '../styles/Album.css';
import { durationToHuman } from '../Helpers';

const Album = ({ album, albumsPathname }) => (
  <div className='Album'>
    <div className='row'>
      <div className='ui middle aligned three column grid'>
        <div className='six wide column' style={{ minWidth: '212px' }}>
          <img
            src={album.imageUrl}
            style={{ width: '212px' }}
            alt='album'
          />
        </div>
        <div className='one wide column' />
        <div className='six wide column'>
          <p>
            {
              `By ${album.artist.name}
              - ${album.year}
              - ${album.tracks.length} songs`
            }
          </p>
          <div
            className='ui left floated large button'
          >
            <Link 
              to={albumsPathname}
              className='ui left floated large button'
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className='spacer row' />
    <div className='row'>
      <table
        className='ui very basic single line unstackable selectable table'
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Song</th>
            <th><i className='icon clock' /></th>
          </tr>
        </thead>
        <tbody>
          {
            album.tracks.map((track) => (
              <tr
                key={track.id}
              >
                <td>{track.trackNumber}</td>
                <td>{track.name}</td>
                <td>
                  {durationToHuman(track.durationMs)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default Album;
