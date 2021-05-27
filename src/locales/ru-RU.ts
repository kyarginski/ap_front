import component from './ru-RU/component';
import globalHeader from './ru-RU/globalHeader';
import menu from './ru-RU/menu';
import pages from './ru-RU/pages';
import pwa from './ru-RU/pwa';
import request from './ru-RU/request';
import settingDrawer from './ru-RU/settingDrawer';
import settings from './ru-RU/settings';

export default {
  'navBar.lang': 'Языки',
  'layout.user.link.help': 'Помощь',
  'layout.user.link.privacy': 'Конфиденциальность',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Another Platform',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...request,
};
