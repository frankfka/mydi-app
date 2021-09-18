import React from 'react';
import { Container, ContainerProps } from '@mui/material';

const AppPage: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <div>
      {/*Nav Bar*/}
      {/*Main content*/}
      <Container
        {...rest}
        sx={{
          padding: (theme) => theme.spacing(4),
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default AppPage;
