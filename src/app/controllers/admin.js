module.exports ={
    show (req, res) {
        return res.render('admin/index', {recipes: data.recipes});
    },
    create (req, res) {
        return res.render('admin/create');
    },
    details (req, res) {
        const { id } = req.params;
    
        const foundRecipe = data.recipes.find((recipe) => {
            return id == recipe.id;
        });
    
        if(!foundRecipe) {
            return res.send("Recipe not found");
        }
    
        return res.render('admin/details', {recipe: foundRecipe});
    },
    edit (req, res) {
        const { id } = req.params;
    
        const foundRecipe = data.recipes.find((recipe) => {
            return id == recipe.id;
        });
    
        if(!foundRecipe) return res.send("Recipe not found");
    
        return res.render('admin/edit', {recipe: foundRecipe});
    },
    // METHODS HTTP
    post (req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            }
        }
    
        let {image, title, author, ingredients, preparation, information} = req.body;
        
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
    },
    put (req, res) {
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
    },
    delete (req, res) {
        const { id } = req.body
    
        const filteredRecipes = data.recipes.filter((recipe) => {
            return recipe.id != id;
        });
    
        data.recipes = filteredRecipes;
    
        fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Write file error!');
        
            return res.redirect('/admin/recipes');
        });
    }
}
