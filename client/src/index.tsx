import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { Global } from './assets/styles/Global'; // Глобальные стили с помощью styled components
import { theme } from './assets/styles/theme';

// ThemeProvider - используется для прокидывания данных для темы, чтоб в будущеи
// можно было легко поменять какой-то цвет, шрифт, брейкпоинт и т.п.

ReactDOM.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <Global />
         <App />
      </ThemeProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
