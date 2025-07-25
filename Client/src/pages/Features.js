// src/pages/Features.js
import React from 'react';
import './Features.css';
import { FaChartBar, FaCloudUploadAlt, FaShieldAlt, FaRobot } from 'react-icons/fa';

const featuresList = [
  {
    icon: <FaChartBar />,
    title: 'Data Analysis',
    description: 'Analyze user-submitted files with advanced algorithms and export results.',
  },
  {
    icon: <FaCloudUploadAlt />,
    title: 'File Upload',
    description: 'Upload multiple formats including CSV, XLSX, and JSON with secure storage.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure Access',
    description: 'User authentication and role-based access to protect sensitive data.',
  },
  {
    icon: <FaRobot />,
    title: 'AI Integration',
    description: 'Integrate machine learning models for prediction and classification tasks.',
  },
];

const Features = () => {
  return (
    <div className="features-page">
      <h1>Platform Features</h1>
      <div className="features-grid">
        {featuresList.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
