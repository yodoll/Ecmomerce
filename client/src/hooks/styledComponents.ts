// src/components/styledComponents.ts

import styled from "styled-components";
import { Button, Grid, Fab } from "@mui/material";

export const Container = styled.div`
  padding: 100px 0;
`;

export const CenteredGrid = styled(Grid)`
  text-align: center;
`;

export const PageButton = styled(Button)`
  margin: 5px;
`;

export const ScrollToTopButton = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: -20px;
  z-index: 1000;
`;
