import React from 'react';
import { render, screen } from '@testing-library/react';
import { Matrix } from './Matrix';

test('renders learn react link', () => {
    render(<Matrix />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
