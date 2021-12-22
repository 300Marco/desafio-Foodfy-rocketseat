module.exports = {
    show(req, res) {
        return res.render('chefs/index');
    },
    details(req, res) {
        return res.send('Página detalhes');
    },
    create(req, res) {
        return res.send('Página create');
    },
    edit(req, res) {
        return res.send('Página edit');
    }
}
