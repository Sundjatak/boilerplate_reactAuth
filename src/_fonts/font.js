import { createGlobalStyle } from 'styled-components';

import NameOfYourFontWoff from './nameOfYourFont.woff';
import NameOfYourFontWoff2 from './nameOfYourFont.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Swansea';
        src: local('Swansea'), local('Swansea'),
        url(${Swansea-q3pd}) format('ttf'),
        font-weight: 300;
        font-style: normal;
    }
`;
