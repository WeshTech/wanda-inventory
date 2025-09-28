//single user update data
export type UpdateBusinessUserData = {
  userId: string;
  userName: string;
  roleName: string;
  email: string;
  storeName: string;
  updatedAt: string;
};

//update user response type
export type UpdateBusinessUserResponse = {
  success: boolean;
  message: string;
  data: UpdateBusinessUserData | null;
};

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
  isActive: boolean;
  isBlocked: boolean;
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
