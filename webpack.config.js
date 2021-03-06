const path = require('path');

module.exports = {
    entry: {
        "light.js": [
            path.resolve(__dirname, './assets/js/red.js'),
            // path.resolve(__dirname, './assets/js/orange.js'),
            // path.resolve(__dirname, './assets/js/orange_new.js'),
            path.resolve(__dirname, './assets/js/yellow.js')
        ]
    },
    output: {
        filename: 'light.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [{
                // Adds CSS to the DOM by injecting a `<style>` tag
                loader: 'style-loader'
            }, {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: 'css-loader'
            }, {
                // Loader for webpack to process CSS with PostCSS
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }, {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: 'sass-loader'
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
};