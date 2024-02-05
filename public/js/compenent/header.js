import {Login} from './login.js'
export function Header() {
    const header = document.createElement('header')
    header.className = "navbar"
    let a = document.createElement('a')
    a.id = 'logout'
    a.style.cursor = "pointer"
    a.className = 'logout-btn'
    a.textContent = `Log Out`
    header.appendChild(a)
    document.body.appendChild(header)

    const logout = document.getElementById('logout')
    logout.addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.success) {
            Login()
        } else {
            alert("Error logout")
        }
    })
}