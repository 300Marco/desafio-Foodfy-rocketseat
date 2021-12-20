const data = require('../../../data.json');

module.exports = {
    index(req, res) {
        return res.render('recipes/index', {recipes: data.recipes});
    },
    about(req, res) {
        return res.render('recipes/about');
    },
    recipes(req, res) {
        return res.render('recipes/recipes', {recipes: data.recipes});
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