const usersLocalStorage = JSON.parse(localStorage.getItem('users')) || []
const userLog = JSON.parse(sessionStorage.getItem('userLog'))
const divCards = document.getElementById('idDivCards')

if(userLog.fav.length){
  divCards.innerHTML = userLog.fav.map((prod) => `

  <div class="card" style="width: 18rem;">
    <img src="${prod.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${prod.title}</h5>
      <p class="card-text">${prod.description}</p>
      <div class='d-flex justify-content-center'>
      <a href="#" class="btn btn-danger" >Eliminar</a>
      </div>
    </div>
  </div>
  
  `).join('')
}else{
  divCards.innerHTML =  `<h2 class='text-center my-5'>No hay Productos en Favoritos</h2>`
}


const logoutUser = () => {
  usersLocalStorage.find((user) => {
    if (user.login) {
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
