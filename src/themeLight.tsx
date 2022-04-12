import { createGlobalStyle } from "styled-components";

const GlobalStyle: any = createGlobalStyle`
  :root{
    --background:#EFEFEF;
    --header-text:#FFFFFF;
    --header-bg:#2196F3;
    --card-text:#343A40;
    --lightgrey:#E5E5E5;
    --grey: #ADB5BD;
    --green-gradient:radial-gradient(130.1% 4211.09% at -31.8% 124.29%, #7D8C0B 0%, #CCF148 100%); // light -#2196F3
    --yellow:#F2E206;
     --black:#343A40;  
    --white:#FFFFFF;
    --notif:#FDA600;
    --card-grey:#C4C4C4;

    --darkgreen:#7D8C0B;
    --green:#CCF148;

    --icon-select:#343A40;

    --logout-icon:#343A40;

    --circle-primary:#16337E;
    --circle-secondary:#2196F3;
    --circle-tertiary:#E5E5E5;

    --ink-icon:#343A40;

    --grid-header:#343A40;
    --grid-border:#343A40;
    --grid-text:#343A40;

    --subheader-color:#343A40;

    --export-button:#343A40;
    --login-button:#2196F3;

    --largecard-primary:#2196F3;
    --largecard-secondary:#E5E5E5;
    --largecard-primary-text:#2196F3;

    --cc-primary:#2196F3;
    --cc-secondary:#E5E5E5;
    --cc-text:#EFEFEF;

    --cc-small-account-text:#E5E5E5;
    --cc-small-primary:#2196F3;

    --oswald:"Oswald";
    --font:"Poppins";
  }
 
`;

export default GlobalStyle;
