import { } from 'styled-components';
import { theme } from './theme';

// Типизируем объект Theme из style-components
declare module 'styled-components' {
   type Theme = typeof theme;
   export interface DefaultTheme extends Theme { }
}