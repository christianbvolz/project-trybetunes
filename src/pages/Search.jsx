import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: true,
      first: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchAlbums = this.fetchAlbums.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ search: value });
  }

  async fetchAlbums() {
    const { search } = this.state;
    this.setState({
      search: '',
      loading: false,
      artist: search,
    });
    const album = await searchAlbumsAPI(search);
    this.setState({
      loading: true,
      result: album,
      first: false,
    });
  }

  renderSearch() {
    const { result, artist, first } = this.state;
    if (first) {
      return this.renderForm();
    }
    return (
      <>
        {this.renderForm()}
        {this.renderResult(artist, result)}
      </>
    );
  }

  renderResult(artist, result) {
    if (result.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div>
        <p>{`Resultado de álbuns de: ${artist}`}</p>
        <ul>
          {result.map(({ collectionId, artistName, collectionName }) => (
            <li key={ collectionId }>
              { collectionName }
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                {artistName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderForm() {
    const { search } = this.state;
    const minimumCharacter = 2;
    return (
      <form>
        <label htmlFor="input-search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ search.length < minimumCharacter }
          onClick={ this.fetchAlbums }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {(loading) ? this.renderSearch() : <Loading />}
      </div>
    );
  }
}

export default Search;
