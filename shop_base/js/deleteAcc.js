const deleteAcc = async () => {
  if (!confirm("Are you sure you want to delete your account?")) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${user.id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: false }) 
  });

  localStorage.removeItem("user");

  window.location.href = "index.html";
};

export default deleteAcc;
