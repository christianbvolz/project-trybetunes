import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.renderMusic = this.renderMusic.bind(this);
    this.handleClick = this.handleChange.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async handleChange() {
    const { music, fetchFavoriteSongs } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      await removeSong(music);
      if (fetchFavoriteSongs) fetchFavoriteSongs(true);
    } else {
      await addSong(music);
    }
    this.setState(() => ({
      loading: false,
      checked: !(checked),
    }));
  }

  async fetchFavoriteSongs() {
    const { music: { trackId } } = this.props;
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      checked: favoritesSongs.some((song) => song.trackId === trackId),
    });
  }

  renderMusic() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { checked } = this.state;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ checked }
            onChange={ () => this.handleChange() }
          />
        </label>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { (loading) ? <Loading /> : this.renderMusic() }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  fetchFavoriteSongs: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

MusicCard.defaultProps = {
  fetchFavoriteSongs: false,
};
