const cards = document.querySelectorAll('.card');

for(let card of cards) {
    card.addEventListener('click', () => { 
        const revenueId = card.getAttribute('id');
        window.location.href = `/details/${revenueId}`; 
    });
}

try {
    dynamicNavigationMenu();
} catch(err){}

function dynamicNavigationMenu() {
    const pageLink = location.pathname;
    const menuItems = document.querySelectorAll('header nav ul a');

    for(let item of menuItems) {
        // site Foodfy
        // website links
        if(pageLink.includes(item.getAttribute('href'), /\w/g)) {
            if(!pageLink.includes('/admin', /\w/g)) item.classList.add('active');
        }

        // recipe details
        if(pageLink.includes('/details', /\w/g) && item.href.includes('/recipes')) item.classList.add('active');

        // recipe search
        if(pageLink.includes('/search', /\w/g) && item.href.includes('/recipes')) item.classList.add('active');

        if(item.getAttribute('href').includes('/admin')) {
            if(pageLink.includes('/admin/chefs') && item.href.includes('/admin/chefs')) item.classList.add('admin-active');

            if(pageLink.includes('/admin/recipes') && item.href.includes('/admin/recipes') || pageLink.includes('/admin/user/recipes')) {
                item.classList.add('admin-active');

                if(item.innerHTML != 'Receitas') item.classList.remove('admin-active');
            }

            if(pageLink.includes('/admin/profile') && item.href.includes('/admin/profile')) {
                item.classList.add('admin-active');

                if(item.includes('Minha conta')) item.classList.remove('admin-active');
            }

            if(pageLink.includes('/admin/users') && item.href.includes('/admin/profile')) {
                item.classList.add('admin-active');

                if(item.includes('Minha conta')) item.classList.remove('admin-active');
            }
        }
    }
}

// adminDynamicNavigationMenu();
// function adminDynamicNavigationMenu() {
//     const pageLink = location.pathname;
//     const menuItems = document.querySelectorAll('header nav ul a');

//     for(item of menuItems) {
//         if(pageLink.includes(item.getAttribute('href'), /\w/g)) {
//             item.classList.add('admin-active');
//         }

//         // console.log(item.getAttribute('href') == '/');
//         if((item.getAttribute('href') == '/')) {
//             item.classList.remove('admin-active')
//         }
//     }
// }

// const menuItems = document.querySelectorAll('header .links a');

// for( item of menuItems ) {
//     if(currentPage.includes(item.getAttribute('href'))) {
//         item.classList.add("active");
//     }
// }

// // Dynamic visitor header
// const pageFoodfy = document.querySelector('.page-foodfy');

// if(pageFoodfy) {
//     dynamicVisitorHeader();
// }

// function dynamicVisitorHeader() {
//     const currentPage = location.pathname;
//     const li = document.querySelectorAll('nav ul li');

//     for(let link of li) {
//         if(currentPage == '/about' && link.firstChild.pathname == '/about') {
//             link.firstChild.className = 'active';
//         } else if(currentPage == '/recipes' && link.firstChild.pathname == '/recipes') {
//             link.firstChild.className = 'active';
//         } else if(currentPage == '/chefs' && link.firstChild.pathname == '/chefs') {
//             link.firstChild.className = 'active';
//         } else if(currentPage.indexOf('/details') == 0 && link.firstChild.pathname == '/recipes') {
//             link.firstChild.className = 'active';
//         } else if(currentPage.indexOf('/search') == 0 && link.firstChild.pathname == '/recipes') {
//             link.firstChild.className = 'active';
//         };
//     };
// }


// // Dynamic admin header
// const boxAdminHeader = document.querySelector('.box-admin-header-menu');

// if(boxAdminHeader) {
//     dynamicAdminHeader();
// };

// function dynamicAdminHeader() {
//     const currentPage = location.pathname;
//     const logoLink = document.querySelector('.title a');
//     const li = document.querySelectorAll('nav ul li');

//     // /admin/users/create
//     // Voltar aqui.. Funciona para edit, mais não em create
//     // porque create não enxerga esse input.
//     // const getInputHidden = document.querySelector('input[class="input-edit"]');
//     // const userId = getInputHidden.getAttribute('value');

//     for(let link of li) {
//         // index page
//         if(currentPage == '/admin/recipes' && link.firstChild.pathname == '/admin/recipes') {
//             link.firstChild.className = 'admin-active';
//         } else if(currentPage == '/admin/chefs' && link.firstChild.pathname == '/admin/chefs') {
//             logoLink.href = '/admin/chefs';
//             link.firstChild.className = 'admin-active';
//         }
//         // else if(currentPage == '/admin/users/create' && link.firstChild.pathname == '/admin/users/create') {
//         //     logoLink.href = '/admin/users/create';
//         //     link.firstChild.className = 'admin-active';
//         // };
        
