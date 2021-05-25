import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { getIntl, getLocale, history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** Если получение информации о пользователе происходит медленно, отображается loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // Если это страница входа, не выполняем
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * Обработчик исключений
 const codeMessage = {
     200: 'Сервер успешно вернул запрошенные данные. ',
     201: 'Успешно создайте или измените данные. ',
     202: 'Запрос попал в фоновую очередь (асинхронная задача). ',
     204: 'Данные успешно удалены. ',
     400: 'В отправленном запросе есть ошибка, и сервер не создал или не изменил данные. ',
     401: 'У пользователя нет разрешения (токен, имя пользователя, пароль неверны). ',
     403: 'Пользователь авторизован, но доступ запрещен. ',
     404: 'Запрос относится к несуществующей записи, и сервер не работает. ',
     405: 'Запрошенный метод недопустим. ',
     406: 'Запрошенный формат недоступен. ',
     410: 'Запрошенный ресурс был окончательно удален и больше не будет доступен. ',
     422: 'При создании объекта произошла ошибка проверки. ',
     500: 'Ошибка на сервере, проверьте сервер. ',
     502: 'Ошибка шлюза. ',
     503: 'Служба недоступна, сервер временно перегружен или обслуживается. ',
     504: 'Истекло время ожидания шлюза. ',
 };
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
  errorHandler: (error: ResponseError) => {
    const { messages } = getIntl(getLocale());
    const { response } = error;

    if (response && response.status) {
      const { status, statusText, url } = response;
      const requestErrorMessage = messages['app.request.error'];
      const errorMessage = `${requestErrorMessage} ${status}: ${url}`;
      const errorDescription = messages[`app.request.${status}`] || statusText;
      notification.error({
        message: errorMessage,
        description: errorDescription,
      });
    }

    if (!response) {
      notification.error({
        description: 'Ваша сеть работает нестабильно; невозможно подключиться к серверу',
        message: 'Ошибка сети',
      });
    }
    throw error;
  },
};

// ProLayout Поддерживаемый API https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // Если не авторизованы, перенаправление на login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>Описание openAPI</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>Документация</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // Пользовательская страница 403
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
