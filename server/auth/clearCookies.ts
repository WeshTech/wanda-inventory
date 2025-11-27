//gost code by david waweru
"use server";

import { cookies } from "next/headers";

export const clearCookies = async () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const cookieStore = await cookies();

  try {
    cookieStore.delete("__Wanda-Secure-Access-Token");
    cookieStore.delete("__Wanda-Secure-Refresh-Token");
    cookieStore.delete("__Wanda-Secure-Token");
    return { success: true };
  } catch {}
};