//         // detail page and edit - recipes and chefs
//         if(currentPage.indexOf('/admin/recipes') == 0 && link.firstChild.pathname == '/admin/recipes') {
//             link.firstChild.className = 'admin-active';
//         } else if(currentPage.indexOf('/admin/chefs') == 0 && link.firstChild.pathname == '/admin/chefs') {
//             logoLink.href = '/admin/chefs';
//             link.firstChild.className = 'admin-active';
//         }

//         // continue posteriormente...    
//         // // page edit user
//         // if(currentPage.indexOf(`/admin/users/${userId}`) == 0) {
//         //     const userLink =  document.querySelector('.accounts a');

//         //     // logoLink.href = ''
//         //     userLink.className = 'admin-active';
//         // };
//     }
// }


// Show and hide -- TESTES
const showAndHide = {
    hideIngredients() {
        const ingredients = document.querySelector('.ingredients');
        const ingredientsSpan = document.querySelector('.ingredients span');

        
        if(ingredientsSpan.innerHTML == "Esconder") {
            ingredientsSpan.innerHTML = "Mostrar";
            ingredients.className += " hide";
        } else {
            ingredientsSpan.innerHTML = "Esconder";
            ingredients.className = "ingredients";
        };
    },
    hidePreparation() {
        const preparation = document.querySelector('.method-of-preparation');
        const preparationSpan = document.querySelector('.method-of-preparation span');

        if(preparationSpan.innerHTML == "Esconder") {
            preparationSpan.innerHTML = "Mostrar";
            preparation.className += " hide";
        } else {
            preparationSpan.innerHTML = "Esconder";
            preparation.className = "method-of-preparation";
        };
    },
    hideInformation() {
        const information = document.querySelector(".additional-information");
        const informationSpan = document.querySelector('.additional-information span');

        if(informationSpan.innerHTML == "Esconder") {
            informationSpan.innerHTML = "Mostrar";
            information.className += " hide";
        } else {
            informationSpan.innerHTML = "Esconder";
            information.className = "additional-information";
        };
    }
};

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

    // get chef id
    const getInputName = document.querySelector('.name-input');
    const chefId = getInputName.getAttribute('id');

    // ger user id
    const getInputUser = document.querySelector('.name-input');
    const userId = getInputUser.getAttribute('id');
    
    // get id user
    // const getInputHidden = document.querySelector('input[class="input-edit"]');
    // const userId = getInputHidden.getAttribute('value');

    // if(
    //     href != '/admin/recipes/create' && 
    //     href != '/admin/chefs/create' && 
    //     href != `/admin/chefs/${chefId}/edit` && 
    //     href != '/admin/users/create' &&
    //     href != `/admin/users/${userId}`
    // ) {
    try {
        if(
            href != '/admin/recipes/create' && 
            href != '/admin/chefs' && 
            href != '/admin/chefs/create' && 
            href != `/admin/chefs/${chefId}/edit` && 
            href != `/admin/users/${userId}/edit` &&
            href != '/admin/users/create' &&
            href != '/admin/profile' &&
            href != '/admin/users/login' &&
            href != '/admin/forgot-password' &&
            href != '/admin/password-reset'
    
        ) {
            inputIngredient.classList.add('hide-input');
            inputPreparation.classList.add('hide-input');
    
            btnSaveRecipe.addEventListener('click', () => {
                inputIngredient.parentNode.removeChild(inputIngredient);
                inputPreparation.parentNode.removeChild(inputPreparation);
            });
        };
    } catch(err){}
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

    // function createDeleteButton(div) {
    //     const deleteButton = document.createElement('button');
    //     deleteButton.innerText = 'X';
    //     deleteButton.setAttribute('class', 'delete-field-button');
    //     deleteButton.setAttribute('type', 'button');

    //     div.appendChild(deleteButton);
    // }
    function createDeleteButton(div) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'material-icons md delete-field-button');
        icon.innerHTML = 'delete';

        div.appendChild(icon);
    }
    // function createDeleteButton(div) {
    //     // Create google trash span tag
    //     const icon = document.createElement('span');
    //     icon.setAttribute('class', 'material-icons md');
    //     icon.innerHTML = 'delete';

    //     // Create button and add icon
    //     const deleteButton = document.createElement('button');
    //     deleteButton.appendChild(icon);
    //     deleteButton.setAttribute('class', 'delete-field-button');
    //     deleteButton.setAttribute('type', 'button');

    //     div.appendChild(deleteButton);
    // }

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
    
    // document.addEventListener('click', (e) => {
    //     const el = e.target;

    //     if(el.classList.contains('delete-field-button')) {
    //             el.parentElement.remove();
    //         }
    //     });
    document.addEventListener('click', (e) => {
        const el = e.target;

        if(el.classList.contains('delete-field-button')) {
            el.parentElement.remove();
        };
    });


    // const inputIngredient = document.querySelector('input[name="ingredients[]"]');
    // document.addEventListener('click', (e) => {
    //     const el = e.target;

    //     if(el.classList.contains('delete-field-button') || el.classList.contains('material-icons')) {
    //         console.log(el.parentElement)
    //         if(el.parentElement.classList.contains('ingredients-input')) {
                
    //         }
    //     } 
    //     // else if(el.classList.contains('material-icons')) {
    //     //     const div = document.querySelector('.ingredients-input');

    //     //     console.log(div);

    //     //     // if(div.parentElement.classList.contains('ingredients-input')) {
    //     //     //     console.log('Ingredients');
    //     //     // }
    //     // }
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

    // function createDeleteButton(div) {
    //     const deleteButton = document.createElement('button');
    //     deleteButton.innerText = 'X';
    //     deleteButton.setAttribute('class', 'delete-field-button');
    //     deleteButton.setAttribute('type', 'button');

    //     div.appendChild(deleteButton);
    // }

    // function createDeleteButton(div) {
    //     // Create google trash span tag
    //     const icon = document.createElement('span');
    //     icon.setAttribute('class', 'material-icons md');
    //     icon.innerHTML = 'delete';
                
    //     // Create button and add icon
    //     const deleteButton = document.createElement('button');
    //     // deleteButton.innerText = 'X';
    //     deleteButton.appendChild(icon);
    //     deleteButton.setAttribute('class', 'delete-field-button');
    //     deleteButton.setAttribute('type', 'button');

    //     div.appendChild(deleteButton);
    // }

    function createDeleteButton(div) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'material-icons md delete-field-button');
        icon.innerHTML = 'delete';
        
        div.appendChild(icon);
    }
    // function createDeleteButton(div) {
    //     // Create google trash span tag
    //     const icon = document.createElement('span');
    //     icon.setAttribute('class', 'material-icons md');
    //     icon.innerHTML = 'delete';
                
    //     // Create button and add icon
    //     const deleteButton = document.createElement('button');
    //     // deleteButton.innerText = 'X';
    //     deleteButton.appendChild(icon);
    //     deleteButton.setAttribute('class', 'delete-field-button');
    //     deleteButton.setAttribute('type', 'button');

    //     div.appendChild(deleteButton);
    // }

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
    // document.addEventListener('click', e => {
    //     const el = e.target;

    //     console.log(el.classList);

    //     if(el.classList.contains('delete-field-button')) {
    //         el.parentElement.remove();
    //     }
    // });

    // btnPreparation.addEventListener('click', e => {
    //     console.log("Preparação")
    // })

    // document.addEventListener('click', e => {
    //     const el = e.target;

    //     if(el.classList.contains('delete-field-button')) {
    //         el.parentElement.remove();
    //     } else if(el.classList.contains('material-icons')) {
    //         const div = document.querySelector('.delete-field-button');
    //         div.parentElement.remove();
    //     }
    // });
}

