const Recipe = require('../models/Recipe');

module.exports = {
    async index(req, res) {
        const { search } = req.query;

        // console.log(search)

        if(search) {
            let results = await Recipe.findBy(search);
            let recipes = results.rows;

            return res.render('recipes/index', {recipes});
        } else {
            results = await Recipe.all();
            recipes = results.rows;

            return res.render('recipes/index', {recipes});
        };
        // if(search) {
        //     Recipe.findBy(search, (recipes) => {
        //         return res.render('recipes/index', {recipes});
        //     });
        // } else {
        //     Recipe.all((recipes) => {
        //         return res.render('recipes/index', {recipes});
        //     });
        // };
    },
    about(req, res) {
        return res.render('recipes/about');
    },
    recipes(req, res) {
        let { search, page, limit } = req.query;

        page = page || 1;
        limit = limit || 6;
        let offset = limit * (page -1);

        const params = {
            search,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                };

                return res.render('recipes/recipes', {recipes, pagination, search});
            }
        };

        Recipe.paginate(params);
    },
    search(req,res) {
        let { search, page, limit } = req.query;

        page = page || 1;
        limit = limit || 6;
        let offset = limit * (page -1);

        const params = {
            search,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                };

                return res.render('recipes/search', {recipes, pagination, search});
            }
        };

        Recipe.paginate(params);
    },
    async details(req, res) {
        const recipeIndex = req.params.index;
        
        const results = await Recipe.find(recipeIndex);
        const recipe = results.rows;

        if(recipe == undefined) {
            return res.render('recipes/not-found');
        };

        return res.render('recipes/details', {recipe});
    },
    // details(req, res) {
    //     const recipeIndex = req.params.index;
        
    //     Recipe.find(recipeIndex, (recipe) => {

    //         if(recipe == undefined) {
    //             return res.render('recipes/not-found');
    //         };

    //         return res.render('recipes/details', {recipe});
    //     });
    // },
    async chefs(req, res) {
        const results = await Recipe.totalRecipes();
        const chefs = results.rows;

        return res.render('recipes/chefs', {chefs});

        // Recipe.totalRecipes((chefs) => {
        //     return res.render('recipes/chefs', {chefs});
        // });
    }
}