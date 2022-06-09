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
            if(pageLink.includes('/admin/chefs') && item.href.includes('/admin/chefs')) {
                const logo = document.querySelector('header .title a');
                logo.href = '/admin/chefs';
                
                item.classList.add('admin-active')
            };

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

// Show and hide 
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
function insertButtonEdit(classes, func) {
    const buttonsDelete = document.querySelectorAll(classes);
    
    for(let button of buttonsDelete) {
        func.createDeleteButton(button);
    }
}

const AddIngredient = {
    inputIngredients: document.querySelector('.input-ingredients'),
    boxIngredients: document.querySelector('.box-ingredients'),
    currentPage: String(location.pathname),
    newField(e) {
        if(this.currentPage == '/admin/recipes/create') {
            if(!this.inputIngredients.value) return;
            this.createRecipe(this.inputIngredients.value);
        } else {
            this.createRecipe(this.inputIngredients.value);
        };
    },
    createInput() {
        const input = document.createElement('input');
        return input;
    },
    createDiv() {
        const div = document.createElement('div');
        return div;
    },
    clearInput() {
        this.inputIngredients.value = "";
        this.inputIngredients.focus();
    },
    createDeleteButton(div) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'material-icons md delete-field-button');
        icon.innerHTML = 'delete';

        div.setAttribute('class', 'select-ingredient');

        div.appendChild(icon);
    },
    createRecipe(textoInput) {
        const input = this.createInput();
        const div = this.createDiv();

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'ingredients[]');
        input.value = textoInput;

        div.appendChild(input);

        this.boxIngredients.appendChild(div);
        this.clearInput();

        this.createDeleteButton(div);
    },
    deleteField() {
        const selectIngredient = document.querySelectorAll('.select-ingredient');
        
        let count = selectIngredient.length;

        document.addEventListener('click', (e)=>{
            let el = e.target;
            
            if(el.classList.contains('add-ingredient')) {
                count += 1;
            };

            if(el.classList.contains('delete-field-button')) {
                if(el.parentElement.className == 'select-ingredient') {
                    if(count > 1) {
                        count -= 1;
                        el.parentElement.remove();
                    };
                };
            };
        });
    }
};

insertButtonEdit('.box-ingredients div', AddIngredient);
AddIngredient.deleteField();

const AddPreparation = {
    inputPreparation: document.querySelector('.input-preparation'),
    boxPreparation: document.querySelector('.box-preparation'),
    currentPage: String(location.pathname),
    newField(e) {
        if(this.currentPage == '/admin/recipes/create') {
            if(!this.inputPreparation.value) return;
            this.createRecipe(this.inputPreparation.value);
        } else {
            this.createRecipe(this.inputPreparation.value);
        };
    },
    createInput() {
        const input = document.createElement('input');
        return input;
    },
    createDiv() {
        const div = document.createElement('div');
        return div;
    },
    clearInput() {
        this.inputPreparation.value = "";
        this.inputPreparation.focus();
    },
    createDeleteButton(div) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'material-icons md delete-field-button');
        icon.innerHTML = 'delete';

        div.setAttribute('class', 'select-preparation');

        div.appendChild(icon);
    },
    createRecipe(textoInput) {
        const input = this.createInput();
        const div = this.createDiv();

        input.setAttribute('type', 'text');
        input.setAttribute('name', 'preparation[]');
        input.value = textoInput;

        div.appendChild(input);

        this.boxPreparation.appendChild(div);
        this.clearInput();

        this.createDeleteButton(div);
    },    
    deleteField() {
        const selectPreparation = document.querySelectorAll('.select-preparation');

        let count = selectPreparation.length;

        document.addEventListener('click', (e) => {
            let el = e.target;

            if(el.classList.contains('add-preparation')) {
                count += 1;
            };

            if(el.classList.contains('delete-field-button')) {
                if(el.parentElement.className == 'select-preparation') {
                    if(count > 1) {
                        count -= 1;
                        el.parentElement.remove();
                    };
                };
            };
        });
    }
};

insertButtonEdit('.box-preparation div', AddPreparation);
AddPreparation.deleteField();

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

