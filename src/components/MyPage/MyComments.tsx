// import React, { useState, useEffect } from "react";
// import { Box, Button, Typography, List, ListItem, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Comments from "../../models/comments";
//
// const MyCommentsPage = () => {
//     const [comments, setComments] = useState<Comments[]>([]);
//
//     // useEffect(() => {
//     //     // Fetch user's comments
//     //     fetch("/api/users/me/comments")
//     //         .then((res) => res.json())
//     //         .then((data) => setComments(data))
//     //         .catch((error) => console.error("Error fetching comments:", error));
//     // }, []);
//     //
//     // const handleDeleteComment = (commentId) => {
//     //     fetch(`/api/comments/${commentId}`, {
//     //         method: "DELETE",
//     //     })
//     //         .then(() => setComments(comments.filter((comment) => comment.id !== commentId)))
//     //         .catch((error) => console.error("Error deleting comment:", error));
//     // };
//
//     return (
//         <Box sx={{ padding: 2 }}>
//             <Typography variant="h4" sx={{ mb: 3 }}>
//                 My Comments
//             </Typography>
//             <List>
//                 {comments.map((comment) => (
//                     <ListItem key={comment.id} sx={{ display: "flex", justifyContent: "space-between" }}>
//                         <Box>
//                             <Typography variant="body1">{comment.content}</Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 On thread: {comment.threadTitle}
//                             </Typography>
//                         </Box>
//                         <Box>
//                             <IconButton color="primary">
//                                 <EditIcon />
//                             </IconButton>
//                             <IconButton color="error" onClick={() => handleDeleteComment(comment.id)}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </Box>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };
//
// export default MyCommentsPage;
