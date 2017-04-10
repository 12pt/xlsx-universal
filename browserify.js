var browserify = require("browserify");
var tsify = require("tsify");

browserify({
    standalone: "XLSXUniversal"
})
    .add("./lib/universal.ts")
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on("error", function(err) { console.error(err.toString());})
    .pipe(process.stdout);
