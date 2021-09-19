import React from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ name: value });
  }

  async setUser() {
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser(this.state);
    history.push('search');
  }

  renderForm() {
    const { name } = this.state;
    const minimumCharacter = 3;
    return (
      <form>
        <label htmlFor="name">
          <input
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ (name.length < minimumCharacter) }
          onClick={ this.setUser }
        >
          Entrar
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        {(loading) ? <Loading /> : this.renderForm()}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
