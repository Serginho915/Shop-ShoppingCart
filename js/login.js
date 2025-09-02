import getData from "./getData.js";
import { getUser } from "./getUser.js";

const loginForm = document.querySelector('#loginForm');
const errorBlock = loginForm.querySelector('.error');
const api = 'https://634e9f834af5fdff3a625f84.mockapi.io/users';
const headerUser = document.querySelector('#headerUser');
const usersData = await getData(api);



loginForm.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const formData = new FormData(loginForm)
    const email = formData.get("email");
    const password = formData.get("password");
    
    
        
    const user = usersData.find(u => u.email===email);


    if(!user){
        errorBlock.textContent = 'Invalid email';
        errorBlock.classList.add('active');
        return
    }
    
    if(String(user.password) !== password){
        errorBlock.textContent = 'Invalid password';
        errorBlock.classList.add('active');
        return
    }

    errorBlock.classList.remove("active");
    localStorage.setItem('user', JSON.stringify(user));

    const userLocal = getUser();

    if (userLocal.name !== '') {
        headerUser.textContent = user.name;
        headerUser.setAttribute("href", "./account.html");
    }
      window.location.href = "account.html";
    
})

