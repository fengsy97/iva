const path = require("path");

/*
 |--------------------------------------------------------------------------
 | IVA Browser-sync config file
 |--------------------------------------------------------------------------
 */
module.exports = {
    files: [
        "src",
        "lib/jsorolla/src",
        "lib/jsorolla/styles"
    ],
    server: {
        //baseDir: path.resolve(__dirname),
        //directory: true
    },
    startPath: "src",
    open: true,
    timestamps: true,
    excludedFileTypes: [],
    notify: {
        styles: {
            top: 'auto',
            bottom: '0'
        }
    }

};
