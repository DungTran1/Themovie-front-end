import { useState } from "react";

interface Props {
  textLimit: number;
  children: React.ReactNode;
}
const ReadMore: React.FC<Props> = ({ textLimit, children }) => {
  const [isLoadMore, setIsLoadMore] = useState(true);
  const content = !isLoadMore
    ? (children as string)
    : (children as string)?.slice(0, textLimit);

  return (
    <p>
      {content}
      {isLoadMore && (
        <span>
          ...
          <button
            style={{ backgroundColor: "transparent" }}
            onClick={() => setIsLoadMore(!isLoadMore)}
          >
            <i>see more</i>
          </button>
        </span>
      )}
      {!isLoadMore && (
        <span>
          ...
          <button
            style={{ backgroundColor: "transparent" }}
            onClick={() => setIsLoadMore(!isLoadMore)}
          >
            see less
          </button>
        </span>
      )}
    </p>
  );
};

export default ReadMore;
