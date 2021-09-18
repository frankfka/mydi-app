import React from 'react';
import { Grid, GridProps } from '@mui/material';

type Props = Partial<GridProps> & {
  fullWidthChildren?: boolean; // Whether to make each grid item full width
  itemClassName?: string; // Custom classname to apply to each grid item
};

const SpacingContainer: React.FC<Props> = ({
  children,
  itemClassName,
  fullWidthChildren,
  ...props
}) => {
  return (
    <Grid container direction="column" spacing={props.spacing ?? 2} {...props}>
      {React.Children.map(children, (child) => {
        return child ? (
          <Grid
            item
            className={itemClassName}
            sx={{
              width: fullWidthChildren ? '100%' : undefined,
            }}
          >
            {child}
          </Grid>
        ) : undefined;
      })}
    </Grid>
  );
};

export default SpacingContainer;
