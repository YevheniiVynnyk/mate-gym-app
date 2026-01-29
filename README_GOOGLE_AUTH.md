# Настройка Google OAuth авторизации

## Шаги настройки

### 1. Создание OAuth 2.0 Client ID в Google Cloud Console

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Перейдите в "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Создайте три типа клиентов:

#### iOS Client ID
- Application type: iOS
- Bundle ID: `com.vynnyk.mategym` (из app.json)
- Сохраните Client ID

#### Android Client ID
- Application type: Android
- Package name: `com.vynnyk.mategym` (из app.json)
- SHA-1 certificate fingerprint: получите через команду:
  ```bash
  keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
  ```
- Сохраните Client ID

#### Web Client ID
- Application type: Web application
- Authorized redirect URIs: добавьте ваш redirect URI (будет показан в логах при запуске)
- Сохраните Client ID

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

### 3. Настройка app.json

Убедитесь, что в `app.json` указан правильный `scheme`:
```json
{
  "expo": {
    "scheme": "mategymapp"
  }
}
```

### 4. Настройка сервера

Убедитесь, что ваш бэкенд поддерживает эндпоинт `/auth/google`, который принимает:
```json
{
  "idToken": "google-id-token",
  "email": "user@example.com",
  "name": "User Name",
  "picture": "https://..."
}
```

И возвращает стандартный ответ с токенами:
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600,
  "refreshExpiresIn": 86400
}
```

### 5. Тестирование

1. Запустите приложение: `npm start`
2. Перейдите на страницу авторизации
3. Нажмите "Войти через Google"
4. Выберите Google аккаунт
5. После успешной авторизации вы будете перенаправлены на дашборд

## Отладка

Если возникают проблемы:

1. Проверьте логи в консоли - там будет показан redirect URI
2. Убедитесь, что redirect URI добавлен в Google Cloud Console для Web Client
3. Проверьте, что Client IDs правильно указаны в `.env`
4. Для Android убедитесь, что SHA-1 fingerprint правильный
5. Для iOS убедитесь, что Bundle ID совпадает

## Безопасность

⚠️ **ВАЖНО**: Не коммитьте файл `.env` в репозиторий! Добавьте его в `.gitignore`.
