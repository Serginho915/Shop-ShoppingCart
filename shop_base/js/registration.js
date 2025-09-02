import getData from "./getData.js";
import  getID  from "./getID.js";

const api = 'https://634e9f834af5fdff3a625f84.mockapi.io/users';
const registrationForm = document.querySelector('#registrationForm');
const errorBlock = registrationForm.querySelector('.error');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formdata = new FormData(registrationForm);

  const name = formdata.get('name');
  const email = formdata.get('email');
  const password = formdata.get('password');
  const passwordVerify = formdata.get('passwordVerify');

  const usersData = await getData(api);


  const sameUser = usersData.find((u) => u.email === email);

  if (sameUser) {
    errorBlock.classList.add('active');
    errorBlock.textContent = 'Another user has this email';
    return;
  }

  errorBlock.classList.remove('active');

  if (password !== passwordVerify) {
    errorBlock.classList.add('active');
    errorBlock.textContent = 'Passwords do not match';
    return;
  }


  await fetch(api, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orders: [],
      shoppingCart: [],
      id: await getID(), 
      name,
      email,
      password,
      status: false
    })
  });

  alert('Your registration is successfull,Please sign')
  window.location.href = "login.html";
});
