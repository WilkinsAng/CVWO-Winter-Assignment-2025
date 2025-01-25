import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../../models/categories";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Threads from "../../models/threads";

interface CreateThreadProps {
    categories: Categories[];
    open: boolean;
    onClose: () => void;
    onCreateSuccess: (thread: Threads) => void;
}
const CreateThreadForm: React.FC<CreateThreadProps> = ({categories, open, onClose, onCreateSuccess}) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [categoryID, setCategoryID] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleCreateThread = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") {
            setError("Title cannot be empty.");
            return;
        }
        if (content.trim() === "") {
            setError("Content cannot be empty.");
            return;
        }
        if (categoryID === "") {
            setError("Please select a category.");
            return;
        }

        setLoading(true);
        setError(null);

        const userID = localStorage.getItem("userID");
        axios.post("http://localhost:8080/threads", {
                title: title,
                content: content,
                category_id: categoryID
            },
            {
                headers:{
                    "userID": userID,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                onCreateSuccess(response.data.thread);
                setTitle("");
                setContent("");
                setCategoryID("");
                onClose();
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Failed to create thread.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle variant="h5" fontWeight="bolder">
                Create New Thread
            </DialogTitle>
            <DialogContent>
                Start a new Discussion on your journey!
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <FormControl required fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                            displayEmpty
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleCreateThread}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateThreadForm;
