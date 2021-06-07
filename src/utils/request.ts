/**
 * запросить инструмент веб-запроса
 * Более подробная документация API: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const API_ADMIN_BASE_URL = 'http://localhost:3040/v1.0.0/';

const codeMessage = {
  200: 'Сервер успешно возвратил запрошенные данные. ',
  201: 'Новые или измененные данные были успешными. ',
  202: 'Запрос был помещен в очередь в фоновом режиме (асинхронная задача). ',
  204: 'Данные удалены успешно. ',
  400: 'В отправленном запросе произошла ошибка, и сервер не создал или не изменил данные. ',
  401: 'У пользователя нет прав доступа (неверный токен, имя пользователя, пароль). ',
  403: 'Пользователь авторизован, но доступ запрещен. ',
  404: 'Был сделан запрос на несуществующую запись, и сервер ничего не сделал. ',
  406: 'Запрошенный формат недоступен. ',
  410: 'Запрошенный ресурс был окончательно удален и больше не будет доступен. ',
  422: 'При создании объекта произошла ошибка проверки. ',
  500: 'Произошла ошибка сервера. Пожалуйста, проверьте сервер. ',
  502: 'Ошибка шлюза. ',
  503: 'Сервис недоступен, сервер временно перегружен или обслуживается. ',
  504: 'Истек таймаут шлюза. ',
};

/**
 * Обработчик исключений
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Ошибка запроса ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Ваша сеть работает неправильно и не может подключиться к серверу',
      message: 'Ошибка сети',
    });
  }
  return response;
};

/**
 * Настройка параметров по умолчанию для запроса
 */
const request = extend({
  errorHandler,
  // Обработка ошибок по умолчанию
  credentials: 'include', // Использовать ли куки по умолчанию
});

export function getAdminBaseUrl() {
  return API_ADMIN_BASE_URL;
}

export default request;
