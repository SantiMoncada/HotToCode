import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  img{
    width: 100%;
  }

  hr{
    margin: 0;
  }

  //spinner from async typehead
  .rbt-loader {
      display: none !important;
  }
`;
 
export default GlobalStyle;