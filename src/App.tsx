import {useState, useEffect} from 'react';
import './App.css';
import TopBar from "./components/TopBar";
import HomePage from "./components/FrontPages/HomePage";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import theme from "./styles/theme";
import MyThreadsPage from "./components/MyPage/MyThreads";
import MyCommentsPage from "./components/MyPage/MyComments";
import Box from "@mui/material/Box";

function App() {
    /**
     * State used for username display
     *
     * ! might put this on the main app component then pass it down
     */
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
                <TopBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username}  setUsername={setUsername} />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/my-threads" element={<MyThreadsPage/>}/>
                    <Route path="/my-comments" element={<MyCommentsPage/>}/>
                    {/* Placeholder for future routes */}



                    {/* Add Thread Details Page */}
                    {/* <Route path="/threads/:id" element={<ThreadDetailsPage />} /> */}

                    {/* Add Login and Signup Pages */}
                    {/* <Route path="/login" element={<LoginPage />} /> */}
                    {/* <Route path="/signup" element={<SignupPage />} /> */}
                </Routes>
                </Box>
            </Router>
        </ThemeProvider>
);
}

export default App;
