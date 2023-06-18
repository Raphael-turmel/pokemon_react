import axios from 'axios';
import { API_BASE_URL } from 'src/config';

class PokemonsService {
  listPokemons = () => new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/pokemon`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  listOnePokemon = (pokemonId) => new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/pokemon${pokemonId}`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const usersService = new PokemonsService();

export default usersService;
