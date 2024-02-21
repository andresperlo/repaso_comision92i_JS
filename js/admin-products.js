const tBodyAdmin = document.getElementById("tbodyAdminProducts");
const inputTile = document.getElementById("idInputTitle");
const inputDescription = document.getElementById("idInputDescription");
const inputPrice = document.getElementById("idInputPrice");
const inputImage = document.getElementById("idInputImage");
const buttonCreateProd = document.getElementById("idButtonCreateProd");

const productsLocalStorage = JSON.parse(localStorage.getItem("products")) || [];
const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];
const userLog = usersLocalStorage.find((user) => user.login);

tBodyAdmin.innerHTML = productsLocalStorage
  .map(
    (product) => `
<tr>
   <th scope="row">${product.id}</th>
   <td>${product.title}</td>
   <td>${product.description}</td>
   <td>${product.price}</td>
   <td>
    <img src="${product.image}" alt="" width='100'>
   </td>
   <td>
   <!-- Button trigger modal -->
   <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal-${product.id}">
     Editar
   </button>
   
   <!-- Modal -->
   <div class="modal fade" id="exampleModal-${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel-${product.id}" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel-${product.id}">Modal title</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Titulo</label>
                    <input type="text" class="form-control" id="idUserModal" aria-describedby="emailHelp" required value='${product.title}'>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Descripcion</label>
                    <input type="text" class="form-control" id="idDescriptionModal" value='${product.description}'>
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Precio</label>
                <input type="number" class="form-control" id="idPriceModal" value='${product.price}'>
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Imagen</label>
                <input type="text" class="form-control" id="idImageModal" value='${product.image}}'>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary" onclick='enviarFormulario(${product.id})'>Guardar Cambios</button>
                </div>
           </form>
         </div>
       </div>
     </div>
   </div>
    <button class='btn btn-danger' onclick='deleteProd(${product.id})'>Eliminar</button>
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

const inputUserModal = document.getElementById("idUserModal");
const inputDescriptionModal = document.getElementById("idDescriptionModal");
const inputPriceModal = document.getElementById("idPriceModal");
const inputImgModal = document.getElementById("idImageModal");

const enviarFormulario = (idProduct) => {
  const productFind = productsLocalStorage.find(
    (product) => product.id === idProduct
  );

  const productIndex = productsLocalStorage.findIndex(
    (product) => product.id === idProduct
  );

  if (!inputUserModal.value) {
    return alert("Campo Usuario Vacio");
  }

  if (inputPriceModal.value < 0) {
    return alert("Precio menor a 0");
  }

  const updateProduct = {
    id: productFind.id,
    title: inputUserModal.value,
    description: inputDescriptionModal.value,
    price: inputPriceModal.value,
    image: inputImgModal.value,
    rating: productFind.rating,
    category: productFind.category,
  };

  console.log(updateProduct);
  console.log(productsLocalStorage[productIndex]);
  productsLocalStorage[productIndex] = updateProduct;

  localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  location.reload();
};

const deleteProd = (idProduct) => {
  const confirmDeleteProduct = confirm(
    "Estas seguro de que quieres eliminar a este producto?"
  );

  if (confirmDeleteProduct) {
    const productosNoBorrados = productsLocalStorage.filter(
      (product) => product.id !== idProduct
    );
    localStorage.setItem("products", JSON.stringify(productosNoBorrados));
    location.reload();
  }
};

const createNewProd = () => {
  if (!inputTile.value) {
    alert("Campo Titulo Vacio");
  }

  if (!inputDescription.value) {
    alert("Campo Descripcion Vacio");
  }

  if (!inputPrice.value) {
    alert("Campo Precio Vacio");
  }

  if (!inputImage.value) {
    alert("Campo Imagen Vacio");
  }

  if (
    inputTile.value &&
    inputDescription.value &&
    inputPrice.value &&
    inputImage.value
  ) {
    const newProd = {
      id: productsLocalStorage[productsLocalStorage.length - 1].id + 1,
      title: inputTile.value,
      price: inputPrice.value,
      description: inputDescription.value,
      image: inputImage.value,
    };

    productsLocalStorage.push(newProd);

    localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  }
};

buttonCreateProd.addEventListener("click", createNewProd);
