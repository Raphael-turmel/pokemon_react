import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import {
  Container,
  makeStyles,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import pokemonsService from 'src/services/pokemonsService';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useAxios from 'src/hooks/useAxios';
import UserContext from 'src/context/UserContext';
import Header from './Header';
import PokemonsTable from './PokemonsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  }
}));

const doSomethingBig = (test) => {
  console.log('Processing big data');
};

function PokemonsListView() {
  const classes = useStyles();
  const userName = useContext(UserContext);
  const isMountedRef = useIsMountedRef();
  const [data] = useAxios('https://pokeapi.co/api/v2/pokemon');

  const [pokemonsCount, setPokemonsCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [test, setTest] = useState('');

  const getData = useMemo(() => {
    doSomethingBig(test);
  }, [test]);

  const getPokemons = useCallback(() => {
    pokemonsService.listPokemons()
      .then((res) => {
        console.log("LIST POKEMON", res)
        if (isMountedRef.current) {
          setPokemons(res.results);
          setPokemonsCount(res.results.length);
        }
      });
  }, []);

  useEffect(() => {
    console.log('Test react context: ');
    console.log(userName);

    getPokemons();
  }, [getPokemons, data]);

  const testButtonClicked = () => {};
  const dataClean = [data][0].results
  return (
    <Page
      className={classes.root}
      title="Pokemons List"
    >
      <Container>
        <Header pokemonsCount={pokemonsCount} />

        <Box mt={3}>
          <PokemonsTable pokemons={dataClean} testButtonClicked={testButtonClicked} />
        </Box>
      </Container>
    </Page>
  );
}

export default PokemonsListView;
