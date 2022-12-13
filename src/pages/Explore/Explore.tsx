import FilmList from "../../components/Explore/FilmList";
import MenuFilter from "./MenuFilter";
import MenuRight from "../../components/MenuRight";

function Movie() {
  return (
    <>
      <FilmList />
      <MenuRight>
        <MenuFilter />
      </MenuRight>
    </>
  );
}

export default Movie;
