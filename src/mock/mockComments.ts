import Comments from "../models/comments";

export const mockComments: Comments[] = [
    {
        id: 1,
        content: "Start with the official React docs. They're great for beginners!",
        userId: 2,
        thread_id: 1,
        createdAt: "2025-01-03T09:00:00Z",
        likes: 5,
        dislikes: 0,
    },
    {
        id: 2,
        content: "YouTube tutorials are also very helpful.",
        userId: 1,
        thread_id: 1,
        createdAt: "2025-01-03T10:00:00Z",
        likes: 3,
        dislikes: 1,
    },
    {
        id: 3,
        content: "I really like Lodash. It's a lifesaver for utility functions.",
        userId: 1,
        thread_id: 2,
        createdAt: "2025-01-05T11:00:00Z",
        likes: 7,
        dislikes: 2,
    },
];