// Pagination
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

// Upload recipe files
const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles();
            return
        }; 

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

        PhotosUpload.updateInputFiles();
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
        const newFiles = Array.from(PhotosUpload.preview.children)
            .filter(file => {
                if(file.classList.contains('photo') && !file.getAttribute('id'))
                    return true;
            }
        );

        const index = newFiles.indexOf(photoDiv);
        PhotosUpload.files.splice(index, 1);
        
        PhotosUpload.updateInputFiles();

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
    },
    updateInputFiles() {
        PhotosUpload.input.files = PhotosUpload.getAllFiles();
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

const avatarUpload = {
    input: "",
    preview: document.querySelector('#avatar-preview'),
    uploadLimit: 1,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        avatarUpload.input = event.target;

        if(avatarUpload.hasLimit(event)) {
            avatarUpload.updateInputFiles();
            return;
        };

        Array.from(fileList).forEach(file => {
            avatarUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const linkAvatar = image.src;

                const div = avatarUpload.getContainer(linkAvatar);

                avatarUpload.preview.appendChild(div);
            };

            reader.readAsDataURL(file);
        });

        avatarUpload.updateInputFiles();
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = avatarUpload;
        const { files: fileList } = input;

        if(fileList.length > uploadLimit) {
            alert(`Envia no máximo ${uploadLimit} foto`);
            event.preventDefault();
            return true;
        };

        const avatarDiv = [];
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "avatar-box") {
                avatarDiv.push(item);
            }
        });

        const totalPhotos = fileList.length + avatarDiv.length;
        if(totalPhotos > uploadLimit) {
            alert('Não é permitido mais de 1 foto');
            event.preventDefault()
            return true;
        }

        return false;
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        avatarUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    getContainer(linkAvatar) {
        const div = document.createElement('div');
        const input = document.createElement('input');
        div.classList.add('avatar-box');
        input.classList.add('avatar');

        input.value = linkAvatar;
        
        div.appendChild(input);
        div.appendChild(avatarUpload.getRemoveButton());
        div.onclick = avatarUpload.removeAvatar;

        return div;
    },
    getRemoveButton() {
        const button = document.createElement('span');
        button.innerText = 'x';
        return button;
    },
    removeAvatar(event) {        
        const avatarDiv = event.target.parentNode;
        const newFiles = Array.from(avatarUpload.preview.children).filter(file => {
            if(file.classList.contains('avatar-box') && !file.getAttribute('id')) return true;
        });


        const index = newFiles.indexOf(avatarDiv);

        avatarUpload.files.splice(index, 1);
        avatarUpload.updateInputFiles();

        avatarDiv.remove();
    },
    removedOldAvatar(event) {
        const avatarDiv = event.target.parentNode;

        if(avatarDiv.id) {
            const removedAvatar = document.querySelector('input[name="removed_avatar"]');

            if(removedAvatar) {
                removedAvatar.value += `${avatarDiv.id}`;
            }
        }

        avatarDiv.remove();
    },
    updateInputFiles() {
        avatarUpload.input.files = avatarUpload.getAllFiles();
    }
}

