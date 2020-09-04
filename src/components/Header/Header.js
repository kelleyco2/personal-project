import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import { connect } from "react-redux";
import { clientLoggedOut, resetCart, getCart } from "../../ducks/reducer";

class Header extends Component {
  logout = () => {
    axios.get("/auth/logout").then((res) => {
      this.props.clientLoggedOut();
    });
    this.props.resetCart();
  };

  render() {
    return (
      <header>
        <div className="header-nav">
          <Link to="/" className="linkHome">
            MM
          </Link>
          <Link to="/information" className="link">
            Information
          </Link>
        </div>

        {/* <Link to='/products' className='link'>Products</Link>
                <div>
                    {this.props.isAuthenticated ? 
                        <Link to='/login' className='link' onClick={this.logout}>Logout</Link> :
                        <Link to='/login' className='link'>Login | Register</Link>
                    }
                </div>

                    {this.props.isAdmin ?
                        <Link to='/orders' className='link'>Orders</Link> 
                        :
                        <Link to='/cart' className='link'>
                            <i class="fas fa-shopping-cart"></i> {this.props.cart.length}
                        </Link>
                    } */}

        {/* <a
          className="w3-hide-small"
          target="_blank"
          style={{
            backgroundColor: "#FCDBDB",
            color: "black",
            textDecoration: "none",
            height: "40px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            lineHeight: "38px",
            padding: "0 28px",
            borderRadius: "3px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
          }}
          href="https://squareup.com/appointments/book/EYR4MTRG6QT3E/my-business"
          rel="noopener noreferrer"
        >
          Book Now!
        </a> */}

        <i
          className="fa fa-bars"
          aria-hidden="true"
          onClick={this.props.mobileNav}
        />
      </header>
    );
  }
}

function mapStateToProps(state) {
  let { isAuthenticated, client, cart, isAdmin } = state;
  return {
    isAuthenticated,
    client,
    cart,
    isAdmin,
  };
}

export default connect(
  mapStateToProps,
  { clientLoggedOut, resetCart, getCart }
)(Header);
