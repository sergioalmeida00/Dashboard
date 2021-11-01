feather.replace()
const btnToggle = document.querySelector('.btn');
const sideBar = document.querySelector('.sideBar');
const spanSvg = document.querySelector('.btn span svg');
const grid = document.querySelector('.grid');

btnToggle.addEventListener('click', (e) => {
    e.preventDefault();
    btnToggle.classList.toggle('click');
    spanSvg.classList.toggle('showSvg');
    sideBar.classList.toggle('show');
    grid.classList.toggle('actionMargin');
});