"use client";
import React from "react";
import { ConnectEmbed } from "thirdweb/react";
import { client } from "./client";
import Aigenerator from "../../components/Aigenerator";
import { useActiveAccount } from "thirdweb/react";
const Page = () => {
  const account = useActiveAccount();

  if (account) {
    return (
      <div className="flex  place-items-center">
        <Aigenerator />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col  place-items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">
          AI Image Generator
        </h1>
        <div className="flex  justify-center items-center">
          <ConnectEmbed client={client} />
        </div>
      </div>
    );
  }
};
export default Page;
