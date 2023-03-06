import "../styles/homepage.css";
import Header_image from "../images/header-image.png";
import Service from "../images/services.png";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div id="homepage-container">
      <header id="header-home">
        <h1 id="website-name">
          Folio<span>flow</span>.
        </h1>
        <span id="links">
          <a href="#services">SERVICES</a>
          <a href="#pre-test">TESTIMONIALS</a>
          <a href="#about">ABOUT</a>
          <a href="#footer">CONTACT</a>
          <a>
            <NavLink to="/login">LOGIN</NavLink>
          </a>
          <a>
            <NavLink to="/sign">SIGN UP</NavLink>
          </a>
        </span>
      </header>
      <section>
        <div className="row welcome">
          <div>
            <h1>
              Elevate Your Professional Profile:
              <br />
              Build Your Portfolio with Ease
            </h1>
            <p>
              Looking to showcase your professional achievements and take your
              career to new heights? Look no further than our portfolio
              application! Designed with professionals like you in mind, our
              platform offers a seamless way to create and customize your own
              portfolio.
            </p>
            <button>
              Start a new Project Today
              <i className="material-icons">arrow_forward</i>
            </button>
          </div>
          <div>
            <img id="header-img" src={Header_image}></img>
          </div>
        </div>
        <div id="services" className="row services">
          <div id="services-img">
            <img src={Service} />
          </div>
          <span>
            <h1 id="services-title">
              Unleash Your Potential with Our Comprehensive Services
            </h1>
          </span>
          <div className="service">
            {/* <div id="services-offered">
              <div className="service-card right">
                <h3>01</h3>
                <p>Easily create and update your projects</p>
              </div>
              <div className="service-card center">
                <h3>02</h3>
                <p>Work showcases</p>
              </div>
              <div className="service-card left">
                <h3>03</h3>
                <p>Skills showcases</p>
              </div>
            </div> */}
          </div>
        </div>
        <span id="pre-test"></span>
        <div id="testimonials">
          <h1>
            Testimonials<span>.</span>
          </h1>
          <div id="comments-container">
            <div className="comment left">
              <p>
                "Thanks to this app, I now have a stunning online portfolio that
                has helped me attract new clients and opportunities. It's been a
                game-changer for my business."
              </p>
              <span>
                <span className="pfp-one" id="pfp"></span>
                <span id="details">
                  <h6>Grace Lee</h6>
                  <h6>Entrepenuer</h6>
                </span>
              </span>
            </div>
            <div className="comment centre">
              <p>
                "I've tried other portfolio apps before, but this one stands out
                for its user-friendly interface and range of customization
                options. Highly recommend!"
              </p>
              <span>
                <span className="pfp-two" id="pfp"></span>
                <span id="details">
                  <h6>Benjamin Nguyen</h6>
                  <h6>Designer</h6>
                </span>
              </span>
            </div>
            <div className="comment right">
              <p>
                "I really appreciate the expert guidance and support provided by
                the team behind this app. They went above and beyond to help me
                create a portfolio that truly represents me and my work."
              </p>
              <span>
                <span className="pfp-three" id="pfp"></span>
                <span id="details">
                  <h6>Ava Brown</h6>
                  <h6>Marketing Manager</h6>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div id="about">
          <h1>
            About Us<span>.</span>
          </h1>
          <div id="about-par">
            <p>
              "Our portfolio application was created with the mission of
              empowering professionals to showcase their work in the best
              possible light. We believe that everyone deserves the chance to
              share their talents and accomplishments with the world, and our
              user-friendly platform makes that possible.We're dedicated to
              providing a seamless and stress-free experience for our users, and
              we're proud to help people elevate their professional profiles and
              achieve their career goals.
            </p>
          </div>
        </div>
        <footer id="footer"></footer>
      </section>
    </div>
  );
}
export default Homepage;
