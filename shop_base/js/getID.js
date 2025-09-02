import getData from "./getData.js";

const api = 'https://634e9f834af5fdff3a625f84.mockapi.io/users';

const getID = async () => {
  const users = await getData(api);

  if (!users || users.length === 0) return 1; 

  const maxId = users.reduce((max, user) => {
    return Math.max(max, Number(user.id));
  }, Number(users[0].id));

  return maxId + 1; 
};


export default getID;
