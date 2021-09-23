import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      loading: true,
    };
    this.fetchMusics = this.fetchMusics.bind(this);
    this.renderMusics = this.renderMusics.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      album,
      loading: false,
    });
  }

  renderMusics() {
    const { album } = this.state;
    const { artistName, collectionName } = album[0];
    const musics = album.filter((_item, index) => index !== 0);
    return (
      <div>
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        <div>
          {musics.map((music) => (
            <div key={ music.trackId }>
              <MusicCard music={ music } />
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { (loading) ? <Loading /> : this.renderMusics() }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
