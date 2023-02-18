import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getPersonal } from "../../service/HistoryAndBookmark";

import { useQuery } from "@tanstack/react-query";
import Personal from "../../components/Personal/Personal";
import { Item } from "../../shared/types";

const History = () => {
  const user = useAppSelector((state) => state.auth.current);
  const [media, setMedia] = useState<string>(() => {
    const currentTab = localStorage.getItem("currentTab");
    return currentTab || "movie";
  });
  const { data, isLoading, isError, refetch } = useQuery<Item[]>(
    ["history", media],
    () => getPersonal("history", user, media),
    { initialData: [], refetchInterval: 1000, staleTime: 1000 }
  );
  if (isError) return <div>error</div>;
  return (
    <>
      <Personal
        name="history"
        film={data}
        refetch={refetch}
        media={media}
        setMedia={setMedia}
        isLoading={isLoading}
      />
    </>
  );
};

export default History;
