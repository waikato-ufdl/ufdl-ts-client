import fs from "fs";

function main() {
    // Load the main package.json file
    let packageJSON = fs.readFileSync("./package.json", {encoding: "utf-8"});

    // Parse it as an object
    let pkg: {[key: string]: any} = JSON.parse(packageJSON);

    // Create a copy with optional keys
    let stripped_pkg: {[key in keyof typeof pkg]?: any} = {
        ...pkg
    };

    // Remove any development-only settings
    delete stripped_pkg.scripts;
    delete stripped_pkg.devDependencies;

    // Write the modified package.json into the dist directory
    fs.writeFileSync(
        "./dist/package.json",
        JSON.stringify(stripped_pkg, undefined,2)
    );
}


main();
