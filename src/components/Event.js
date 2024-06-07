import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2 className="event-title">{event.summary}</h2>
      <p className="event-start-time">{event.created}</p>
      <p className="event-location">{event.location}</p>
      <button className="show-details-btn" onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
          <button className="hide-details-btn" onClick={handleToggleDetails}>
            Hide Details
          </button>
        </div>
      )}
    </li>
  );
};

export default Event;