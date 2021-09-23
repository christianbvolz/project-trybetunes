import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.renderProfile = this.renderProfile.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  }

  renderProfile() {
    const { user: { name, email, image, description } } = this.state;
    return (
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <img
          src={ image }
          alt={ name }
          data-testid="profile-image"
        />
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {(loading) ? <Loading /> : this.renderProfile() }
      </div>
    );
  }
}

export default Profile;
