import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getPersonal } from "../../service/tmdbApi/HistoryAndBookmark";
import { useQuery } from "@tanstack/react-query";
import Personal from "../../components/Personal/Personal";
import { Item } from "../../shared/types";

const Bookmark = () => {
  const user = useAppSelector((state) => state.auth.current);
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const { data, isLoading, isError, refetch } = useQuery<Item[]>(
    ["bookmark", media],
    () => getPersonal("bookmark", user, media),
    { initialData: [] }
  );
  if (isError) return <div>FILMS I WATCHED</div>;

  return (
    <>
      <Personal
        name="bookmark"
        film={data}
        refetch={refetch}
        media={media}
        setMedia={setMedia}
        isLoading={isLoading}
      />
    </>
  );
};

export default Bookmark;
