import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
} from "@mui/material";

interface Category {
    id: number;
    name: string;
}

const CreateThreadForm: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [categoryID, setCategoryID] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories when component mounts
    useEffect(() => {
        axios
            .get("http://localhost:8080/categories")
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch((err) => {
                setError("Failed to fetch categories.");
                console.error("Error fetching categories:", err);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        axios
            .post("http://localhost:8080/threads", {
                title,
                content,
                categoryID: categoryID || null, // Pass null if no category selected
            })
            .then(() => {
                setSuccess("Thread created successfully!");
                setTitle("");
                setContent("");
                setCategoryID("");
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Failed to create thread.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Create a New Thread
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
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
                        <MenuItem value="">No Category</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Create Thread"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateThreadForm;
