import React from 'react';
import {render, screen} from '@testing-library/react';
import {MatrixCell} from './MatrixCell';
import {SkillLevel} from "models";

test('renders learn react link', () => {
    render(<MatrixCell skillLevel={SkillLevel.Proficient}/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
