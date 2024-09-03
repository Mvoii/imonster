import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age++;
        };
        return age;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const age = calculateAge(dob);

        if (age < 18) {
            setError("Hah! nice try kid, 18 years old to sign up.");
            return;
        };
        if (age > 50) {
            setError("Sorry mahn, you're too old for this... have you tried facebook?");
        };
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, dob, password }),
            });

            if (response.ok) {
                navigate("/home", { state: { name, age } });
            } else {
                setError("Invalid credentials!\nYou lie, you're not " + name+ "\nI'm calling the police");
            }
        } catch (error) {
            setError("An error occurred\nThis is on our side... Note i didn't say our fault so try again later");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Login to imonster
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            {error && (
                <Typography /*variant="body1"*/ color="error" align="center" style={{ marginTop: '1rem' }}>
                    {error}
                </Typography>
            )}
        </Container>
    );
};

export default LoginPage;
