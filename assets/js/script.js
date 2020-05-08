document.documentElement.classList.add('js');

const END_OF_THE_WORLD = 'Tue, 19 Jan 2038 03:14:07 GMT';
const COOKIE_LIGHTS = 'lights';

function getCookie(name) {
    let foundCookie = document.cookie
        .split(/\s*;\s*/)
        .find(cookie => cookie.indexOf(name + '=') === 0);

    return foundCookie && foundCookie.split('=')[1];
}

function setCookie(name, value, expires=END_OF_THE_WORLD) {
    document.cookie = `${name}=${value}; expires=${expires}; path=/;`;
}

document.querySelectorAll('.site-content img').forEach(imgEl => {
    function setClass() {
        imgEl.classList.add('is-loaded');
        imgEl.removeEventListener('load', setClass);
    };

    imgEl.complete ? setClass() : imgEl.addEventListener('load', setClass);
});

window.addEventListener('hashchange', function scrollToHash(ev) {
    let el = document.querySelector(`[id='${window.location.hash.substr(1)}']`);

    if (el) {
        ev.preventDefault();
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });
    }
});

let prefersDarkness = window.matchMedia('(prefers-color-scheme: dark)');
let lightsSettings = getCookie(COOKIE_LIGHTS);

if (prefersDarkness && lightsSettings != 1) {
    document.documentElement.classList.add('dark');
}

document.querySelector('.site-header__lightswitch').addEventListener('click', ev => {
    let rootClass = document.documentElement.classList;

    rootClass.toggle('dark');
    setCookie(COOKIE_LIGHTS, rootClass.contains('dark') ? 0 : 1);
});
