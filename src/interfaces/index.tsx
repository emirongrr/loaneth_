import { Dispatch, SetStateAction } from "react";


export interface DataType {
    message: string;
    user: UserType;
    token: string;
  }
  
export interface ResponseType {
    data: DataType;
    success: boolean;
  }

export interface childrenType {
    children: JSX.Element;
  }

export type UserType = {
    email: string;
    fullname: string;
    createdAt: string;
    updatedAt: string;
    password: string | null;
  };

export interface UserContextType {
    isLoading: boolean;
    sessionSet: boolean;
    currentUser: UserType | undefined | null;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setSessionSet: Dispatch<SetStateAction<boolean>>;
    setCurrentUser: Dispatch<SetStateAction<UserType | undefined | null>>;
  }

  