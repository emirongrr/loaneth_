  export interface IError {
    message: string;
    show: boolean;
  }
  
  export type LogsRequest = {
    data: {
      message: string;
      timestamp: Date;
    }[];
    page: number;
    totalPages: number;
    totalLogs: number;
    perPage: number;
  }

  export interface IUser {
    email: string;
    password: string;
   }
  export type BankAccount = {
    key: string
  }
  