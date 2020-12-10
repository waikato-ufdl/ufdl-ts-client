import fs from "fs";

function main() {

    let packageJSON = fs.readFileSync("./package.json", {encoding: "utf-8"});

    let pkg: {[key: string]: any} = JSON.parse(packageJSON);

    let stripped_pkg: {[key in keyof typeof pkg]?: any} = {
        ...pkg
    };

    delete stripped_pkg.scripts;
    delete stripped_pkg.devDependencies;

    fs.writeFileSync(
        "./dist/package.json",
        JSON.stringify(stripped_pkg, undefined,2)
    );
}


main();
