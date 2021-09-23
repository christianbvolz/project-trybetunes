import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
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
  }

  async handleChange() {
    const { music } = this.props;
    const { checked } = this.state;
    this.setState({
      loading: true,
      checked: !(checked),
    });
    await addSong(music);
    this.setState({ loading: false });
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
        <label htmlFor={ trackName }>
          Favorita
          <input
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
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
