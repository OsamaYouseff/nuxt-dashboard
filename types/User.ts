export default interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: number;
    creationAt: Date;
    updatedAt: Date;
}
