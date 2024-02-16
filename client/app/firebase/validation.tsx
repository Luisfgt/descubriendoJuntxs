

interface User {
    name: string;
    email: string;
    password: string;
}

interface Errors {
    name: string;
    email: string;
    password: string;
}

export const ValidateForm = (infoUser: User): Errors => {
    let formErrors: Errors = { name: '', email: '', password: '' };

    if (!infoUser.name) {
        formErrors.name = 'Name is required';
    }

    if (!infoUser.email) {
        formErrors.email = 'Email is required';
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(infoUser.email)) {
        formErrors.email = 'Email is invalid';
    }

    if (!infoUser.password) {
        formErrors.password = 'Password is required';
    } else if (infoUser.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
    }

    return formErrors;
};