const cards = document.querySelectorAll('.card');

for(let card of cards) {
    card.addEventListener('click', () => { 
        const revenueId = card.getAttribute('id'); 
        window.location.href = `/recipe/${revenueId}`; 
    });
}

// Show and hide
const ingredients = document.querySelector('.ingredients');
const preparation = document.querySelector('.method-of-preparation');
const information = document.querySelector(".additional-information");

if(ingredients || preparation || information) {
    hideIngredients();
    hidePreparation();
    hideInformation();
}

function hideIngredients() {
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

