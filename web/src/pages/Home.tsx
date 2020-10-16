import React from 'react';
import logoImg from '../images/logo.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/pages/home.css';

function Home() {
  return (
    <div id="page-landing">
      <main className="page-wrapper">
        <Link to="/">
          <img src={logoImg} alt="Happy" />
        </Link>
        <div className="page-wrapper__text">
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </div>
        <div className="page-wrapper__location">
          <strong>Diadema</strong>
          <span>São Paulo</span>
        </div>
        
        <Link to="/app">
          <div className="page-wrapper__enter">
              <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </div>
        </Link>
      </main>
    </div>
  );
}

export default Home;