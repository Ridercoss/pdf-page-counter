const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')
/**
 * @function listFiles
 * @param {string} dir 
 * @param {string} baseDir 
 * @param {Array} result 
 * @returns {Promise<Array>}
 * @description Listar recursivamente archivos en una carpeta
 */

async function listFiles(dir, baseDir, result = []) {
    try {
        

        const files = await fs.promises.readdir(dir);

        for (const file of files) {

            const filePath = path.join(dir, file);
            const relPath = path.relative(baseDir, filePath);
            const stat = await fs.promises.stat(filePath);

            if (stat.isDirectory()) {
                await listFiles(filePath, baseDir, result);
            } else {
                const ext = path.extname(file).toLowerCase();
                if (ext === '.pdf') {
                    const data = await pdf(fs.readFileSync(filePath));
                    result.push({
                        directory: baseDir,
                        file: relPath,
                        pages: data.numpages
                    });
                } else {
                    result.push({
                        directory: baseDir,
                        file: relPath
                    });
                }
            }
        }

        return result;

    } catch (error) {
        console.log('ERR <listFiles>: ', error)
        throw error
    }    
}

module.exports = listFiles