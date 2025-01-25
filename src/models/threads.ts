interface Threads {
    id: number;
    title: string;
    content: string;
    user_id: number;
    username: string;
    created_at: string ;//Converted to string
    updatedAt: string;
    likes: number;
    dislikes: number;
    category_id: number;
}

export default Threads;