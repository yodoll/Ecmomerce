export interface UserForm {
    _id?: string;
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role: string;
}
