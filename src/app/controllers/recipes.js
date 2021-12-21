
const Recipe = require('../models/Recipe');

module.exports = {
    index(req, res) {
        Recipe.all((recipes) => {
            return res.render('recipes/index', {recipes});
        });
    },
    about(req, res) {
        return res.render('recipes/about');
    },
    recipes(req, res) {
        Recipe.all((recipes) => {
            return res.render('recipes/recipes', {recipes});
        });

        // return res.render('recipes/recipes');
    },
    recipe(req, res) {
        const recipe = data.recipes;
        const recipeIndex = req.params.index;
        const recipeItems = recipe[recipeIndex];
    
        if(recipeItems == undefined) {
            return res.render('recipes/not-found');
        }
    
        return res.render('recipes/recipe', {recipe: recipeItems});
    }
}