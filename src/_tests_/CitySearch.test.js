import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';

jest.mock('../api', () => ({
  getEvents: jest.fn(() => Promise.resolve(mockEvents)),
  extractLocations: jest.fn((events) => mockLocations),
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

const mockLocations = [
  'Berlin, Germany',
  'Munich, Germany',
  'Hamburg, Germany',
  // Add more mock locations here
];

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={mockLocations} />);
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const suggestions = mockLocations.filter((location) =>
      location.toUpperCase().includes('BERLIN')
    );

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // Account for the "See all cities" item
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
    expect(suggestionListItems[suggestions.length].textContent).toBe('See all cities');
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});