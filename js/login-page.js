const inputUser = document.getElementById("idUser");
const inputPass = document.getElementById("idPass");

const divErrorUser = document.getElementById("divErrorUser");
const divErrorPass = document.getElementById("divErrorPass");

const botonRegistrar = document.getElementById("idSendForm");

const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
const adminLocalStorage = JSON.parse(localStorage.getItem("admin"));

divErrorUser.classList.add("d-none");
divErrorPass.classList.add("d-none");

const sendFormFunction = (ev) => {
  ev.preventDefault();
  if (!inputUser.value) {
    inputUser.classList.add("is-invalid");
    divErrorUser.classList.remove("d-none");
  }

  if (!inputPass.value) {
    inputPass.classList.add("is-invalid");
    divErrorPass.classList.remove("d-none");
  }

  if (inputUser.value && inputPass.value) {
    const userExist = usersLocalStorage.find(
      (user) => user.userName === inputUser.value
    );
    const userIndex = usersLocalStorage.findIndex(
      (user) => user.userName === inputUser.value
    );

    if (!userExist) {
      if (inputPass.value === adminLocalStorage.pass) {
        location.href = "../pages/admin-page.html";
        return;
      }
      return alert("Usuario y/o contraseña incorrecto / USUARIO");
    }

    if (inputPass.value !== userExist.pass) {
      return alert("Usuario y/o contraseña incorrecto / CONTRASEÑA");
    }

    usersLocalStorage[userIndex].login = true;
    localStorage.setItem("users", JSON.stringify(usersLocalStorage));
    sessionStorage.setItem("userLog", JSON.stringify(userExist));

    if (userExist.role === "admin" || userExist.role === "superAdmin") {
      location.href = "../pages/admin-page.html";
    } else {
      location.href = "../pages/user-page.html";
    }
  }
};

const validarCampos = (ev) => {
  const { name, value } = ev.target;
  if (name === "user") {
    divErrorUser.classList.add("d-none");
    inputUser.classList.remove("is-invalid");
    if (value.length > 3) {
      inputUser.classList.add("is-valid");
    }
  }
};

botonRegistrar.addEventListener("click", sendFormFunction);
inputUser.addEventListener("input", validarCampos);
