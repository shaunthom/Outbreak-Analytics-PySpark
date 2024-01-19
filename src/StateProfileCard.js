import React, { useState } from 'react';
import './StateProfileCard.css';
import combinedDiseaseData from './combined_frequent_disease_per_state.json';

const StateProfileCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % combinedDiseaseData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + combinedDiseaseData.length) % combinedDiseaseData.length);
  };

  const { State, Diseases } = combinedDiseaseData[currentIndex];

  return (
    <div className="state-profile-card">
      <button onClick={handlePrev}>&lt;</button>
      <div className="profile-details">
        <div className="profile-header">
          <h2>State Health Profile</h2>
          <div className="state-name">{State}</div>
        </div>
        <h3>Top Diseases (2022):</h3>
        <ul>
          {Diseases.map((disease, index) => (
            <li key={index}>{index + 1}. {disease.Label} - Cases: {disease['Total Cases']}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default StateProfileCard;
