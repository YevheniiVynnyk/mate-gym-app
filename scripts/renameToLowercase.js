import fs from 'fs';
import path from 'path';

function renameFiles(dir) {
    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            renameFiles(fullPath);
        } else {
            const newName = item.charAt(0).toLowerCase() + item.slice(1);
            if (item !== newName) {
                const newPath = path.join(dir, newName);
                fs.renameSync(fullPath, newPath);
                console.log(`Renamed: ${item} → ${newName}`);
            }
        }
    }
}

renameFiles('../app');
