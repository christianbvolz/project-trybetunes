import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = await getUser();
    const { name } = user;
    if (name) {
      this.setState({
        userName: name,
        loading: false,
      });
    }
  }

  renderUser() {
    const { userName } = this.state;
    return <p data-testid="header-user-name">{ userName }</p>;
  }

  render() {
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {(loading) ? <Loading /> : this.renderUser()}
      </header>
    );
  }
}

export default Header;
