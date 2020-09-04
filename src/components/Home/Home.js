import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppointmentInfo from "../AppointmentInfo/AppointmentInfo";
import { connect } from "react-redux";
import { clientLoggedOut, resetCart } from "../../ducks/reducer";

import "./Home.css";
import Axios from "axios";

class Home extends Component {
  logout = () => {
    Axios.get("/auth/logout").then((res) => {
      this.props.clientLoggedOut();
    });
    this.props.resetCart();
  };

  render() {
    return (
      <div id="home" className="home">
        {/* <div className="logo">
          <Link to="/" className="logoLink">
            <p>Modern Makeup</p>
          </Link>
        </div> */}

        <div className="heroImage">
          <div className="heroImageStuff">
            <h1>Modern Makeup</h1>
            <p>Book your appointment today!</p>

            {/* <Link to="/products">
              <button
                style={{
                  fontSize: "20px",
                }}
                className="w3-btn w3-black w3-hide-small"
              >
                SHOP NOW
              </button>
            </Link> */}
            <a
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
                border: "1px solid black",
              }}
              href="https://squareup.com/appointments/book/EYR4MTRG6QT3E/my-business"
              rel="noopener noreferrer"
            >
              Book Now!
            </a>
          </div>
        </div>

        <div className="info">
          <AppointmentInfo />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { isAdmin, isAuthenticated, cart } = state;
  return {
    isAdmin,
    isAuthenticated,
    cart,
  };
}

export default connect(
  mapStateToProps,
  { clientLoggedOut, resetCart }
)(Home);
