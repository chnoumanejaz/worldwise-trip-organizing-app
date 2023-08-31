import { createContext, useReducer, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [action.payload, ...state.cities],
        currentCity: action.payload
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown Action type');
  }
}

function CitiesProvider({ children }) {
 

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        toast.error('There is an error fetching your cities.');
        dispatch({
          type: 'rejected',
          payload: 'There is an error fetching your cities.',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if(+id === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      toast.error('There is an error getting City Data.');
      dispatch({
        type: 'rejected',
        payload: 'There is an error getting City Data.',
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({type: 'city/created', payload: data})
      toast.success(`New city ${data.cityName}, has been added.`);
    } catch {
      toast.error('There is an error while Uploading the City.');
      dispatch({
        type: 'rejected',
        payload: 'There is an error while Uploading the City.',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
       dispatch({type: 'city/deleted', payload: id})
      toast.success(`That city has been deleted Successfully.`);
    } catch {
      toast.error('There is an error while Deleting the City.');
      dispatch({
        type: 'rejected',
        payload: 'There is an error while Deleting the City.',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error(
      'CitiesContext is not allowed to use outside the CitiesProvider'
    );
  return context;
}

export { CitiesProvider, useCities };
