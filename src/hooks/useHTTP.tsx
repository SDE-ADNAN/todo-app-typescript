import { useContext, useEffect, useState } from "react";
import { API_URL_LOCAL , API_URL_LIVE } from "../data/api";
import { TodoContext } from "../context/todoContext";

const fetchData = async () => {
  try {
    const response = await fetch(API_URL_LOCAL+"/admin/getAllTodos");
    if (!response.ok) {
      return { isLoading: true, error : new Error('Request failed')}
    }
    const jsonData = await response.json();
    return {isLoading : false, data : jsonData}
  } catch (err) {
    console.error('Error:', err);
    return err
  }
};

/***
@param isLive ==> boolean that specifies if the call is for the live server or local.
@param method ==> string for GET,POST,PUT,PATCH,DELETE,get,post,put,patch and all other HTTP methods
@param body ==> JSON object for the formdata just pass the object dont stringify it.
@param headers ==> JSON obj for headers.
@param remUrl ==> string that gets concatinated after the live or local url e.g liveurl/remUrl or localurl/remUrl 
***/

function useHTTP(isLive:boolean , method:string , body:Object | FormData,headers:any, remUrl:string) {
  console.log("=======================")
  console.log("method---> "+method)
  console.log("remUrl---> "+remUrl)
  console.log("body---> ")
  console.log(body)
  console.log("headers---> ")
  console.log(headers)
  console.log("=======================")
  const {fetchData} = useContext(TodoContext)
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any | null>(null);
  let url = `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

  function formDataToJson(formData: FormData): { [key: string]: string | File } {
    const json: { [key: string]: string | File } = {};
    const entries = formData.entries();
    let next = entries.next();
    while (!next.done) {
      const [key, value] = next.value;
      json[key] = value instanceof File ? value : String(value);
      next = entries.next();
    }
    return json;
  }
  const getCallOptions = (method: string, body: Object | FormData, headers: any) => {
    if (method === 'GET' || method === 'get') {
      return {
        method: method,
      };
    }
  
    if (
      method === 'POST' ||
      method === 'post' ||
      method === 'PUT' ||
      method === 'put' ||
      method === 'PATCH' ||
      method === 'patch' ||
      method === 'DELETE' ||
      method === 'delete'
    ) {
      if (typeof body === 'object' && !(body instanceof FormData)) {
        return {
          method: method,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
      } else {
        const { 'Content-Type': contentType, ...restHeaders } = headers;
        return {
          method: method,
          headers: restHeaders,
          body: body,
        };
      }
    }
  };
  
useEffect(()=>{
  const fetchCallData = async () => {
    try {
      const response = await fetch(url, getCallOptions(method,body,headers));
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  fetchCallData();
  if(remUrl.indexOf("getAllTodos") === -1){
    fetchData()
  }
},[])
  return [ data, error ];
}

export default useHTTP;



// export function useHTTPFunc(isLive:boolean , method:string , body:Object | FormData,headers:any, remUrl:string) {
//   console.log("=======================")
//   console.log("method---> "+method)
//   console.log("remUrl---> "+remUrl)
//   console.log("body---> ")
//   console.log(body)
//   console.log("headers---> ")
//   console.log(headers)
//   console.log("=======================")
//   let data = null;
//   let error = null;
//   let url = `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`;

//   const getCallOptions = (method: string, body: Object | FormData, headers: any) => {
//     if (method === 'GET' || method === 'get') {
//       return {
//         method: method,
//       };
//     }

//     if (
//       method === 'POST' ||
//       method === 'post' ||
//       method === 'PUT' ||
//       method === 'put' ||
//       method === 'PATCH' ||
//       method === 'patch' ||
//       method === 'DELETE' ||
//       method === 'delete'
//     ) {
//       if (typeof body === 'object' && !(body instanceof FormData)) {
//         return {
//           method: method,
//           headers: {
//             ...headers,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(body),
//         };
//       } else {
//         const { 'Content-Type': contentType, ...restHeaders } = headers;
//         return {
//           method: method,
//           headers: restHeaders,
//           body: body,
//         };
//       }
//     }
//   };

//     const fetchCallData = async () => {
//       try {
//         const response = await fetch(url, getCallOptions(method, body, headers));
//         if (!response.ok) {
//           throw new Error("Failed to fetch");
//         }
//         const resData = await response.json();
//         data = resData;
//         error = null;
//       } catch (err) {
//         error = err
//       }
//     };

//     fetchCallData();
//     if (remUrl.indexOf("getAllTodos") === -1) {
//       fetchData();
//     }

//   return [data, error];
// }

