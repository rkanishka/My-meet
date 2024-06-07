import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // Import the NumberOfEvents component
import './App.css';

const App = () => {
  return (
    <div className="App">
      <CitySearch id="city-search" />
      <NumberOfEvents id="number-of-events" /> {/* Add the NumberOfEvents component */}
      <EventList id="event-list" />
    </div>
  );
}

export default App;