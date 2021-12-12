export function getQuery(_query: string) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlQuery = urlParams.get(_query);

  return urlQuery;
}
