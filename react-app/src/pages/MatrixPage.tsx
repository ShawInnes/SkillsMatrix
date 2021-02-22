import {FC, useEffect, useState} from "react";
import axios from "axios";
import {Container} from "@material-ui/core";
import {Matrix} from "../components/Matrix/Matrix";

export const MatrixPage: FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:5000/api/matrix/dashboard')
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
 

