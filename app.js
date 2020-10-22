const apiUrl = "https://reqres.in/";
const formEl = document.querySelector("#loginForm");
const showUserButtonEl = document.querySelector(".showUsersButton");
const usersListEl = document.querySelector(".usersList");
const userInfoContainer = document.querySelector(".userInfoContainer");
const showUsers = document.querySelector(".showUsersButton");

// skickar inloggnings uppgifter till API
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(apiUrl + "api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      const errorMessageEl = document.querySelector("#loginErrorMessage");
      // Om felaktiga uppgifter anges: visa felmeddelande
      if (jsonData.error) {
        errorMessageEl.innerText = jsonData.error;
        errorMessageEl.classList.remove("hide");
        showUsers.classList.add("hide");
      }
      // Unhide 'Show user button'
      else {
        showUsers.classList.remove("hide");
        errorMessageEl.classList.add("hide");
      }
    });
});

// (vid klick) hämtar data från API och visar användare i en lista
showUserButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const userList = users
        .map((user) => {
          return `<li class = "user" data-userid = ${user.id}>${user.first_name} ${user.last_name}</li>`;
        })
        .join("");
      usersListEl.innerHTML = userList;
    });
});
// vid klick på ett namn: visar info om använadern
usersListEl.addEventListener("click", (e) => {
  const userId = e.target.dataset.userid;

  fetch(`${apiUrl}api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      userInfoContainer.innerHTML = "";

      const name = document.createElement("p");
      name.innerText = user.data.first_name + " " + user.data.last_name;
      userInfoContainer.appendChild(name);

      const avatarImg = document.createElement("img");
      avatarImg.src = user.data.avatar;
      userInfoContainer.appendChild(avatarImg);

      const email = document.createElement("p");
      email.innerText = user.data.email;
      userInfoContainer.appendChild(email);
    });
});
