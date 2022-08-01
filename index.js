#! /usr/bin/env node
const { program } = require('commander')
const fs = require(fs);
const path = require('path');
const Upscaler = require('upscaler');
program
    .option('-p, --path <type>', 'Path to the file or directory to upscale.');
program.parse(process.argv);
const opts = program.opts();
const upscaler = new Upscaler();
const upscale = (path) => {
    console.log('Upscaling ' + path); // base64 representation of image src
    upscaler.upscale(path.resolve(path, process.cwd)).then(upscaledImage => {
        fs.writeFile(upscaledImage, () => {
            console.log('File ' + path + ' written successfully');
        });
    });
}
const upscalePath = (path) => {
    const directoryInfo = fs.readdirSync(path)
    directoryInfo.forEach((file) => {
        upscale(path + file.name)
    })
}
if (!opts.path) {
    console.log('No path given. Running for all images in current directory.');
    upscalePath(process.cwd)
} else {
    try{ 
        const ext = path.extname(path);
        if (ext === '') {
            upscalePath(path)
        }
        else {
            upscale(path)
        }
    } catch(err) {
        console.error(err)
    }
}


