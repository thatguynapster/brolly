export function getQuery(_query: string) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlQuery = urlParams.get(_query);

  return urlQuery;
}

// let reqOptions = {
//     endpoint: '',
//     queries: '',
// }
export async function mkGetReq(reqOptions: {
  endpoint: string;
  queries: string;
  token?: string;
  appId?: string;
  extraHeaders?: {}[];
}) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}${reqOptions.endpoint}?${reqOptions.queries}`;
  // console.log(url)

  const options: {
    method: string;
    cors: string;
    headers: any;
  } = {
    method: "GET",
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  reqOptions.token && (options.headers["Authorization"] = `Bearer ${reqOptions.token}`);
  reqOptions.appId && (options.headers["app-id"] = `${reqOptions.appId}`);

  const request = await fetch(`${reqOptions.endpoint}?${reqOptions.queries ? `&${reqOptions.queries}` : ""}`, options);
  const results = await request.json();

  return results;
}

// let payload = {
//     endpoint: '',
//     method: '',
//     token: '',
//     data: {}
// }
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
    body: JSON.stringify(payload.data),
  };

  payload.isJSON && (options.headers["Content-Type"] = "application/json");
  payload.token && (options.headers["Authorization"] = `${payload.token}`);

  const request = await fetch(`${process.env.NEXT_PUBLIC_API}${payload.endpoint}`, options);
  const results = await request.json();

  return results;
}

export function validateEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
