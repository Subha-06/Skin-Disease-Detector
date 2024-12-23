import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">SkinDetect</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload Image</Link></li>
          <li><Link to="/diseases">Common Diseases</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="homepage" id="home">
        <header className="homepage-header">
          <h1>Welcome to SkinDetect</h1>
          <p>Revolutionizing skin health with advanced image detection technology.</p>
          <Link to="/upload">
            <button className="upload-button" id="upload">Upload Image</button>
          </Link>
        </header>

        {/* Our Process Section */}
        <div className="box-container">
          <section className="homepage-section" id="process">
            <h2>Our Process</h2>
            <p>
              Our skin disease detection service uses cutting-edge AI technology to
              analyze your skin condition and provide accurate results. Simply upload
              an image, and our system will do the rest.
            </p>
            <p>
              Our process is fast, reliable, and secure, ensuring your privacy is
              always protected.
            </p>
          </section>
        </div>

        {/* Benefits Section */}
        <div className="box-container">
          <section className="homepage-benefits">
            <h2>Benefits of SkinDetect</h2>
            <ul>
              <li>Early detection of common skin diseases, increasing treatment success rates.</li>
              <li>Enhanced predictive accuracy for a diverse range of skin diseases, ensuring inclusivity across different skin types and conditions.</li>
              <li>Non-invasive and easy-to-use platform.</li>
              <li>Accessible from the comfort of your home.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
