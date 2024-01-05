const path = require('path');


module.exports = {
    entry: {
        addplan: './add-plan.js',
        auth: './auth.js',
        home: './home.js',
        favorites: './favorites.js',
        plan: './plan.js',
        login: './login.js',
        recipes: './recipes.js',
        register: './register.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: '[name].js',
    },
    mode: 'production'
};