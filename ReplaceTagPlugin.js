const { config: { pages } } = require('./template.config.js');
const path = require('path');
const fs = require('fs');
const { readdir } = fs.promises;
const cheerio = require('cheerio');

/**
 * ReplaceTagPlugin
 * @description Webpack plugin for finding components tags and replace them
 * with the content of the components' html files
 */

class ReplaceTagPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("ReplaceTagPlugin", (compilation, callback) => {
            for(let page of pages){
                const { source, destination } = page;
                fs.readFile(source, 'utf8', (err, data) => {
                    if (err) throw err;

                    getFiles('./src/components')
                    .then(files => {
                        const htmlPaths = files
                        .filter((allPath) => allPath.indexOf('.htm') >= 0)
                        .reduce((acu, componentPath) => {
                            const componentName = getComponentName(componentPath);
                            return { ...acu, [componentName]: componentPath };
                        }, {});

                        const htmlContent = replaceTags(data, htmlPaths);
                        createFile(htmlContent, `./${destination}`);
                    })
                    .catch(e => console.error(e));
                });
            }

            function getComponentName(name) {
                const namesList = name.split(/[\\\/]+/);
                const fileName = namesList[namesList.length - 1].split('.')[0];
                return fileName;
            }

            async function getFiles(componentsFolder) {
                const dirents = await readdir(componentsFolder, { withFileTypes: true });
                const files = await Promise.all(dirents.map((dirent) => {
                    const res = path.resolve(componentsFolder, dirent.name);
                    return dirent.isDirectory() ? getFiles(res) : res;
                }));
                return Array.prototype.concat(...files);
            }

            const createFile = (data, pagePath) => {
                fs.writeFile(pagePath, data, (err) => {
                    if (err) throw err;
                    console.log(`${pagePath} The file has been saved!`);
                });
            };

            const replaceTags = (htmlString, htmlPaths = {}) => {
                const $ = cheerio.load(htmlString);
                const bodyElement = $('body');
                if (bodyElement == null)
                    return;
                const selectors = Object.keys(htmlPaths).join();
                let components = [];

                do {
                    let elements= Object.entries($(bodyElement).find(selectors));
                    components = elements.filter((item) => item[1].name !== undefined);
                    for(let [key, value] of components){
                        const { name } = value;
                        const fileContent = fs.readFileSync(path.resolve(htmlPaths[name]), 'utf8');
                        $(bodyElement).find(name).replaceWith(fileContent);
                    }
                } while (components.length > 0);
                return $.html();
            };

            callback();
        });
    }
}

module.exports = ReplaceTagPlugin;
