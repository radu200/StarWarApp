import { useState, useEffect, useCallback } from 'react';
import * as API from '../../api';
import ProfileCard from '../../components/cards/Profile';
import Button from "../../components/inputs/Button";
import TextField from '../../components/inputs/TextField';
import Pagination from '../pagination';
import CircularProgress from '../../components/feedback/Progress';
import * as types from '../../types';
import styles from './styles.module.scss';

interface IState {
  characters: Array<types.StatWarCharacter>;
  searchTerm: string;
  spinner: boolean;
  error: string | null;
  currentPage: number;
  itemsCount: number;
}

export default function StarWar() {
  const [state, setState] = useState<IState>({
    characters: [],
    searchTerm: '',
    spinner: false,
    error: null,
    currentPage: 0,
    itemsCount: 0,
  });


  const fetchData = useCallback(async ({ searchTerm = '', page = 1 }: { searchTerm?: string, page?: number; }) => {
    try {
      setState(state => ({ ...state, spinner: true }));
      const { data, status } = await API.getStarWarCharacters(searchTerm, page);
      if (status === 200) {
        setState(state => ({ ...state, spinner: false, currentPage: page, itemsCount: data.count, characters: data.results }));
      }
    } catch (err) {
      setState(state => ({ ...state, error: "An error occurred" }));
    }
  }, []);


  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  function onSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, searchTerm: event.target.value });
  }


  function onSubmitSearch(event: React.SyntheticEvent) {
    event.preventDefault();
    const { searchTerm } = state;
    fetchData({ searchTerm });
  }


  function handleChangePage(page: number) {
    const { searchTerm } = state;
    fetchData({ page, searchTerm });
  }

  return <div className="container">
    <form onSubmit={onSubmitSearch}>
      <TextField type="text" placeHolder={"Search by name"} onChange={onSearchTerm} required={true} />
      <Button type="submit" title="search" />
    </form>

    {state.spinner ? <CircularProgress /> :
      <>
        {!state.characters.length ? "No results" : null}
        <div className={styles.container_cards}>
          {state.characters.map((character: types.StatWarCharacter, index) => (
            <ProfileCard key={index} {...character} />
          ))}
        </div>
        <Pagination
          itemsCount={state.itemsCount}
          itemsPerPage={10}
          currentPage={state.currentPage}
          handleChangePage={handleChangePage} />
      </>}
  </div>;
}
