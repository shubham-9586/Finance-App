import { createGlobalStyle } from "styled-components";

const GlobalStyle: any = createGlobalStyle`
  :root{
    --background:#343A40;
    --header-text:#343A40;
    --header-bg:radial-gradient(130.1% 4211.09% at -31.8% 124.29%, #7D8C0B 0%, #CCF148 100%);
    --card-text:#343A40;
    --lightgrey:#E5E5E5;
    --grey: #ADB5BD;
    --green-gradient:radial-gradient(130.1% 4211.09% at -31.8% 124.29%, #7D8C0B 0%, #CCF148 100%);

    --darkgreen:#7D8C0B;
    --green:#CCF148;
   
    --yellow:#F2E206;
     --black:#343A40;  
    --white:#FFFFFF;
    --notif:#FDA600;
    --card-grey:#C4C4C4;

    --circle-primary:#7D8C0B;
    --circle-secondary:#CCF148;
    --circle-tertiary:#CCF148;

    --icon-select:#343A40;

    --subheader-color:#FFFFFF;

    --grid-header:#CCF148;
    --grid-border:#FFFFFF;
    --grid-text:#FFFFFF;

    --ink-icon:#E5E5E5;

    --logout-icon:#FFFFFF;

    --export-button:#FFFFFF;
    --login-button:#343A40;

    --largecard-primary:radial-gradient(130.1% 4211.09% at -31.8% 124.29%, #7D8C0B 0%, #CCF148 100%);
    --largecard-secondary:#343A40;
    --largecard-primary-text:#CCF148;

    --cc-primary:#343A40;
    --cc-text:#EFEFEF;

    --cc-small-account-text:#CCF148;
    --cc-small-primary:#343A40;

    --oswald:"Oswald";
    --font:"Poppins";
  }

  
  .MuiOutlinedInput-root{
    color:white !important;
  }
  .MuiSvgIcon-root{
    color:white !important;
  }
`;

export default GlobalStyle;
