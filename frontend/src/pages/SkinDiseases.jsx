import { Link } from "react-router-dom";
import "../index.css";
import "../App.css";
import { useState } from "react";

function Diseases() {
  const [expandedCard, setExpandedCard] = useState(null);

  const diseases = [
    {
      name: "Acne",
      description: "A common skin condition that occurs when hair follicles become clogged with oil and dead skin cells, often resulting in pimples, blackheads, whiteheads, or cysts.",
      causes: "Hormonal changes, genetics, stress, or diet can trigger acne.",
      symptoms: "Inflammation, redness, and lesions, typically on the face, chest, and back.",
      treatment: "Over-the-counter treatments (benzoyl peroxide, salicylic acid), prescription medications, or specialized skincare regimens.",
    },
    {
      name: "Carcinoma",
      description: "A type of skin cancer originating in the epithelial cells. Two common types are basal cell carcinoma (BCC) and squamous cell carcinoma (SCC).",
      causes: "Prolonged exposure to ultraviolet (UV) radiation from the sun or tanning beds.",
      symptoms: "Unusual growths, sores that don’t heal, or changes in existing moles.",
      treatment: "Surgical removal, cryotherapy, radiation, or topical medications, depending on the severity.",
    },
    {
      name: "Eczema",
      description: "A group of conditions causing inflamed, itchy, cracked, and rough skin. Atopic dermatitis is the most common form.",
      causes: "Genetic predisposition, environmental factors, or immune system dysfunction.",
      symptoms: "Redness, swelling, and intense itching, often on hands, face, and inside the elbows.",
      treatment: "Moisturizers, corticosteroid creams, antihistamines, or immunosuppressive drugs.",
    },
    {
      name: "Keratosis",
      description: "A condition characterized by overgrowth or thickening of keratin on the skin. Common types include actinic keratosis and seborrheic keratosis.",
      causes: "Prolonged sun exposure, aging, or genetic predisposition.",
      symptoms: "Rough, scaly patches (actinic) or brown/black growths (seborrheic) on the skin.",
      treatment: "Cryotherapy, laser therapy, or topical treatments.",
    },
    {
      name: "Milia",
      description: "Small, white cysts that form when keratin gets trapped beneath the surface of the skin.",
      causes: "Skin trauma, burns, or clogging of sweat ducts. They are also common in newborns.",
      symptoms: "Tiny, white, pearl-like bumps, often found around the eyes, cheeks, or forehead.",
      treatment: "Usually harmless and resolves on its own, but can be removed through minor dermatological procedures if needed.",
    },
    {
      name: "Rosacea",
      description: "A chronic skin condition causing redness and visible blood vessels, often accompanied by small, red, pus-filled bumps.",
      causes: "Genetic factors, immune system abnormalities, or environmental triggers like sun exposure, spicy foods, or alcohol.",
      symptoms: "Persistent facial redness, swollen skin, and sometimes eye irritation (ocular rosacea).",
      treatment: "Topical or oral antibiotics, laser therapy, or lifestyle modifications to avoid triggers.",
    },
  ];

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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

      {/* Diseases Page Content */}
      <div className="diseases-page">
        <header className="diseases-header">
          <h1>Common Skin Diseases</h1>
          <p>Learn more about common skin conditions and their symptoms by clicking them.</p>
        </header>
        <div className="disease-cards">
          {diseases.map((disease, index) => (
            <div
              className={`disease-card ${
                expandedCard === index ? "expanded" : ""
              }`}
              key={index}
              onClick={() => toggleCard(index)}
            >
              <h2>{disease.name}</h2>
              {expandedCard === index ? (
                <div className="details">
                  <p><strong>Description:</strong> {disease.description}</p>
                  <p><strong>Causes:</strong> {disease.causes}</p>
                  <p><strong>Symptoms:</strong> {disease.symptoms}</p>
                  <p><strong>Treatment:</strong> {disease.treatment}</p>
                </div>
              ) : (
                <p className="description">{disease.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diseases;
