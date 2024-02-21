const inputUser = document.getElementById('idUser')
const inputPass = document.getElementById('idPass')
const inputRpass = document.getElementById('idRpass')

const divErrorUser = document.getElementById('divErrorUser')
const divErrorPass = document.getElementById('divErrorPass')
const divErrorRpass = document.getElementById('divErrorRpass')

const botonRegistrar = document.getElementById('idSendForm')

const usersLocalStorage = JSON.parse(localStorage.getItem('users')) || []

divErrorUser.classList.add('d-none')
divErrorPass.classList.add('d-none')
divErrorRpass.classList.add('d-none')

const sendFormFunction = (ev) => {
    ev.preventDefault()
    if (!inputUser.value) {
        inputUser.classList.add('is-invalid')
        divErrorUser.classList.remove('d-none')
    }

    if (!inputPass.value) {
        inputPass.classList.add('is-invalid')
        divErrorPass.classList.remove('d-none')
    }

    if (!inputRpass.value) {
        inputRpass.classList.add('is-invalid')
        divErrorRpass.classList.remove('d-none')
    }

    if (inputUser.value && inputPass.value && inputRpass.value) {

        const userExist = usersLocalStorage.find((user) => user.userName === inputUser.value)

        if (userExist) {
            return alert('Usuario no disponible')
        }

        if (inputPass.value !== inputRpass.value) {
            return alert('Contraseñas no coinciden')
        }

        if (usersLocalStorage.length) {
            const idUser = usersLocalStorage[usersLocalStorage.length - 1].id + 1

            const newUser = {
                id: idUser,
                userName: inputUser.value,
                pass: inputPass.value,
                role: 'user',
                deleted: false,
                login: true,
                cart: [],
                fav: []
            }

            usersLocalStorage.push(newUser)

            localStorage.setItem('users', JSON.stringify(usersLocalStorage))
            sessionStorage.setItem('userLog', JSON.stringify(newUser))

            setTimeout(() => {
                location.href = '../pages/user-page.html'
            }, 1000)
        } else {
            const newUser = {
                id: 1,
                userName: inputUser.value,
                pass: inputPass.value,
                role: 'user',
                deleted: false,
                login: true,
                cart: [],
                fav: []
            }

            usersLocalStorage.push(newUser)

            localStorage.setItem('users', JSON.stringify(usersLocalStorage))
            sessionStorage.setItem('userLog', JSON.stringify(newUser))

            setTimeout(() => {
                location.href = '../pages/user-page.html'
            }, 1000)
        }
    }

}


const validarCampos = (ev) => {
    const { name, value } = ev.target
    if (name === 'user') {
        divErrorUser.classList.add('d-none')
        inputUser.classList.remove('is-invalid')
        if (value.length > 3) {
            inputUser.classList.add('is-valid')
        }
    }


}

botonRegistrar.addEventListener('click', sendFormFunction)
inputUser.addEventListener('input', validarCampos)