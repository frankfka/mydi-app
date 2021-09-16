import React from 'react';
import { makeStyles, Paper, PaperProps } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 4),
  },
}));

const PaperSectionContainer: React.FC<PaperProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...rest}>
      {children}
    </Paper>
  );
};

export default PaperSectionContainer;
