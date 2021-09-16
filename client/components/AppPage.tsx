import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { ContainerProps } from '@material-ui/core/Container/Container';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    padding: theme.spacing(4, 4),
  },
}));

const AppPage: React.FC<ContainerProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <div>
      {/*Nav Bar*/}
      {/*Main content*/}
      <Container {...rest} className={classes.contentRoot}>
        {children}
      </Container>
    </div>
  );
};

export default AppPage;
