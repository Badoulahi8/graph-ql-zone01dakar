export function CleanBody() {
    const login = document.querySelector('.loginBox');
    const header = document.querySelector('header');
    const container = document.querySelector('.container');
    const containers = document.querySelectorAll('.container-graphic');

    if (login && login.parentNode) {
        login.parentNode.removeChild(login);
    }
    if (header && header.parentNode) {
        header.parentNode.removeChild(header);
    }
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
    containers.forEach(container => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
}