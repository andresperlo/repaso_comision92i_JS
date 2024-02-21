const tBodyAdmin = document.getElementById("tbodyAdminUsers");
const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
const userLog = usersLocalStorage.find((user) => user.login);

tBodyAdmin.innerHTML = usersLocalStorage
  .map(
    (user) => `
<tr>
   <th scope="row">${user.id}</th>
   <td>${user.userName}</td>
   <td>${user.role === "admin" ? "Administrador" : "Usuario"}</td>
   <td>
   <!-- Button trigger modal -->
   <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal-${
     user.id
   }">
     Editar
   </button>
   
   <!-- Modal -->
   <div class="modal fade" id="exampleModal-${
     user.id
   }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Usuario</label>
              <input type="text" value='${
                user.userName
              }' class="form-control" id="inputUser" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Role</label>
              <input type="text" class="form-control" id="inputRole" value='${
                user.role === "admin" ? "Administrador" : "Usuario"
              }'>
            </div>
            <div class='d-flex justify-content-center'>
              <button type="button" class="btn btn-primary" onclick='sendChangesUser(${
                user.id
              })'>Guardar Cambios</button>
            </div>
          </form>
         </div>
       </div>
     </div>
   </div>
    <button class='btn btn-danger ${
      user.role === "admin" && "d-none"
    }' onclick='deleteUser(${user.id})'>Eliminar</button>
   </td>
 </tr>

`
  )
  .join("");

const logoutUser = () => {
  usersLocalStorage.find((user) => {
    if (user.login) {
      user.login = false;
      return user;
    }
  });
  sessionStorage.removeItem("userLog");
  localStorage.setItem("users", JSON.stringify(usersLocalStorage));

  setTimeout(() => {
    location.href = "../index.html";
  }, 1000);
};

const inputUser = document.getElementById("inputUser");
const inputRole = document.getElementById("inputRole");

const sendChangesUser = (idUser) => {
  const userLs = usersLocalStorage.find((user) => user.id === idUser);
  const userIndex = usersLocalStorage.findIndex((user) => user.id === idUser);

  /*   if (inputRole.value !== "admin" && inputRole.value !== "user") {
    return alert("Roles Permitidos: Usuario o Administrador");
  } */

  const updateUser = {
    id: userLs.id,
    userName: inputUser.value ? inputUser.value : userLs.userName,
    pass: userLs.pass,
    role: inputRole.value
      ? inputRole.value === "Administrador"
        ? "admin"
        : "user"
      : userLs.role,
    delete: userLs.delete,
    login: userLs.login,
    cart: userLs.cart || [],
    fav: userLs.fav || [],
  };
  usersLocalStorage[userIndex] = updateUser;

  localStorage.setItem("users", JSON.stringify(usersLocalStorage));
  location.reload();
};

const deleteUser = (idUser) => {
  const confirmDeleteUser = confirm(
    "Estas seguro de que quieres eliminar este USUARIO?"
  );

  if (confirmDeleteUser) {
    const usuarioNoBorrados = usersLocalStorage.filter(
      (user) => user.id !== idUser
    );

    localStorage.setItem("users", JSON.stringify(usuarioNoBorrados));
    location.reload();
  }
};
