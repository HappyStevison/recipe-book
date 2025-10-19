// In src/components/RecipeCard.test.tsx

import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

// A "describe" block groups related tests together
describe('RecipeCard Component', () => {

  // An "it" or "test" block is an individual test
  it('renders the title and description correctly', () => {
    // 1. Arrange: Set up the test data and render the component
    const testProps = {
      title: 'Test Recipe Title',
      description: 'This is a test description.',
      onDelete: () => {}, // Provide a mock function for the onDelete prop
    };

    render(<RecipeCard {...testProps} />);

    // 2. Act: (No user action needed for this test, we're just checking the initial render)

    // 3. Assert: Check if the expected content is on the screen
    expect(screen.getByText('Test Recipe Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('renders a delete button', () => {
    const testProps = {
      title: 'Another Recipe',
      description: 'Another description.',
      onDelete: () => {},
    };

    render(<RecipeCard {...testProps} />);

    // Check if a button with the text "Delete" is present
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
});