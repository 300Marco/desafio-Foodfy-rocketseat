const cards = document.querySelectorAll('.card'); // seleciona todos os cards

for(let card of cards) {
    card.addEventListener('click', () => { // ouve o clique em um card
        const revenueId = card.getAttribute('id'); // pega o id de onde possui a classe "card".
        window.location.href = `/revenue/${revenueId}`; // envia o endereço para a url
    });
}

