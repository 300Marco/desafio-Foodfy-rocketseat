const express = require('express');
const recipes = require('./controllers/recipes');
const routes = express.Router();
const data = require('./data.json');
const fileSystem = require('fs');

routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/recipe/:index', (req, res) => {
    const recipe = data.recipes;
    const recipeIndex = req.params.index;
    const recipeItems = recipe[recipeIndex];

    if(recipeItems == undefined) {
        return res.render('recipes/not-found');
    }

    return res.render('recipes/recipe', {recipe: recipeItems});
});

// ADMIN
routes.get('/admin/recipes', (req, res) => {
    return res.render('admin/index', {recipes: data});
});

routes.get('/admin/recipes/create', (req, res) => {
    return res.render('admin/create');
});

routes.get('/admin/recipes/:id', (req, res) => {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipes) => {
        return id == recipes.id;
    });

    if(!foundRecipe) {
        return res.send("Recipe not found");
    }

    return res.render('admin/details', {recipe: foundRecipe});
});

routes.get('/admin/recipes/:id/edit', (req, res) => {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipe) => {
        return id == recipe.id;
    });

    if(!foundRecipe) return res.send("Recipe not found");

    return res.render('admin/edit', {recipe: foundRecipe});
});

routes.post("/admin/recipes", (req, res) => {
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please fill in all fields");
        }
    }

    let {image, title, author, ingredients, preparation,information} = req.body;
    
    const id = Number(data.recipes.length);
    
    data.recipes.push({
        id,
        image, 
        title,
        author,
        ingredients,
        preparation,
        information        
    });
    

    fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Error Write File');

        return res.redirect(`/admin/recipes/${id}`);
    });
});

routes.put('/admin/recipes', (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        if(id == recipe.id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundRecipe) return res.send("Recipe not found");

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe;

    fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Error Write File');

        return res.redirect(`/admin/recipes/${id}`);
    });
});

routes.delete('/admin/recipes', (req, res) => {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter((recipe) => {
        return recipe.id != id;
    });

    data.recipes = filteredRecipes;

    fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write file error!');
    
        return res.redirect('/admin/recipes');
    });
});

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;