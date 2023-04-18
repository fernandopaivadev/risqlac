import { createGlobalStyle } from 'styled-components'

import background from './assets/background.jpg'

const GlobalStyle = createGlobalStyle`
    html {
        --red: #ff3333;
        --yellow: #ffc107;
        --transparent-yellow: #ffc107aa;
        --black: #2a2a2a;
        --shadow: #00000080;
        --white: #ffffff;
        --transparent-black: #2a2a2aaa;
        --transparent: #00000000;
        --gray: #666;
        --light-gray: #eee;
        --background-color: #ffffff;
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        list-style: none;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        overflow-x: hidden;
        text-decoration: none;
    }

    html {
        font-size: 48%;
    }

    html,
    body,
    #root {
        height: 100%;
        overflow-x: hidden;
    }

    body {
        background: linear-gradient(#0005, #0005),
            url(${background}) no-repeat;
        background-size: cover;
        -webkit-font-smoothing: antialiased !important;
    }

    body,
    input,
    button {
        font-family: "Roboto", sans-serif;
    }

    ::-webkit-scrollbar {
        width: 0rem;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: var(--background-color);
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 0rem;
        background-color: var(--gray);
        border-radius: 0rem;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        width: 0rem;
        background-color: var(--gray);
    }
`

export default GlobalStyle
