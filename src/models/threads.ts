interface Threads {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: string ;//Converted to string
    updatedAt: string;
    likes: number;
    dislikes: number;
    category_id: number;
}

export default Threads;