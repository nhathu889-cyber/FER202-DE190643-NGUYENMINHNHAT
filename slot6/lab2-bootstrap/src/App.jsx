import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import pizza1 from './assets/pizza1.jpg';
import pizza2 from './assets/pizza2.jpg';
import pizza3 from './assets/pizza3.jpg';
import pizza4 from './assets/pizza4.jpg';
import pizza5 from './assets/pizza5.jpg';

import menu1 from './assets/menu1.jpg';
import menu2 from './assets/menu2.jpg';
import menu3 from './assets/menu3.jpg';
import menu4 from './assets/menu4.jpg';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
        <a className="navbar-brand" href="#">Pizza House</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#menu">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-danger" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Banner */}
      <div className="hero">
        <img src={pizza5} alt="Pizza" className="w-100 hero-img" />
        <div className="hero-text">
          <h1>Neapolitan Pizza</h1>
          <p>
            If you are looking for traditional Italian pizza, the Neapolitan
            is the best option!
          </p>
        </div>
      </div>

      {/* Menu */}
      <section id="menu" className="container py-5">
        <h2 className="text-center mb-4">Our Menu</h2>

        <div className="row g-4">
          {[menu1, menu2, menu3, menu4].map((image, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100">
                <img
                  src={image}
                  className="card-img-top menu-img"
                  alt="Pizza menu"
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {index === 0
                      ? 'Margherita Pizza'
                      : index === 1
                      ? 'Mushroom Pizza'
                      : index === 2
                      ? 'Hawaiian Pizza'
                      : 'Pesto Pizza'}
                  </h5>

                  <p className="card-text">$40.00</p>

                  <button className="btn btn-dark w-100">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="contact" className="booking py-5">
        <div className="container">
          <h2 className="text-center text-white mb-4">
            Book Your Table
          </h2>

          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name *"
              />
            </div>

            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email *"
              />
            </div>

            <div className="col-md-4">
              <select className="form-select">
                <option>Select a Service</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </select>
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Please write your comment"
              ></textarea>
            </div>

            <div className="col-12">
              <button className="btn btn-warning">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;