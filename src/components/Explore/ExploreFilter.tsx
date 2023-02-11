import FilterBy from "./FilterBy";
import SortBy from "./SortBy";
interface ExploreFilterProps {
  media: string;
}
const ExploreFilter: React.FC<ExploreFilterProps> = ({ media }) => {
  return (
    <>
      <SortBy />
      <FilterBy media={media} />
    </>
  );
};

export default ExploreFilter;
