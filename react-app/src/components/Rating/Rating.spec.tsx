import React from 'react';
import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';

test('renders learn react link', () => {
    render(<Rating />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
