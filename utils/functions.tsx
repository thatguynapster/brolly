export function getQuery(_query: string) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlQuery = urlParams.get(_query);

  return urlQuery;
}

export async function mkPostReq(payload: {
  endpoint: string;
  method: string;
  token?: string;
  data: any;
  isJSON: boolean;
  appId?: string;
  queries?: string;
}) {
  var response = {};

  const options: {
    method: string;
    cors: string;
    headers: any;
    body: any;
  } = {
    method: payload.method,
    cors: "no-cors",
    headers: {},
    body: payload.data,
  };

  const request = await fetch(`${payload.endpoint}?${payload.queries ? `&${payload.queries}` : ""}`, options);
  const results = await request.json();

  return results;
}

export function validateEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