// Validation in the email field
const Validate = {
    apply(input, func) {
        Validate.clearErrors(input);

        let results = Validate[func](input.value);
        input.value = results.value;

        if(results.error) {
            Validate.displayError(input, results.error);
        }
    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;

        input.parentNode.appendChild(div);
        input.focus();
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector('.error');

        if(errorDiv) {
            errorDiv.remove();
        };
    },
    isEmail(value) {
        let error = null;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/;

        if(!value.match(mailFormat)) {
            error = "Email inválido"
        }

        return {
            error,
            value
        }
    }
}

// show password
function passwordField() {
    let password = document.querySelector('.password-input input');
    let span = document.querySelector('.password-input span');

    span.style.display = 'initial';

    span.addEventListener('click', () => {
        if(span.innerHTML == "Mostrar") {
            span.innerHTML = "Ocultar";
            password.type = "text";
        } else {
            span.innerHTML = "Mostrar";
            password.type = "password";
        }
    });
}

function resetPasswordField() {
    let password = document.querySelectorAll('.reset-password-input input');
    let span = document.querySelector('.reset-password-input span:nth-child(2)');

    span.style.display = 'initial';

    span.addEventListener('click', () => {
        if(span.innerHTML == "Mostrar senhas") {
            span.innerHTML = "Ocultar";
            for(pass of password) {
                pass.type = "text";
            }
        } else {
            span.innerHTML = "Mostrar senhas";
            for(pass of password) {
                pass.type = "password";
            }
        }
    });
}






const pageLink = location.pathname;

if(pageLink.includes(`/edit`)) {
    confirmDelete();
}

function confirmDelete() {
    // edit user page
    let deleteButton = document.querySelector('.delete-user');
    let cancelButton = document.querySelector('.cancel-delete');
    let confirmationContainer = document.querySelector('.confirmation-container');


    deleteButton.addEventListener('click', e => {
        e.preventDefault();

        confirmationContainer.style.visibility = 'visible';
        confirmationContainer.style.opacity = 1;
    });

    cancelButton.addEventListener('click', e => {
        e.preventDefault();

        confirmationContainer.style.visibility = 'hidden';
        confirmationContainer.style.opacity = 0;
    });
}

const title = document.querySelector('title').innerText;

if(!pageLink.includes(`/edit`) && title == 'Lista de Usuários') {
    confirmListDelete();
}

function confirmListDelete() {
    const deleteButton = document.querySelectorAll('.remove-user-list');
    const cancelButton = document.querySelector('.cancel-delete');
    const confirmationContainer = document.querySelector('.confirmation-container');
    const inputHidden = document.querySelector('input[name="id"]');
   
    for(const deleteList of deleteButton) {
        
        deleteList.addEventListener('click', () => {
            let num = deleteList.querySelector('span').innerText;

            inputHidden.value = num;

            confirmationContainer.style.visibility = 'visible';
            confirmationContainer.style.opacity = 1;
        });
    }

    cancelButton.addEventListener('click', e => {
        e.preventDefault();

        confirmationContainer.style.visibility = 'hidden';
        confirmationContainer.style.opacity = 0;
    });
}