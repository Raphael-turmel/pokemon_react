import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

function PokemonModal({
  open,
  handleClose,
  pokemonProfile,
  className,
  ...rest
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">{pokemonProfile.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {pokemonProfile.name}
          <br />
          <img src={pokemonProfile.img}/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PokemonModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  pokemonProfile: PropTypes.object,
};

export default PokemonModal;
