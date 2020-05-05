document.documentElement.classList.add('js');

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