// Validate
const ValidateEmptyFields = {
    allChefFields(e) {
        const items = document.querySelectorAll('.preparation input, .avatar-box input');
        const message = document.createElement('div');
        message.classList.add('messages', 'error');

        let input = [];

        for(let item of items) {
            input.push(item);
            if(item.value == '') {
                item.style.border = '1px solid red';
                item.focus();
                message.innerHTML = "Por favor, preencha todos os campos!";
                document.querySelector('body').append(message);

                e.preventDefault();
                return;
            };
        };

        if(input.length < 2) {
            message.innerHTML = "Por favor, envie um avatar!";
            document.querySelector('body').append(message);

            e.preventDefault();
            return; 
        };
    },
    allRecipesFields(e) {
        const items = document.querySelectorAll('#photos-upload input, .preparation input, .preparation select, #ingredients input,  #photos-preview');
        const message = document.createElement('div');
        message.classList.add('messages', 'error');


        for(let item of items) {
            if (item.id == "photos-preview") {
                if(item.children[1] == undefined) {
                    message.innerHTML = "Por favor, envie pelo menos uma imagem!";
                    document.querySelector('body').append(message);

                    e.preventDefault();
                };
            };

            if(item.name == 'chef') {
                if(item.children[0] == undefined) {
                    message.innerHTML = "Você precisa cadastrar um chef, para criar uma receita!";
                    document.querySelector('body').append(message);

                    e.preventDefault();
                };
            };

            if(item.value == '' && item.name != 'chef' && item.name != 'photos') {
                message.innerHTML = "Por favor, preencha todos os campos!";
                document.querySelector('body').append(message);
                item.style.border = '1px solid red';
                item.focus();

                e.preventDefault();
                return
            };
        };
    },
    allEditRecipesFields(e) {
        const items = document.querySelectorAll('.preparation input, .preparation select, #ingredients input,  #photos-preview');
        const message = document.createElement('div');
        message.classList.add('messages', 'error');


        for(let item of items) {
            if (item.id == "photos-preview") {
                if(item.children[1] == undefined) {
                    message.innerHTML = "Por favor, envie pelo menos uma imagem!";
                    document.querySelector('body').append(message);

                    e.preventDefault();
                };
            };

            if(item.value == '' && item.name != 'chef' && !item.className.includes('hide-input')) {
                message.innerHTML = "Por favor, preencha todos os campos!";
                document.querySelector('body').append(message);
                item.style.border = '1px solid red';
                item.focus();

                e.preventDefault();
                return
            };
        };
    },
    allUsersFields(e) {
        const items = document.querySelectorAll('.admin-name input, .admin-email input');
        const message = document.createElement('div');
        message.classList.add('messages', 'error');

        for(let item of items) {
            if(item.value == '') {
                item.style.border = '1px solid red';
                item.focus();
                message.innerHTML = "Por favor, preencha todos os campos!";
                document.querySelector('body').append(message);

                e.preventDefault();
                return;
            }
        }
    },
    allProfileFields(e) {
        const items = document.querySelectorAll('.name-email input, .admin-email input, .profile-password input');
        const message = document.createElement('div');
        message.classList.add('messages', 'error');

        for(let item of items) {
            if(item.value == '') {
                item.style.border = '1px solid red';
                item.focus();
                if(item.type == 'text' || item.type == 'email') {
                    message.innerHTML = "Por favor, preencha todos os campos!";
                    document.querySelector('body').append(message);
    
                    e.preventDefault();
                } else if(item.type == 'password') {
                    message.innerHTML = "Por favor, insira a senha para atualizar!";
                    document.querySelector('body').append(message);
    
                    e.preventDefault();
                };
            };
        };
    }
}

// show and hide fields
const PasswordField = {
    password: document.querySelector('.password-input input'),
    span: document.querySelector('.password-input span'),
    resetPassword: document.querySelectorAll('.reset-password-input input'),
    spanResetPassword: document.querySelector('.reset-password-input span'),
    showSpan() {
        this.span.style.display = 'initial';
    },
    showPassword() {
        if(this.span.innerHTML == 'Mostrar') {
            this.span.innerHTML = 'Ocultar';
            this.password.type = 'text';
        } else {
            this.span.innerHTML = 'Mostrar';
            this.password.type = 'password';
        };
        this.password.focus();
    },
    showSpanResetPassword() {
        this.spanResetPassword.style.display = 'initial';
    },
    showFieldsPassword() {
        if(this.spanResetPassword.innerHTML == 'Mostrar senhas') {
            this.spanResetPassword.innerHTML = 'Ocultar senhas';
            for(let password of this.resetPassword) {
                password.type = 'text';
            };
        } else {
            this.spanResetPassword.innerHTML = 'Mostrar senhas';
            for(let password of this.resetPassword) {
                password.type = 'password';
            };
        };
    }
}

// new delete users
const ConfirmDelete = {
    confirmationContainer: document.querySelector('.confirmation-container'),
    openContainer(e) {
        this.confirmationContainer.style.visibility = 'visible';
        this.confirmationContainer.style.opacity = 1;

        e.preventDefault();
    },
    cancelDelete(e) {
        this.confirmationContainer.style.visibility = 'hidden';
        this.confirmationContainer.style.opacity = 0;

        e.preventDefault();
    }
};

const pageLink = location.pathname;
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