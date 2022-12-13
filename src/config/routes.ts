export const singleUrl = {
  login: "/login",
  home: "/",
  movie: "/movie",
  explore: "/discover",
  tv: "/tv",
  search: "/search",
  watch: "watch",
  history: "/history",
  bookmark: "/bookmark",
  profile: "/profile",
};
const routes = {
  login: singleUrl.login,
  home: singleUrl.home,
  explore: singleUrl.explore,
  movie: singleUrl.movie + "/:id",
  movieWatch: singleUrl.movie + "/:id/" + singleUrl.watch,
  tv: singleUrl.tv + "/:id",
  tvWatch: singleUrl.tv + "/:id/" + singleUrl.watch,
  search: singleUrl.search,
  profile: singleUrl.profile,
  history: singleUrl.history,
  bookmark: singleUrl.bookmark,
  notfound: "*",
};
export default routes;
