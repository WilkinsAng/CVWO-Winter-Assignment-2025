import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Categories from "../../models/categories";
import Alert from "@mui/material/Alert";

interface FilterButtonProps {
    categories: Categories[];
    categoryID: string;
    setCategoryID: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    catError: string | null;
}
const FilterButton: React.FC<FilterButtonProps> = ({categories, categoryID, setCategoryID, setPage, catError}) =>{

    const handleCategoryChange = (categoryID: string) => {
        setCategoryID(categoryID);
        setPage(1); // Reset to the first page when changing category
    };

    if (catError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Alert severity="error">{"Unable to get categories. Please try again later." + catError}</Alert>
            </Box>
        )
    }

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