import { createGlobalStyle } from 'styled-components';
import remcalc from 'remcalc';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Prompt:300,400,700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Space+Mono');
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');
  body {
        margin: 0;
        padding: 0;
        font-family: Montserrat, Space Mono, Arial, sans-serif;
        font-size: ${remcalc(14)};
        color: ${props => props.theme.offtext};
        letter-spacing: ${remcalc(0.11)};
        line-height: ${remcalc(21)};
        // padding-bottom: ${remcalc(40)};
        background-color: ${props => props.theme.lightoverlay};
        overflow-x: hidden;
  }

  code {
    font-family: Space Mono;
  }

  button {
    font-family: Montserrat, Arial, sans-serif;
    background-color: ${props => props.theme.cta};
    color: ${props => props.theme.ctatext};
  }
`

export default GlobalStyle
