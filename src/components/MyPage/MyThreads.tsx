import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Threads from "../../models/threads";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ThreadDetailsPage from "../FrontPages/ThreadDetailsPage";
import UpdateThreadForm from "./UpdateThreadForm";
import Categories from "../../models/categories";
import MyThreadCard from "./MyThreadCard";

const MyThreadsPage: React.FC = () => {
    const [threads, setThreads] = useState<Threads[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [threadOpen, setThreadOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState<Threads | null>(null)

    const [categories, setCategories] = useState<Categories[]>([]);
    const [catError, setCatError] = useState<string | null>(null);

    // Fetch categories when component loads
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((res) => {
                setCategories(res.data.categories);
                setCatError(null);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setCatError(err);
            });
    }, []);

    const handleThreadOpen = (thread: Threads) => {
        setThreadOpen(true);
        setSelectedThread(thread);
    }

    const handleThreadClose = () => {
        setSelectedThread(null);
        setThreadOpen(false);
    }

    const handleUpdateThreadOpen = (thread: Threads) => {
        setUpdateOpen(true);
        setSelectedThread(thread);
    }
    const handleUpdateThreadClose= () => {
        setUpdateOpen(false);
        setSelectedThread(null);
    }

    const onUpdateSuccess = (updatedThread: Threads) => {
        setThreads((prevThreads) =>
            prevThreads.map((thread) =>
                thread.id === updatedThread.id ? updatedThread : thread
            )
        );
    }

    let userID = localStorage.getItem("userID");
    useEffect(() => {
        if (userID == null) {
            setThreads([]);
            return
        }
        axios.get(`${process.env.REACT_APP_API_URL}/users/${userID}/threads`)
            .then((res) => {
                if (res.data.threads == null){
                    setThreads([]);
                    return
                }
                setThreads(res.data.threads);
            })
            .catch((error) => {
                setError(error.response?.data?.error);
                console.error("Error fetching threads:", error)
            });
    }, [userID]);

    const handleDeleteThread = (threadId: number) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/threads/${threadId}`,
            {
                headers: {
                    "userID": userID,
                    "Content-Type": "application/json"
                }})
            .then(() => setThreads(threads.filter((thread) => thread.id !== threadId)))
            .catch((error) => console.error("Error deleting thread:", error));
    };

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Threads
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Here is what you have started so far!
            </Typography>
            {threads.length === 0 ? (
                <Alert severity="info">No threads found. Start creating some!</Alert>
            ) : (
                threads.map((thread) => (
                    <MyThreadCard
                        thread={thread}
                        categories={categories}
                        handleDeleteThread={handleDeleteThread}
                        handleThreadOpen={handleThreadOpen}
                        handleUpdateThreadOpen={handleUpdateThreadOpen}/>
                ))
            )}
            <ThreadDetailsPage
                threadOpen={threadOpen}
                handleCloseDialog={handleThreadClose}
                selectedThread={selectedThread}
                categories={categories}/>

            <UpdateThreadForm
                updateOpen={updateOpen}
                handleUpdateThreadClose={handleUpdateThreadClose}
                selectedThread={selectedThread}
                onUpdateSuccess={onUpdateSuccess}/>
        </Box>
    );
};

export default MyThreadsPage;
