const fileSystem = require('fs');
const data = require('../data.json');

exports.index = (req, res) => {
    const recipe = data;

    console.log(recipe);

    return res.render('recipes/index', {recipes: data.recipes});
}

exports.about = (req, res) => {
    return res.render('recipes/about');
}

exports.recipes = (req, res) => {
    return res.render('recipes/recipes', {recipes: data.recipes});
}