import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Threads from "../../models/threads";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Categories from "../../models/categories";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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
    const [categoryID, setCategoryID] = useState<string>(selectedThread?.category_id.toString() || "");
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState<string | null>(null);

    const userID = localStorage.getItem("userID")
    // Fetch categories when the dialog opens
    useEffect(() => {
        if (updateOpen) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/categories`)
                .then((res) => setCategories(res.data.categories))
                .catch((err) => console.error("Error fetching categories:", err));
        }
    }, [updateOpen]);

    // Reset form values when the selectedThread changes
    useEffect(() => {
        if (selectedThread) {
            setTitle(selectedThread.title);
            setContent(selectedThread.content);
            setCategoryID(selectedThread.category_id.toString());
        }
    }, [selectedThread]);

    const handleUpdateThread = async () => {
        if (!selectedThread) return;

        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/threads/${selectedThread.id}`, {
                    title: title,
                    content: content,
                    category_id: categoryID
                },
                {
                    headers: {
                        "userID": userID,
                        "Content-Type": "application/json"
                    }

                });
            onUpdateSuccess(response.data.thread);
            handleUpdateThreadClose();
        } catch (err) {
            setError("Failed to update thread. Please try again.");
            console.error("Error updating thread:", err);
        }
    };
    return (
        <Dialog open={updateOpen} onClose={handleUpdateThreadClose} fullWidth>
            <DialogTitle variant="h5" fontWeight="bolder">
                Update Thread
            </DialogTitle>
            <DialogContent>
                Edit the TextBoxes to edit your Threads
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
                    <FormControl fullWidth margin="normal">
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
