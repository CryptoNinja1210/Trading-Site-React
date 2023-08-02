import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useSelector } from 'react-redux';

const NavbarComponent = () => {

  const {isAuthenticated} = useSelector(({auth}) => auth)

  const authLinks = (
    <ul>
      <li>
        <Link to="/websocketdata">WebSocketData</Link>
      </li>
      <li>
        <Link to="/market-data">Stocks</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout}>
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h4>
        <Link to="/" className='d-flex align-items-center'>
          <img src='/favicon.ico' alt='vite_logo' style={{height:"24px", width:"24px"}}/>
          
          <span className='devconnector'>StockScreener</span>
        </Link>
      </h4>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default NavbarComponent
// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logout })(NavbarComponent);
