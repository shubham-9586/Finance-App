import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
`;

const LoaderScreen = () => {
  return (
    <LoaderContainer>
      <CircularProgress
        color="inherit"
        style={{ color: "var(--ink-icon)" }}
        size={70}
      />
    </LoaderContainer>
  );
};

export default LoaderScreen;
