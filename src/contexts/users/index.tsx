import { authenticate } from "utils/authenticate";
import {  createContext, useEffect, useState } from "react";
import { childrenType,UserContextType } from "interfaces";
import {BankAccount, User} from 'libs/types/user'


export const UserContext = createContext<UserContextType | {}>({
  isLoading: true,
  sessionSet: false,
  currentUser: undefined,
});


export const UserContextProvider = (props: childrenType) => {
  // *******************************
  const [sessionSet, setSessionSet] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // controlling if user allready logged in on first load
  useEffect(() => {
    // here is the logic for controlling the user session
    async function refreshUser() {
      const token: string | null = localStorage.getItem("token");
      if (!token) {
        return setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
      const { data, success }: any = await authenticate(token);
      if (!success) {
        return setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
      //pull bankaccounts
      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      };
      const res = await fetch('/api/accounts/getallbankaccounts',{
        method: "POST",
        headers: headersList,
      })
      if(res.ok){
        data.user.bankAccounts = []
        const json = await res.json()
        const c:BankAccount[] = json
        c.forEach( account =>{
          data.user.bankAccounts.push(account)
        })
      }

      //push into user
      setCurrentUser(data.user);
      setSessionSet(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    refreshUser();
  }, [sessionSet]);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoading,
          sessionSet,
          currentUser,
          setIsLoading,
          setSessionSet,
          setCurrentUser,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};