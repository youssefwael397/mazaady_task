import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MazaadySelectInput, RenderOptions } from '../comps/Inputs';

describe('MazaadySelectInput', () => {
  it('renders with a label', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const { getByText } = render(
      <MazaadySelectInput items={items} value="" label="Test Label" />
    );

    // Check if label is rendered
    expect(getByText('Test Label')).toBeInTheDocument();
  });
});
