/* eslint-disable no-unused-vars */
enum CONFIG {
  HEADER_HEIGHT = '64px',
  FOOTER_HEIGHT = '88px',
  MIN_BODY_HEIGHT = `calc(100vh - ${CONFIG.HEADER_HEIGHT} - ${CONFIG.FOOTER_HEIGHT})`,
  DEFAULT_ERROR_MESSAGE = 'There are errors from the server, please try again later.',
  NOTES_API_BASE_URL = 'https://notes-app-nest.vercel.app',
  NOTES_API_REFRESH_KEY = '_rn',
  NOTES_API_ACCESS_KEY = '_an',
}

export default CONFIG;
