export type BusinessUserData = {
  userId: string;
  userName: string;
  roleName: string;
  email: string;
  store: string;
  createdAt: string;
};

//create user response type
export type CreateBusinessUserResponse = {
  success: boolean;
  message: string;
  data: BusinessUserData | null;
};

//single business user
export interface BusinessUserResponseData {
  id: string;
  userName: string;
  roleName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  storeName: string | null;
}

// Define the response structure
export interface BusinessUsersResponse {
  success: boolean;
  message: string;
  data: BusinessUserResponseData[] | null;
}
