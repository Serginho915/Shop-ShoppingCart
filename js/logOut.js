import { getUser } from "./getUser.js";

const logOut = async () => {
    const user = getUser();
    if (!user) return;

    const api = 'https://634e9f834af5fdff3a625f84.mockapi.io/users/';


    localStorage.removeItem('user');

    await fetch(`${api}${user.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, status: false })
    });


    window.location.href = 'login.html';
};

export default logOut;
