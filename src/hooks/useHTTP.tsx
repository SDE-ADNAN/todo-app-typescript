import { useContext, useEffect, useState } from "react";
import { API_URL_LOCAL , API_URL_LIVE } from "../data/api";
import { TodoContext } from "../context/todoContext";

/***
@param isLive ==> boolean that specifies if the call is for the live server or local.
@param method ==> string for GET,POST,PUT,PATCH,DELETE,get,post,put,patch and all other HTTP methods
@param body ==> JSON object for the formdata just pass the object dont stringify it.
@param headers ==> JSON obj for headers.
@param remUrl ==> string that gets concatinated after the live or local url e.g liveurl/remUrl or localurl/remUrl 
***/

function useHTTP(isLive:boolean , method:string , body:Object | FormData,headers:any, remUrl:string) {
  const {fetchData} = useContext(TodoContext)
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any | null>(null);
  let url = `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

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

  // fetchCallData();
  if(remUrl.indexOf("getAllTodos") === -1){
    // fetchData()
  }
},[])
  return [ data, error ];
}

export default useHTTP;