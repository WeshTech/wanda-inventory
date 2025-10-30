"use client";

import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link href="/auth/register">Register Page</Link>
    </div>
  );
};

export default HomePage;
