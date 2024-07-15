export interface UserForm {
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface User {
    username: string;
    email: string;
    role: string;
}