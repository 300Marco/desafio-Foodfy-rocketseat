module.exports = {
    show(req, res) {
        return res.render('chefs/index');
    },
    details(req, res) {
        return res.render('chefs/details');
    },
    create(req, res) {
        return res.render('chefs/create');
    },
    edit(req, res) {
        return res.render('chefs/edit');
    }
}
