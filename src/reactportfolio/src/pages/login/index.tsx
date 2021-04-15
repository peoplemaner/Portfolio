import React, {useEffect} from 'react'
import {postLogin} from '../../common/api'

export default function LoginPage() {

  const login = async () => {
    const res = await postLogin(
      {
      nickName: "시혁",
      password: "1234"
    });
    console.log(res);
    if(res.data.errorCode === "0000") {
      console.log("성공")
    } else (
      console.log(res.data.error)
    )
  }
  
  //--------
  useEffect(() => {
    login()
  },[])

  return (
    <>로그인</>
  )
}