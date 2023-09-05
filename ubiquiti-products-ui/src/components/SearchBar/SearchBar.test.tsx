import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { Props } from './SearchBar';
import { devicesMock } from '@/lib/mocks/devicesMock';

const searchIndex = devicesMock?.map((device) => {
  return {
    item: device.product.name,
    lineText: device.line.name,
    iconId: device.icon.id,
    iconResolutions: device.icon.resolutions,
  };
});

const defaultProps: Props = {
  placeholder: 'placeholder text',
  searchIndex: searchIndex,
};

describe('SearchBar', () => {
  test('Placeholder text is displayed', () => {
    render(<SearchBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
  });

  test('Dropdown menu is displayed after user inputs a character', async () => {
    render(<SearchBar {...defaultProps} />);

    const searchBar = screen.getByPlaceholderText(defaultProps.placeholder);
    const dropdown = screen.getByTestId('SearchBar-dropdown');

    expect(dropdown).not.toHaveClass('dropdownRevealed');
    expect(dropdown).toHaveClass('dropdownHidden');

    await userEvent.type(searchBar, 'a');

    expect(dropdown).toHaveClass('dropdownRevealed');
    expect(dropdown).not.toHaveClass('dropdownHidden');
  });

  test('Dropdown menu is hidden after user deletes all inputted characters', async () => {
    render(<SearchBar {...defaultProps} />);

    const searchBar = screen.getByPlaceholderText(defaultProps.placeholder);
    const dropdown = screen.getByTestId('SearchBar-dropdown');

    expect(dropdown).not.toHaveClass('dropdownRevealed');
    expect(dropdown).toHaveClass('dropdownHidden');

    await userEvent.type(searchBar, 'a');

    expect(dropdown).toHaveClass('dropdownRevealed');
    expect(dropdown).not.toHaveClass('dropdownHidden');

    await userEvent.clear(searchBar);

    expect(dropdown).not.toHaveClass('dropdownRevealed');
    expect(dropdown).toHaveClass('dropdownHidden');
  });

  test('Clicking away from the dropdown menu and search bar closes the dropdown', async () => {
    render(
      <div data-testid="outsideOfSearchBar">
        <SearchBar {...defaultProps} />
      </div>,
    );

    const searchBar = screen.getByPlaceholderText(defaultProps.placeholder);
    const dropdown = screen.getByTestId('SearchBar-dropdown');

    expect(dropdown).not.toHaveClass('dropdownRevealed');
    expect(dropdown).toHaveClass('dropdownHidden');

    await userEvent.type(searchBar, 'a');

    expect(dropdown).toHaveClass('dropdownRevealed');
    expect(dropdown).not.toHaveClass('dropdownHidden');

    await userEvent.click(screen.getByTestId('outsideOfSearchBar'));

    expect(dropdown).not.toHaveClass('dropdownRevealed');
    expect(dropdown).toHaveClass('dropdownHidden');
  });

  test("Dropdown displays 'No Matches' if input doesn't match any devices", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchBar = screen.getByPlaceholderText(defaultProps.placeholder);

    devicesMock.forEach((device) => {
      expect(screen.queryAllByText(device.line.name)[0]).toBeTruthy();
    });

    const searchTerm = ';alkfja;lfj';

    const searchTermResults = devicesMock.filter((device) => {
      return device.product.name.includes(searchTerm);
    });

    //checks to see if searchTerm doesn't match any device name
    expect(searchTermResults).toHaveLength(0);

    await userEvent.type(searchBar, searchTerm);

    devicesMock.forEach((device) => {
      expect(screen.queryAllByText(device.line.name)[0]).toBeFalsy();
    });

    expect(screen.getByText('No Matches')).toBeInTheDocument();
  });

  test("Dropdown is populated with devices that match the user's input", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchBar = screen.getByPlaceholderText(defaultProps.placeholder);

    expect(screen.queryByText('airCube AC')).toBeTruthy();

    await userEvent.type(searchBar, 'airFiber X 3G26-S45 Antenna');

    expect(screen.queryByText('airCube AC')).toBeFalsy();
    expect(screen.queryByText('airFiber X 3G26-S45 Antenna')).toBeTruthy();
  });
});
