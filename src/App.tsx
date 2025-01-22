import {useState} from 'react';
import './App.css';
import TopBar from "./components/TopBar";
import HomePage from "./components/HomePage";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import theme from "./styles/theme";

function App() {
    /**
     * State used for username display
     *
     * ! might put this on the main app component then pass it down
     */
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    const handleLogin = (user: string) => {
        setUsername(user);
        setIsAuthenticated(true);
    }

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <TopBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username}  setUsername={setUsername} />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    {/* Placeholder for future routes */}
                    {/* Add My Threads Page */}
                    {/* <Route path="/my-threads" element={<MyThreadsPage />} /> */}

                    {/* Add Thread Details Page */}
                    {/* <Route path="/threads/:id" element={<ThreadDetailsPage />} /> */}

                    {/* Add Login and Signup Pages */}
                    {/* <Route path="/login" element={<LoginPage />} /> */}
                    {/* <Route path="/signup" element={<SignupPage />} /> */}
                </Routes>
            </Router>
        </ThemeProvider>
);
}

export default App;
