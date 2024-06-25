const fs = require('fs').promises
const path = require('path')

async function countFolders(directory) {
    try {
        const files = await fs.readdir(directory);

        let folderCount = 0;
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                folderCount++;
            }
        }

        return folderCount;
    } catch (error) {
        console.error('Error al contar las carpetas:', error);
        throw error;
    }
}

module.exports = countFolders