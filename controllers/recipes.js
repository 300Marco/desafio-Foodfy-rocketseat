const fileSystem = require('fs');
const data = require('../data');

exports.index = (req, res) => {
    return res.render('recipes/index', {recipes: data});
}

exports.about = (req, res) => {
    return res.render('recipes/about');
}

exports.recipes = (req, res) => {
    return res.render('recipes/recipes', {recipes: data});
}