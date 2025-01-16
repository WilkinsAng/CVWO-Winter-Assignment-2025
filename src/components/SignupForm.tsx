import React, { useState } from "react";
import axios, {isAxiosError} from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface SignupFormProps {
    handleClose: () => void,
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    setUsername:  React.Dispatch<React.SetStateAction<string | null>>
    onSwitch: () => void
}
const SignupForm: React.FC<SignupFormProps> = ({handleClose, setIsAuthenticated, setUsername, onSwitch}) => {

    const [localUsername, setLocalUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/signup", {
                username: localUsername
            });
            setIsAuthenticated(true);
            setUsername(response.data.username);
            setMessage("Signup Successful!");
            handleClose();
        } catch (err: unknown){
            if (isAxiosError(err)) {
                setMessage(err.response?.data?.error);
            } else {
                setMessage("An unexpected error has occurred...");
            }
        }
    };
    return (
        <form onSubmit={handleSignup}>
            <TextField
                fullWidth
                label="Username"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth>
                Sign Up
            </Button>
            <p>{message}</p>
            <Typography>
                Already have an account?
            </Typography>
            <Typography
                onClick={() => onSwitch()}
                variant="body2"
                component="span"
                sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                }}
            >
                Login
            </Typography>
        </form>
    );
};

export default SignupForm;