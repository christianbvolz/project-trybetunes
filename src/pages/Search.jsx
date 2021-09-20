import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ search: value });
  }

  render() {
    const { search } = this.state;
    const minimumCharacter = 2;
    return (
      <div data-testid="page-search">
        <Header />
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
            // onClick={  }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
