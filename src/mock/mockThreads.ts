import Threads from "../models/threads";

export const mockThreads: Threads[] = [
    {
        id: 1,
        title: "How to get started with React?",
        content: "I want to learn React. Any tips on where to begin?",
        userId: 1,
        createdAt: "2025-01-03T08:00:00Z",
        updatedAt: "2025-01-04T09:00:00Z",
        likes: 12,
        dislikes: 2,
        categoryId: 1,
    },
    {
        id: 2,
        title: "Favorite JavaScript Libraries",
        content: "What are your favorite JS libraries and why?",
        userId: 2,
        createdAt: "2025-01-05T10:00:00Z",
        updatedAt: "2025-01-06T11:00:00Z",
        likes: 8,
        dislikes: 1,
        categoryId: 1,
    },
    {
        id: 3,
        title: "Healthy Eating Tips",
        content: "What are your best tips for maintaining a healthy diet?",
        userId: 1,
        createdAt: "2025-01-06T08:00:00Z",
        updatedAt: "2025-01-07T10:00:00Z",
        likes: 15,
        dislikes: 3,
        categoryId: 1,
    },
];
