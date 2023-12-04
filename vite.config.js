const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about.html',
                // ...
                // List all files you want in your build
            },
        },
    },
});
