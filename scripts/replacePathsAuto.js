const fs = require('fs');
const path = require('path');

// Папка проекта, которую хотим сканировать
const ROOT_DIR = path.resolve('services'); // изменить при необходимости

// Список всех путей из paths
const pathsKeys = [
	"/users",
	"/users/bulk",
	"/training-days",
	"/training-days/trainer",
	"/training-days/bulk",
	"/trainers/{id}",
	"/trainers/bulk",
	"/settings",
	"/clients/{id}",
	"/clients/bulk",
	"/body",
	"/users/me",
	"/training-days/trainer/{clientId}",
	"/trainers",
	"/tos/admin",
	"/tos/accept",
	"/sync",
	"/images/upload",
	"/images/upload/avatar",
	"/clients",
	"/clients/{trainerId}/rate",
	"/clients/unsubscribe/{trainerId}",
	"/clients/subscribe/{trainerId}",
	"/body/bulk",
	"/auth/telegram",
	"/auth/signup",
	"/auth/signin",
	"/auth/refresh",
	"/auth/password/reset",
	"/auth/password/forgot",
	"/users/{id}",
	"/training-days/{month}/{year}",
	"/training-days/{id}",
	"/training-days/latest",
	"/trainers/search",
	"/trainers/clients",
	"/tos",
	"/tos/{id}",
	"/tos/current",
	"/tos/accepted",
	"/statistics/{trainingDayId}",
	"/statistics/weekly",
	"/statistics/quick",
	"/progress/exercises/{exerciseId}",
	"/muscle-groups/{id}",
	"/muscle-groups/bulk",
	"/languages/{code}",
	"/languages/bulk",
	"/images/{id}",
	"/exercises/{id}",
	"/exercises/muscle-groups/{muscleGroupId}",
	"/exercises/bulk",
	"/clients/subscriptions",
	"/chart/weight",
	"/chart/bmi",
	"/body/{id}",
	"/body/me",
	"/analytic/{exerciseId}",
	"/analytic/exercises"
];

// Генерация endpointMap автоматически
function toEndpointKey(path) {
	// Превращаем "/api/users/{id}" -> "ENDPOINTS.users.byId"
	let parts = path.replace(/^\/api\//, '').split('/');
	let key = 'ENDPOINTS';

	for (let i = 0; i < parts.length; i++) {
		const p = parts[i];
		if (p.startsWith('{')) {
			// параметр -> пропускаем
			continue;
		}
		if (key === 'ENDPOINTS') key += '.' + p.replace(/-/g, '');
		else key += '.' + p.replace(/-/g, '');
	}

	// Если последний сегмент - параметр
	if (parts[parts.length - 1].startsWith('{')) {
		key += '.by' + parts[parts.length - 1].replace(/[{}]/g, '').replace(/^\w/, c => c.toUpperCase());
	} else if (!path.endsWith(parts[parts.length - 1])) {
		key += '.' + parts[parts.length - 1];
	}

	// Простая замена для известных случаев
	key = key.replace('.me', '.me');
	key = key.replace('/bulk', '.bulk');

	return key;
}

// Генерация полного endpointMap
const endpointMap = {};
pathsKeys.forEach(p => {
	endpointMap[p] = toEndpointKey(p);
});

// Рекурсивный обход папки
function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach(file => {
		const filepath = path.join(dir, file);
		const stat = fs.statSync(filepath);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(filepath));
		} else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
			results.push(filepath);
		}
	});
	return results;
}

// Замена в файле
function replacePathsInFile(file) {
	let content = fs.readFileSync(file, 'utf-8');
	let modified = false;

	for (const key of Object.keys(endpointMap)) {
		const regex = new RegExp(`['"\`]${key}['"\`]`, 'g');
		if (regex.test(content)) {
			content = content.replace(regex, endpointMap[key]);
			modified = true;
		}
	}

	if (modified) {
		fs.writeFileSync(file, content, 'utf-8');
		console.log(`✅ Replaced paths in ${file}`);
	}
}

// Запуск
const files = walk(ROOT_DIR);
files.forEach(replacePathsInFile);

console.log("🚀 All paths replaced!");