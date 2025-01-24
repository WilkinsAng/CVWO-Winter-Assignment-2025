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
    const [categoryID, setCategoryID] = useState<number | null>(selectedThread?.categoryID || null);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

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
            setCategoryID(selectedThread.categoryID);
        }
    }, [selectedThread]);

    const handleUpdateThread = async () => {
        if (!selectedThread) return;

        try {
            const response = await axios.patch(`http://localhost:8080/threads/${selectedThread.id}`, {
                title,
                content,
                categoryID,
            });
            onUpdateSuccess(response.data.thread); // Notify parent of the update
            handleUpdateThreadClose();
        } catch (err) {
            setError("Failed to update thread. Please try again.");
            console.error("Error updating thread:", err);
        }
    };

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
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={categoryID || ""}
                            onChange={(e) => setCategoryID(Number(e.target.value))}
                        >
                            {categories.map((category: Categories) => (
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
