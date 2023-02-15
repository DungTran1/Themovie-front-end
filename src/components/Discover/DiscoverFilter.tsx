import FilterBy from "./FilterBy";
import SortBy from "./SortBy";
interface DiscoverFilterProps {
  media: string;
}
const DiscoverFilter: React.FC<DiscoverFilterProps> = ({ media }) => {
  return (
    <>
      <SortBy />
      <FilterBy media={media} />
    </>
  );
};

export default DiscoverFilter;
