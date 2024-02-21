const tBody = document.getElementById('tBody')
const userLog = JSON.parse(sessionStorage.getItem('userLog'))
  console.log(userLog)
tBody.innerHTML = userLog.cart.map((prod) => `
  <tr>
    <th scope="row">${prod.id}</th>
    <td>${prod.title}</td>
    <td>${prod.price}</td>
    <td>${prod.price}</td>
  </tr>
`)