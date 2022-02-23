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

    if(href != '/admin/recipes/create' && href != '/admin/chefs/create') {
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

    function createDiv() {
        const div = document.createElement('div');
        return div;
    }

    function clearInput() {
        inputPreparation.value = "";
        inputPreparation.focus();
    }

    function createDeleteButton(div) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.setAttribute('class', 'delete-field-button');
        deleteButton.setAttribute('type', 'button');

        div.appendChild(deleteButton);
    }

    function createPreparation(textoInput) {
        const input = createInput();
        const div = createDiv();

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'preparation[]');
        input.value = textoInput;

        div.appendChild(input);

        boxPreparation.appendChild(div);
        clearInput();

        createDeleteButton(div);
    }

    btnPreparation.addEventListener('click', () => {
        const currentPage = location.pathname;
        let href = String(currentPage);
        
        if(href == '/admin/recipes/create') {
            if(!inputPreparation.value) return;
            createPreparation(inputPreparation.value);
        } else {
            createPreparation(inputPreparation.value);
        }
    });

    function insertButtonEdit() {
        const divs = document.querySelectorAll('.box-preparation div');
        
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

// Upload photos recipes
const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) return; 

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = PhotosUpload.getContainer(image);

                PhotosUpload.preview.appendChild(div);
            }

            reader.readAsDataURL(file);
        });

        PhotosUpload.input.files = PhotosUpload.getAllFiles();
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList } = input;

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`);
            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == 'photo') {
                photosDiv.push(item);
            }
        });

        const totalPhotos = fileList.length + photosDiv.length;
        if(totalPhotos > uploadLimit) {
            alert("O limite máximo de fotos foi atingido");
            event.preventDefault();
            return true;
        }

        return false;
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    getContainer(image) {
        const div = document.createElement('div');
        div.classList.add('photo');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);
        div.appendChild(PhotosUpload.getRemoveButton());

        return div;
    },
    getRemoveButton() {
        const button = document.createElement('i');
        button.classList.add('fas', 'fa-times');

        return button;
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode;
        const photosArray = Array.from(PhotosUpload.preview.children);
        const index = photosArray.indexOf(photoDiv);

        PhotosUpload.files.splice(index, 1);
        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photoDiv.remove();
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode;
        console.log(photoDiv.id)

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]');
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`;
            };
        };

        photoDiv.remove();
    }
};

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    preview: document.querySelectorAll('.viewImages img'),
    setImage(event){
        const { target } = event;

        ImageGallery.preview.forEach(preview => 
            preview.classList.remove('active'));
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
    }
}

// Upload photos chefs
const ChefsPhotosUpload = {
    input: "",
    inputImageButton: document.querySelector('#chefs-photos-upload input'),
    sendImageButton: document.querySelector('.add-chef-image-button'),
    preview: document.querySelector('#chef-photos-preview'),
    uploadLimit: 1,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        ChefsPhotosUpload.input = event.target;

        if(ChefsPhotosUpload.hasLimit(event)) return;

        Array.from(fileList).forEach(file => {
            ChefsPhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                const imageSrc = image.src = String(reader.result);

                const input = ChefsPhotosUpload.getInput(imageSrc);

                ChefsPhotosUpload.preview.appendChild(input);

                // disabled button send image
                ChefsPhotosUpload.disabledButton();
            };

            reader.readAsDataURL(file);
        });

        ChefsPhotosUpload.input.files = ChefsPhotosUpload.getAvatarFiles();
    },
    hasLimit(event) {
        // const { uploadLimit } = ChefsPhotosUpload;
        // const { files: fileList } = event.target;
        // const { uploadLimit, input: fileList, preview } = ChefsPhotosUpload;
        const { uploadLimit, input, preview } = ChefsPhotosUpload;
        const { files: fileList } = input;

        if(fileList.length > uploadLimit) {
            alert(`Envia apenas ${uploadLimit} foto`);

            event.preventDefault();
            return true;
        }

        const photoDiv = 0;
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "chef-avatar") {
                photoDiv.push(item);
            };
        });

        const totalPhotos = fileList.length + photoDiv.length;
        if(totalPhotos > uploadLimit) {
            alert('Não é permitido enviar mais de 1 foto');
            event.preventDefault();
            return true;
        }

        return false;
    },
    getAvatarFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        ChefsPhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    getInput(imageSrc) {
        const input = document.createElement('input');
        input.classList.add('chef-avatar');
        input.setAttribute('disabled', 'disabled');

        input.value = imageSrc;
        // input.value = image;

        const div = document.querySelector('#chef-photos-preview');

        div.appendChild(ChefsPhotosUpload.getRemoveButton());

        return input;
    },
    disabledButton() {
        // ChefsPhotosUpload.inputImageButton.setAttribute('disabled', 'disabled');
        ChefsPhotosUpload.sendImageButton.classList.add('disabled-chef-button');

        ChefsPhotosUpload.inputImageButton.style.position = "fixed"
        ChefsPhotosUpload.inputImageButton.style.left = "-100%"
        // Lightbox.target.style.opacity = 1;
    },
    activateButton() {
        // ChefsPhotosUpload.inputImageButton.removeAttribute('disabled', 'disabled');
        ChefsPhotosUpload.sendImageButton.classList.remove('disabled-chef-button');

        ChefsPhotosUpload.inputImageButton.style.position = "absolute"
        ChefsPhotosUpload.inputImageButton.style.left = 0;
    },
    getRemoveButton() {
        const button = document.createElement('button');
        button.classList.add('delete-avatar-button');
        button.setAttribute('type', 'button');
        button.innerHTML = "x";

        button.onclick = ChefsPhotosUpload.removeAvatar;

        return button;
    },
    removeAvatar(event) {
        // const avatarInput = event.target.parentNode;
        const avatarInput = document.querySelector('#chef-photos-preview input');
        const avatarButton = document.querySelector('.delete-avatar-button');
        // const avatarArray = Array.from(ChefsPhotosUpload.preview.children);
        // const index = avatarArray.indexOf(avatarInput);
        const index = 0;

        ChefsPhotosUpload.files.splice(index, 1);
        ChefsPhotosUpload.input.files = ChefsPhotosUpload.getAvatarFiles();

        avatarInput.remove();
        avatarButton.remove();

        ChefsPhotosUpload.activateButton();
    }
};
