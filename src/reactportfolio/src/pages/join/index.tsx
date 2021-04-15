import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postJoin } from "../../common/api";

export default function JoinPage() {
  const history = useHistory();
  const [nickName, setNickName] = useState("");
  const [password, setPassWord] = useState("");
  const [genderType, setGenderType] = useState(0);

  const join = async () => {
    const res = await postJoin({
      nickName: nickName,
      password: password,
      sex: genderType,
    });
    if (res.data.errorCode === "0000") {
      console.log("성공");
      history.push("/");
    } else console.log(res.data.error);
  };

  const genderHandle = (e: any) => {
    const value = e.target.value;

    if (value === "m") {
      return setGenderType(0);
    } else {
      return setGenderType(1);
    }
  };

  return (
    <div className="joinPage">
      <div>
        <label>아이디</label>
        <input
          type="text"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
        />
      </div>

      <div>
        <label>패스워드</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />
      </div>

      <div>
        <button value="m" onClick={genderHandle}>
          남자
        </button>
        <button value="f" onClick={genderHandle}>
          여자
        </button>
      </div>

      <button onClick={join}>가입</button>
    </div>
  );
}
