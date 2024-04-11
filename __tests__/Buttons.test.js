import { render, screen } from '@testing-library/react';
import { MainBtn, FollowBtn } from '../comps/Buttons'; // Adjust the import path as per your project structure
import '@testing-library/jest-dom';

describe('MainBtn', () => {
  it('renders with icon and label', () => {
    render(<MainBtn icon="icon" label="Button Label" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('icon');
    expect(button).toHaveTextContent('Button Label');
  });

  // Add more test cases as needed...
});

describe('FollowBtn', () => {
  it('renders with label', () => {
    render(<FollowBtn label="Follow" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Follow');
  });

  // Add more test cases as needed...
});
