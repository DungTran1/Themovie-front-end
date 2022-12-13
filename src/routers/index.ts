import Home from "../pages/Home";
import Login from "../pages/Login";
import Explore from "../pages/Explore/Explore";
import config from "../config";
import MovieInfo from "../pages/Movie/MovieInfo";
import NotFound from "../pages/NotFound/NotFound";
import Watch from "../pages/Watch/Watch";
import History from "../pages/History/History";
import Bookmark from "../pages/Bookmark/Bookmark";
import TVInfo from "../pages/TV/TVInfo";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";
const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.movie,
    component: MovieInfo,
  },
  {
    path: config.routes.tv,
    component: TVInfo,
  },
  {
    path: config.routes.explore,
    component: Explore,
  },
  {
    path: config.routes.movieWatch,
    component: Watch,
  },
  {
    path: config.routes.tvWatch,
    component: Watch,
  },
  {
    path: config.routes.history,
    component: History,
  },
  {
    path: config.routes.bookmark,
    component: Bookmark,
  },
  {
    path: config.routes.search,
    component: Search,
  },
  {
    path: config.routes.profile,
    component: Profile,
  },
  {
    path: config.routes.notfound,
    component: NotFound,
  },
];
const privateRoutes: [] = [];
export { publicRoutes, privateRoutes };
