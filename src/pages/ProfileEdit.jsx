import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      btn: true,
    };
    this.renderProfile = this.renderProfileEdit.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange({ target: { value, id } }) {
    const { name, email, image, description } = this.state;
    if (name && email && image && description) {
      console.log('oi1');
      this.setState({ btn: false });
    } else {
      console.log('oi2');
      this.setState({ btn: true });
    }
    this.setState({
      [id]: value,
      user: '',
    });
  }

  async fetchUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  }

  renderProfileEdit() {
    const { user: { name, email, image, description }, btn } = this.state;
    const {
      name: name1,
      email: email1,
      image: image1,
      description: description1,
    } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            data-testid="edit-input-name"
            value={ (name1) || name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            data-testid="edit-input-email"
            value={ (email1) || email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="edit-input-description"
            value={ (description1) || description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="image">
          Imagem:
          <input
            id="image"
            type="text"
            data-testid="edit-input-image"
            value={ (image1) || image }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ btn }
        >
          Salvar
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {(loading) ? <Loading /> : this.renderProfileEdit() }
      </div>
    );
  }
}

export default ProfileEdit;
