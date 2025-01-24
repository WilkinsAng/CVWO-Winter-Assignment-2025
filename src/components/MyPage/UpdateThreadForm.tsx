import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Threads from "../../models/threads";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {DialogActions, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Categories from "../../models/categories";
import Typography from "@mui/material/Typography";

interface UpdateThreadFormProps {
    updateOpen: boolean;
    handleUpdateThreadClose: () => void;
    selectedThread: Threads | null;
    onUpdateSuccess: (updatedThread: Threads) => void;
}

const UpdateThreadForm: React.FC<UpdateThreadFormProps> = ({
                                                               updateOpen,
                                                               handleUpdateThreadClose,
                                                               selectedThread,
                                                               onUpdateSuccess,
                                                           }) => {
    const [title, setTitle] = useState(selectedThread?.title || "");
    const [content, setContent] = useState(selectedThread?.content || "");
    const [categoryID, setCategoryID] = useState<number | null>(selectedThread?.category_id || null);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState<string | null>(null);

    const userID = localStorage.getItem("userID")
    // Fetch categories when the dialog opens
    useEffect(() => {
        if (updateOpen) {
            axios
                .get("http://localhost:8080/categories")
                .then((res) => setCategories(res.data.categories))
                .catch((err) => console.error("Error fetching categories:", err));
        }
    }, [updateOpen]);

    // Reset form values when the selectedThread changes
    useEffect(() => {
        if (selectedThread) {
            setTitle(selectedThread.title);
            setContent(selectedThread.content);
            setCategoryID(selectedThread.category_id);
        }
    }, [selectedThread]);

    const handleUpdateThread = async () => {
        if (!selectedThread) return;

        try {
            const response = await axios.patch(`http://localhost:8080/threads/${selectedThread.id}`, {
                    title,
                    content,
                },
                {
                    headers: {
                        "userID": userID,
                        "Content-Type": "application/json"
                    }

                });
            onUpdateSuccess(response.data.thread); // Notify parent of the update
            handleUpdateThreadClose();
        } catch (err) {
            setError("Failed to update thread. Please try again.");
            console.error("Error updating thread:", err);
        }
    };

    console.log(selectedThread)
    return (
        <Dialog open={updateOpen} onClose={handleUpdateThreadClose} fullWidth>
            <DialogTitle>Update Thread</DialogTitle>
            <DialogContent>
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
                        <Typography variant="body1">
                            <strong>Category:</strong> {categories.find((cat) => cat.id === selectedThread?.category_id)?.name}
                        </Typography>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateThreadClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateThread} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateThreadForm;
