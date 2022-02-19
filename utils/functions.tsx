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
  let url = `${reqOptions.endpoint}${reqOptions.queries ? `?${reqOptions.queries}` : ""}`;
  // console.log(url);

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

  const request = await fetch(`${reqOptions.endpoint}${reqOptions.queries ? `?${reqOptions.queries}` : ""}`, options);

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
    body: payload.data,
  };

  payload.isJSON && (options.headers["Content-Type"] = "application/json");
  payload.token && (options.headers["Authorization"] = `Bearer ${payload.token}`);

  const request = await fetch(`${process.env.NEXT_PUBLIC_API}${payload.endpoint}${payload.queries ? `?${payload.queries}` : ""}`, options);
  const results = await request.json();

  return results;
}

export function validateEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function openInNewTab(url: string) {
  // console.log(url);
  var win = window.open(url, "_blank");
  win?.focus();
}

export async function checkPaymentStatus(_ref: string) {
  let check_payment_response = await mkGetReq({
    endpoint: `https://api.paystack.co/transaction/verify/${_ref}`,
    queries: "",
    token: process.env.NEXT_PUBLIC_PAYSTACK_SECRET,
  });
  // console.log(check_payment_response);
  return check_payment_response.data.status;
}

export function sentenceCase(str: string) {
  let _tmp = str.toLowerCase();
  let result = _tmp
    .replace(/[a-z]/i, function (letter) {
      return letter.toUpperCase();
    })
    .trim();

  return result;
}

export function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var sliceSize = 512;

  var byteCharacters = atob(dataURI);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: "image/jpeg" });

  return blob;
}
