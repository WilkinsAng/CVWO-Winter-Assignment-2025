import React, {useState} from "react";
import Box from "@mui/material/Box";
import Categories from "../../models/categories";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface FilterButtonProps {
    categories: Categories[];
    categoryID: string;
    setCategoryID: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    catError: string | null;
}
const FilterButton: React.FC<FilterButtonProps> = ({categories, categoryID, setCategoryID, setPage, catError}) =>{

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleCategoryChange = (categoryID: string) => {
        setCategoryID(categoryID);
        setPage(1);
        handleMenuClose();
    };

    if (catError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Alert severity="error">{"Unable to get categories. Please try again later."}</Alert>
            </Box>
        )
    }

    return (
        <>
            <IconButton onClick={handleMenuOpen} size="large">
                <FilterListIcon fontSize="large"/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => handleCategoryChange("")}
                    selected={categoryID === ""}
                >
                    All Categories
                </MenuItem>
                {categories.map((category) => (
                    <MenuItem
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id.toString())}
                        selected={categoryID === category.id.toString()}
                    >
                        {category.name}
                    </MenuItem>
                ))}
            </Menu>
    </>
    );
}

export default FilterButton;