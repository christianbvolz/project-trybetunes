import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async fetchFavoriteSongs(action) {
    if (action) {
      this.setState({ loading: true });
    }
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesSongs,
    });
  }

  renderFavorites() {
    const { favoritesSongs } = this.state;
    return (
      <div>
        {favoritesSongs.map((music) => (
          <div key={ music.trackId }>
            <MusicCard fetchFavoriteSongs={ this.fetchFavoriteSongs } music={ music } />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {(loading) ? <Loading /> : this.renderFavorites()}
      </div>
    );
  }
}

export default Favorites;
