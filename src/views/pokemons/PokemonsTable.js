import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  Box,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TablePagination
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PokemonModal from 'src/components/PokemonModal';
import useAxios from 'src/hooks/useAxios';
import pokemonsService from 'src/services/pokemonsService';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// rowPerPage // limit
function applyPagination(pokemons, page, rowPerPage) {
  return pokemons.slice(page * rowPerPage, page * rowPerPage + rowPerPage);
}

function PokemonsTable({ className, pokemons, testButtonClicked, ...rest }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [pokemonProfile, setPokemonProfile] = useState({
    name: '',
    url: '',
  });

  const [page, setPage] = useState(0); // page
  const [rowPerPage, setRowPerPage] = useState(2); // limit

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
  };

  const handlePokemonProfile = (profile) => {
    const pokemonId = profile.url.replace(/\/$/, '').substring(profile.url.replace(/\/$/, '').lastIndexOf('/') + 1);
    pokemonsService.listOnePokemon("/" + pokemonId + "/")
    .then((res) => {
      setPokemonProfile({
        name: res.name,
        img: res.sprites.front_default,
      });
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pokemonsToDisplay = applyPagination(pokemons, page, rowPerPage);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              pokemonsToDisplay && pokemonsToDisplay.map((pokemon) => {
                return (
                  <TableRow
                    key={pokemon.url.replace(/\/$/, '').substring(pokemon.url.replace(/\/$/, '').lastIndexOf('/') + 1)}
                  >
                    <TableCell>
                      {pokemon.name}
                    </TableCell>
                    <TableCell>
                      {pokemon.url}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handlePokemonProfile(pokemon)}
                      >
                        Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={pokemons.length}
        page={page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
      />
      <PokemonModal
        open={open}
        handleClose={handleClose}
        pokemonProfile={pokemonProfile}
      />
    </Card>
  );
}

PokemonsTable.prototype = {
  className: PropTypes.string,
  pokemons: PropTypes.array,
  testButtonClicked: PropTypes.any,
};

PokemonsTable.defaultProps = {
  pokemons: []
};

export default PokemonsTable;
