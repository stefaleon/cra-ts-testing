import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { isEqual, isNull } from "lodash";
import axios from "axios";

type TypicodeUser = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<TypicodeUser[] | null>(null);
  const [haveData, setHaveData] = useState<boolean>(false);

  console.log("test env", process.env.REACT_APP_TEST_VALUE);

  const encryption_Key = process.env.REACT_APP_EncryptionKey || "";
  const encrypt = (str: string) => CryptoJS.AES.encrypt(str, encryption_Key).toString();

  const testStr = "abcd";
  console.log("encrypted test string", encrypt(testStr));

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_TYPICODE_API_USERS_ENDPOINT}`);
      console.log(res.data);
      if (!isNull(res.data)) setHaveData(true);
      if (!isEqual(users, res.data)) setUsers(res.data);
    } catch (error) {
      return error;
    }
  };

  const getUsers = () => {
    fetchUsers();
  };

  const clearUsers = () => {
   setUsers(null);
   setHaveData(false);
  };


  return (
    <div className="App">
      App
      <div>Some test env value: {process.env.REACT_APP_TEST_VALUE}</div>
      <div>Have data: {haveData.toString()}</div>
      {isNull(users) &&  <button onClick={getUsers}>Get users</button>}
      {!isNull(users) && (
        <div>
          <button onClick={clearUsers}>Clear users</button>
          <div>Users:</div>
          {users.map((item) => (
            <div key={item.id}>
              {item.id} {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
