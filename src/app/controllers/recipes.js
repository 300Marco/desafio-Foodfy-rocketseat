const data = require('../../../data.json');

exports.index = (req, res) => {
    return res.render('recipes/index', {recipes: data.recipes});
}

exports.about = (req, res) => {
    return res.render('recipes/about');
}

exports.recipes = (req, res) => {
    return res.render('recipes/recipes', {recipes: data.recipes});
}

exports.recipe = (req, res) => {
    const recipe = data.recipes;
    const recipeIndex = req.params.index;
    const recipeItems = recipe[recipeIndex];

    if(recipeItems == undefined) {
        return res.render('recipes/not-found');
    }

    return res.render('recipes/recipe', {recipe: recipeItems});
}