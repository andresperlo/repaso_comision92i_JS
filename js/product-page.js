
const divProductPage = document.getElementById('idDivProductPage')
const idProd = location.search.split('=')[1]

fetch(`https://fakestoreapi.com/products/${idProd}`)
  .then((res) => res.json())
  .then((dataApi) => {
    divProductPage.innerHTML = `
      <div class="card w-25">
        <img src="${dataApi.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${dataApi.title}</h5>
            <p class="card-text">${dataApi.price}</p>
            <p class="card-text">${dataApi.description}</p>
            <button class='btn btn-success' onclick='addProdFav(${dataApi.id})'>Añadir a Favoritos</button>
            <button class='btn btn-primary' onclick='addProdCart(${dataApi.id})'>Añadir al Carrito</button>
        </div>
      </div>
    `
  })

  const addProdFav = async(idProd) => {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users')) || []
    const userLog = JSON.parse(sessionStorage.getItem('userLog'))
    const product = await fetch(`https://fakestoreapi.com/products/${idProd}`)
    const data = await product.json()

    const prodExistFavs = userLog.fav.find((prodFav) => prodFav.id === idProd)

    if(prodExistFavs){
      alert('Producto ya existe en la seccion Favoritos')
    }else{
      userLog.fav.push(data)
      sessionStorage.setItem('userLog', JSON.stringify(userLog))
    }

  }

  const addProdCart = async(idProd) => {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users')) || []
    const userLog = JSON.parse(sessionStorage.getItem('userLog'))
    const product = await fetch(`https://fakestoreapi.com/products/${idProd}`)
    const data = await product.json()

    const prodExistCart = userLog.cart.find((cartProd) => cartProd.id === idProd)

    if(prodExistCart){
      alert('Producto ya existe en el Carrito')
    }else{
      userLog.cart.push(data)
      sessionStorage.setItem('userLog', JSON.stringify(userLog))
    }
  }



