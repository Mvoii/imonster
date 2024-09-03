import React from "react";
import { Typography, Container } from "@mui/material";
import { useLocation, Navigate } from "react-router-dom";

interface LocationState {
    name: string;
    age: number;
}

const HomePage: React.FC = () => {
    const location = useLocation();
    const { name, age } = location.state || { name: "", age: 0 };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Welcome, {name}!
            </Typography>
            <Typography variant="h6" align="center">
                You are {age} years old.
            </Typography>
        </Container>
    );
};

export default HomePage;
