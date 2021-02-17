import {
    Button,
    ButtonGroup, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import * as _ from "lodash";

import mockData from "./MatrixData.json";
import {MatrixCell} from "../MatrixCell/MatrixCell";

export interface MatrixProps {
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export const Matrix: React.FC<MatrixProps> = ({}) => {
    const [data, setData] = useState<any>([]);
    const [people, setPeople] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const classes = useStyles();

    const getValue = (person: string, skillName: string) => {
        const list: any[]= _.filter(data, {'person': person, 'skillName': skillName});
        if (list.length === 1) {
            return list[0].skillLevel;
        }

        return "";
    };

    useEffect(() => {
        setData(mockData);
        setPeople(_.uniq(_.map(mockData, 'person')));
        setSkills(_.uniq(_.map(mockData, 'skillName')));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Technology</TableCell>
                        {_.orderBy(people).map((person, personIndex) => {
                            return (<TableCell key={personIndex}>{person}</TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.orderBy(skills).map((skillName, skillIndex) => {
                        return (
                            <TableRow key={skillIndex}>
                                <TableCell>{skillName}</TableCell>
                                {_.orderBy(people).map((person, personIndex) => {
                                    return (<TableCell key={personIndex}><MatrixCell skillLevel={getValue(person, skillName)}/></TableCell>)
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
