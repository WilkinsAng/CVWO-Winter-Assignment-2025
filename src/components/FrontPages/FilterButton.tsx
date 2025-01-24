import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Categories from "../../models/categories";
import axios from "axios";
import Threads from "../../models/threads";

interface FilterButtonProps {
    setCategoryID: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    categoryID: string;
}
const FilterButton: React.FC<FilterButtonProps> = ({setCategoryID, setPage, setError, categoryID}) =>{

    const [categories, setCategories] = useState<Categories[]>([])

    const handleCategoryChange = (categoryID: string) => {
        setCategoryID(categoryID);
        setPage(1); // Reset to the first page when changing category
    };

    // Fetch categories when component loads
    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then((res) => {
                setCategories(res.data.categories);
                setError(null);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setError(err);
            });
    }, []);

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
                variant={categoryID === "" ? "contained" : "outlined"}
                onClick={() => handleCategoryChange("")}
            >
                All Categories
            </Button>
            {categories.map((category) => (
                <Button
                    key={category.id}
                    variant={categoryID === category.id.toString() ? "contained" : "outlined"}
                    onClick={() => handleCategoryChange(category.id.toString())}
                >
                    {category.name}
                </Button>
            ))}
        </Box>
    );
}

export default FilterButton;