import axios from 'axios'

// const axiosConfig = { headers: { "Content-Type": "application/json"}};

type dataType = {
  [key: string]: any;

};

type ResponseType= {
  result: string;
  data: any;
  error: string;
  errorCode: string;
}


export async function postLogin(params:dataType): Promise<ResponseType>{
  return await axios.post("http://121.134.5.188:4000/login", params);
}

export async function postJoin(params:dataType): Promise<ResponseType>{
  return await axios.post("http://121.134.5.188:4000/users", params);
}