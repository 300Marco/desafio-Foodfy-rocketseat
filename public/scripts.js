const cards = document.querySelectorAll('.card');

for(let card of cards) {
    card.addEventListener('click', () => { 
        const revenueId = card.getAttribute('id'); 
        window.location.href = `/details/${revenueId}`; 
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

// Logic for removing input 
// on pages other than the create page
const recipeFields = document.querySelector('.recipe-fields');

if(recipeFields) {
    displayInput();
}

function displayInput() {
    const currentPage = location.pathname;

    const inputIngredient = document.querySelector('.input-ingredients');
    const inputPreparation = document.querySelector('.input-preparation');

    const btnSaveRecipe = document.querySelector('.edit-button');

    let href = String(currentPage);

    if(href != '/admin/recipes/create') {
        inputIngredient.classList.add('hide-input');
        inputPreparation.classList.add('hide-input');

        btnSaveRecipe.addEventListener('click', () => {
            inputIngredient.parentNode.removeChild(inputIngredient);
            inputPreparation.parentNode.removeChild(inputPreparation);
        });
    }
}


// Add new inputs
const btnIngredient = document.querySelector('.add-ingredient');
const btnPreparation = document.querySelector('.add-preparation');

if(btnIngredient || btnPreparation) {
    addIngredient();
    addPreparation();
}

function addIngredient() {
    const inputIngredients = document.querySelector('.input-ingredients');
    const boxIngredients = document.querySelector('.box-ingredients');

    function createInput() {
        const input = document.createElement('input');
        return input;
    }

    function createDiv() {
        const div = document.createElement('div');
        return div;
    }

    function clearInput() {
        inputIngredients.value = "";
        inputIngredients.focus();
    }

    function createDeleteButton(div) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.setAttribute('class', 'delete-field-button');
        deleteButton.setAttribute('type', 'button');

        div.appendChild(deleteButton);
    }

    function createRecipe(textoInput) {
        const input = createInput();
        const div = createDiv();

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'ingredients[]');
        input.value = textoInput;

        div.appendChild(input);

        boxIngredients.appendChild(div);
        clearInput();

        createDeleteButton(div);

        // const input = createInput();

        // input.setAttribute('type', 'text');
        // input.setAttribute('name', 'ingredients[]');
        // input.value = textoInput;

        // boxIngredients.appendChild(input);
        // clearInput();
    }

    btnIngredient.addEventListener('click', () => {
        const currentPage = location.pathname;
        let href = String(currentPage);

        if(href == '/admin/recipes/create') {
            if(!inputIngredients.value) return;
            createRecipe(inputIngredients.value);
        } else {
            createRecipe(inputIngredients.value);
        }
    });

    function insertButtonEdit() {
        const divs = document.querySelectorAll('.box-ingredients div');
        
        for(let div of divs) {
            createDeleteButton(div);
        }
    }

    insertButtonEdit();

    document.addEventListener('click', (e) => {
        const el = e.target;

        if(el.classList.contains('delete-field-button')) {
            el.parentElement.remove();
        }
    });

    // Não remover por enquanto
    // const box = document.querySelector('.box-ingredients');

    // btnAddIngredient.addEventListener('click', () => {
    //     const newInput = document.createElement('input');
        
    //     newInput.setAttribute('type', 'text');
    //     newInput.setAttribute('name', 'ingredients[]');

    //     box.appendChild(newInput);
    // });
}

function addPreparation() {
    const inputPreparation = document.querySelector('.input-preparation');
    const boxPreparation = document.querySelector('.box-preparation');

    function createInput() {
        const input = document.createElement('input');
        return input;
    }

    function clearInput() {
        inputPreparation.value = "";
        inputPreparation.focus();
    }

    function createRecipe(textoInput) {
        const input = createInput();

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'preparation[]');
        input.value = textoInput;

        boxPreparation.appendChild(input);
        clearInput();
    }

    btnPreparation.addEventListener('click', (e) => {
        const currentPage = location.pathname;
        let href = String(currentPage);
        
        if(href == '/admin/recipes/create') {
            if(!inputPreparation.value) return;
            createRecipe(inputPreparation.value);
        } else {
            createRecipe(inputPreparation.value);
        }
    });

    // Não remover por enquanto
    // const box = document.querySelector('.box-preparation');

    // btnAddPreparation.addEventListener('click', () => {
    //     const newInput = document.createElement('input');
        
    //     newInput.setAttribute('type', 'text');
    //     newInput.setAttribute('name', 'preparation[]');

    //     box.appendChild(newInput);
    // });
}

const pagination = document.querySelector('.pagination');
const search = pagination.dataset.search;
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total);

let elements = "";

for(let page of pages) {
    if(String(page).includes("...")) {
        elements += `<span> ${page} </span>`
    } else {
        if(search) {
            elements += `<a href="?page=${page}&search=${search}"> ${page} </a>`
        } else {
            elements += `<a href="?page=${page}"> ${page} </a>`
        }
    }

}

pagination.innerHTML = elements;

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage;

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
        
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...");
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1);
            }
            
            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}
