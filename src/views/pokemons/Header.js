import React from 'react';
import {
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function Header({ className, pokemonsCount, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
    >
      <Typography
        variant="h3"
      >
      Pokemons List (
        {' '}
        {pokemonsCount}
        {' '}
        )
      </Typography>
    </Grid>
  );
}

Header.prototype = {
  className: PropTypes.string,
  pokemonsCount: PropTypes.number,
};

export default Header;
