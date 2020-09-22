import React from "react";
import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto  pt-10 min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
