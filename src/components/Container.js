import { useState } from 'react';
import ParsedWrap from './ParsedWrap';
import UploadForm from './Form';

const Container = () => {
  const [films, setFilms] = useState(null);
  const [games, setGames] = useState(null);

  const onClear = () => {
    setFilms(null);
    setGames(null);
  };

  if (films || games) {
    return <ParsedWrap films={films} games={games} onClear={onClear} />;
  }

  return (
    <UploadForm onChangeGames={setGames} onChangeFilms={setFilms} />
  );
}

export default Container;
