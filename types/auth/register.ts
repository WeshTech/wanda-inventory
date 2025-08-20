export interface registerSuccessData {
  business: string;
  constituency: string;
  county: string;
  createdAt: string;
  email: string;
  name: string;
  token: string;
  updatedAt: string;
  ward: string;
}

export interface registerErrorData {
  message: string;
  error: string;
  statusCode: number;
}
