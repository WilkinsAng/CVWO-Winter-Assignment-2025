import React, {useState} from "react";
import axios, {isAxiosError} from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LoginFormProps {
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    setUsername:  React.Dispatch<React.SetStateAction<string>>
    onSwitch:  React.Dispatch<React.SetStateAction<boolean>>
}
const LoginForm: React.FC = ({setIsAuthenticated, setUsername, onSwitch}) => {

    /**
     * State used to sign in
     */
    const [localUsername, setLocalUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", localUsername);
            setIsAuthenticated(true);
            setUsername(response.data.username);
            setMessage("Login Successful!");
        } catch (err: unknown){
            if (isAxiosError(err)) {
                setMessage(err.response?.data?.error);
            } else {
                setMessage("An unexpected error has occurred...");
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <TextField fullWidth
                       label="Username"
                       value={localUsername}
                       onChange={(e) => setLocalUsername(e.target.value)}
                       required
                       margin={"normal"}/>
            <Button type="submit" variant="contained" fullWidth>
                Login
            </Button>
            <p>{message}</p>
            <Typography>
                Don't have an account?
            </Typography>
            <Typography onClick={onSwitch}>
                Sign up
            </Typography>
        </form>
    );
}

export default LoginForm;