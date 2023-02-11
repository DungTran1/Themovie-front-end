const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "b3cc2951d14f1ddb8caab8de98ddbfc0",
  originalImage: (imgPath: string | undefined) =>
    `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath: string | undefined) =>
    `https://image.tmdb.org/t/p/w500${imgPath}`,
};
export default apiConfig;
