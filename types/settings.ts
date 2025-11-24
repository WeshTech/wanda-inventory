//business info type
export type GlobalBusinessInfo = {
  businessName: string;
  email: string;
  ownerName: string;
  category: string;
  county: string;
  constituency: string;
  ward: string;
  walletBalance: number;
  memberSince: string;
  currentPlan: string;
};

//business info response
export type GlobalBusinessInfoResponse = {
  success: boolean;
  message: string;
  data: GlobalBusinessInfo | null;
};

export type TopUpResponse = {
  success: boolean;
  message: string;
  data?: null;
};
