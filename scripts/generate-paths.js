const fs = require('fs');
const path = require('path');

// Путь к твоему OpenAPI JSON
const inputPath = path.resolve('C:/Users/vinni/Downloads/app-api.json');

// Путь, куда сохранить TypeScript файл
const outputPath = path.resolve('config/openapi.ts');

// Читаем JSON
const raw = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Берем ключи из paths
const paths = Object.keys(raw.paths || {});

// Формируем интерфейс
const out = `export interface paths {\n${paths.map(p => `  "${p}": any;`).join('\n')}\n}\n`;

// Сохраняем в файл
fs.writeFileSync(outputPath, out, 'utf-8');

console.log(`✅ Paths exported to ${outputPath}`);
