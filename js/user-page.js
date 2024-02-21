(async () => {
    const divProductos = document.getElementById('divProductos')
    const productosApi = await fetch('https://fakestoreapi.com/products')
    const dataApi = await productosApi.json()
  
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 10.99, codigo: 'ABC123' },
      { id: 2, nombre: 'Producto 2', precio: 19.99, codigo: 'DEF456' },
      { id: 3, nombre: 'Producto 3', precio: 5.49, codigo: 'GHI789' },
      { id: 4, nombre: 'Producto 4', precio: 15.75, codigo: 'JKL012' },
      { id: 5, nombre: 'Producto 5', precio: 8.25, codigo: 'MNO345' },
      { id: 6, nombre: 'Producto 6', precio: 12.50, codigo: 'PQR678' },
      { id: 7, nombre: 'Producto 7', precio: 7.99, codigo: 'STU901' },
      { id: 8, nombre: 'Producto 8', precio: 23.45, codigo: 'VWX234' },
      { id: 9, nombre: 'Producto 9', precio: 14.20, codigo: 'YZA567' },
      { id: 10, nombre: 'Producto 10', precio: 11.30, codigo: 'BCD890' }
    ];
  
    divProductos.innerHTML = dataApi.map((producto) => `
      <div class='col-12 col-md-6 col-lg-3 my-3'>
        <div class="card">
        <img src="${producto.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.title}</h5>
            <p class="card-text">${producto.price}</p>
            <p class="card-text">${producto.description}</p>
            <a href="../pages/product-page.html?id=${producto.id}" class="btn btn-primary">Ver Mas</a>
        </div>
        </div>
      </div>
    `).join('')
  
  }
  )()

const usersLocalStorage = JSON.parse(localStorage.getItem('users')) || []


const logoutUser = () => {
    usersLocalStorage.find((user) => {
        if(user.login){
            user.login = false
            return user
        }
    })
    sessionStorage.removeItem('userLog')
    localStorage.setItem('users', JSON.stringify(usersLocalStorage))

    setTimeout(() => {
        location.href = '../index.html'
    }, 1000)
}