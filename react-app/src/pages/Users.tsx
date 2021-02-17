import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "@material-ui/core";
import * as _ from "lodash";
import {Matrix} from "../components/Matrix/Matrix";

export const Users: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://localhost:5001/api/matrix/dashboard')
            .then(response => {
                setData(response.data);
            });
    }, []);

    return (
        <Container>
            <h2>Skills Matrix</h2>
            <Matrix/>
        </Container>
    )
};
 

