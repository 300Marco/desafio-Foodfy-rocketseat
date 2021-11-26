const cards = document.querySelectorAll('.card');
const modalOverlay = document.querySelector('.modal-overlay');

for(let card of cards) {
    card.addEventListener('click', () => {
        const imgId = card.getAttribute('id');
        const titleRevenues = card.querySelector('.card-info')
            .getAttribute('id');
        const username = card.querySelector('p');

        modalOverlay.classList.add('active');
        
        modalOverlay.querySelector('img').src = `../assets/${imgId}.png`;
        modalOverlay.querySelector('.title-dish').innerHTML = titleRevenues;
        modalOverlay.querySelector('.name-user').innerHTML = username.innerText;
    });
}

modalOverlay.querySelector('.modal-close')
    .addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

