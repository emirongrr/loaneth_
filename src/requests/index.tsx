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
    id: string;
    name: string;
    username: string;
    email: string;
    emailVerified: Date;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;
    hasNotification: boolean;
    account: IBankAccount[];
    }
  