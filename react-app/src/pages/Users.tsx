import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "@material-ui/core";
import * as _ from "lodash";
import {MatrixCell} from "../components/MatrixCell/MatrixCell";

export const Users: React.FC = () => {
    const [data, setData] = useState([]);
    const [people, setPeople] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://localhost:5001/api/matrix/dashboard')
            .then(response => {
                setData(response.data);
                setPeople(_.uniq(_.map(response.data, 'person')));
                setSkills(_.uniq(_.map(response.data, 'skillName')));
            });
    }, []);

    const getValue = (person: string, skillName: string) => {
        const list: any[]= _.filter(data, {'person': person, 'skillName': skillName});
        if (list.length === 1) {
            return list[0].skillLevel;
        }

        return "";
    };

    return (
        <Container>
            <h2>Skills Matrix</h2>
            <table>
                <thead>
                <tr>
                    <th>Skill</th>
                    {_.orderBy(people).map((person, personIndex) => {
                        return (<th key={personIndex}>{person}</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {_.orderBy(skills).map((skillName, skillIndex) => {
                    return (
                        <tr key={skillIndex}>
                            <td>{skillName}</td>
                            {_.orderBy(people).map((person, personIndex) => {
                                return (<td key={personIndex}><MatrixCell skillLevel={getValue(person, skillName)}/></td>)
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Container>
    )
};
 

