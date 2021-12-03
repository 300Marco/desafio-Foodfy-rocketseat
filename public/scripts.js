const cards = document.querySelectorAll('.card'); // seleciona todos os cards

for(let card of cards) {
    card.addEventListener('click', () => { // ouve o clique em um card
        const revenueId = card.getAttribute('id'); // pega o id de onde possui a classe "card".
        window.location.href = `/recipe/${revenueId}`; // envia o endereço para a url
    });
}

hideIngredients();
hidePreparation();
hideInformation();

function hideIngredients() {
    const ingredients = document.querySelector('.ingredients');
    const ingredientsSpan = document.querySelector('.ingredients span');
    
    ingredientsSpan.addEventListener('click', () => {
        if(ingredientsSpan.innerHTML == "Esconder") {
            ingredientsSpan.innerHTML = "Mostrar";
            ingredients.className += " hide";
        } else {
            ingredientsSpan.innerHTML = "Esconder";
            ingredients.className = "ingredients";
        }
    });
}


function hidePreparation() {
    const preparation = document.querySelector('.method-of-preparation');
    const preparationSpan = document.querySelector('.method-of-preparation span');
    
    preparationSpan.addEventListener('click', () => {
        if(preparationSpan.innerHTML == "Esconder") {
            preparationSpan.innerHTML = "Mostrar";
            preparation.className += " hide";
        } else {
            preparationSpan.innerHTML = "Esconder";
            preparation.className = "method-of-preparation";
        }
    });
}

function hideInformation() {
    const information = document.querySelector(".additional-information");
    const informationSpan = document.querySelector('.additional-information span');

    information.addEventListener('click', () => {
        if(informationSpan.innerHTML == "Esconder") {
            informationSpan.innerHTML = "Mostrar";
            information.className += " hide";
        } else {
            informationSpan.innerHTML = "Esconder";
            information.className = "method-of-preparation";
        }
    });
}
