import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Event from '../components/Event';
// Adjust the import path as necessary
import { getEvents } from '../api'; // Adjust the import path as necessary

// Group all tests related to the Event component
describe('Event component', () => {
  let allEvents;
  let container;

  // Fetch all events before running any tests
  beforeAll(async () => {
    allEvents = await getEvents();
  });

  // Render the Event component before each test
  beforeEach(() => {
    const { container: renderContainer } = render(<Event event={allEvents[0]} />);
    container = renderContainer;
  });

  // Test case to check if the event title is rendered correctly
  test('renders event title', async () => {
    const eventTitle = container.querySelector('.event-title');
    expect(eventTitle).toBeInTheDocument();
    expect(eventTitle.textContent).toBe(allEvents[0].summary);
  });

  // Test case to check if the event start time is rendered correctly
  test('renders event start time', async () => {
    const eventStartTime = container.querySelector('.event-start-time');
    expect(eventStartTime).toBeInTheDocument();
    expect(eventStartTime.textContent).toBe(allEvents[0].created);
  });

  // Test case to check if the event location is rendered correctly
  test('renders event location', async () => {
    const eventLocation = container.querySelector('.event-location');
    expect(eventLocation).toBeInTheDocument();
    expect(eventLocation.textContent).toBe(allEvents[0].location);
  });

  // Test case to check if the "Show Details" button is rendered correctly
  test('renders show details button', async () => {
    const showDetailsButton = container.querySelector('.show-details-btn');
    expect(showDetailsButton).toBeInTheDocument();
  });

  // Test case to check if the event details are shown when "Show Details" button is clicked
  test('shows event details when "Show Details" button is clicked', async () => {
    // Find the "Show Details" button and simulate a click event
    const showDetailsButton = container.querySelector('.show-details-btn');
    fireEvent.click(showDetailsButton);

    // Check if the event details section is rendered
    const eventDetails = container.querySelector('.event-details');
    expect(eventDetails).toBeInTheDocument();

    // Check if the "Hide Details" button is rendered
    const hideDetailsButton = container.querySelector('.hide-details-btn');
    expect(hideDetailsButton).toBeInTheDocument();
  });

  // Test case to check if the event details are hidden when "Hide Details" button is clicked
  test('hides event details when "Hide Details" button is clicked', async () => {
    // Find the "Show Details" button and simulate a click event to show details
    const showDetailsButton = container.querySelector('.show-details-btn');
    fireEvent.click(showDetailsButton);

    // Find the "Hide Details" button and simulate a click event to hide details
    const hideDetailsButton = container.querySelector('.hide-details-btn');
    fireEvent.click(hideDetailsButton);

    // Check if the event details section is not rendered
    const eventDetails = container.querySelector('.event-details');
    expect(eventDetails).not.toBeInTheDocument();

    // Check if the "Show Details" button is rendered again
    expect(showDetailsButton).toBeInTheDocument();
  });
});