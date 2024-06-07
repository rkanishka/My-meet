import { render } from '@testing-library/react';
import EventList from '../components/EventList';

jest.mock('../api', () => ({
  getEvents: jest.fn(() => Promise.resolve(mockEvents)),
}));

const mockEvents = [
  {
    id: 1,
    name: 'Event 1',
    city: 'Berlin, Germany',
    // Add other event properties as needed
  },
  {
    id: 2,
    name: 'Event 2',
    city: 'Munich, Germany',
    // Add other event properties as needed
  },
  // Add more mock events as needed
];

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList events={mockEvents} />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', () => {
    const listItems = EventListComponent.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockEvents.length);
  });
});