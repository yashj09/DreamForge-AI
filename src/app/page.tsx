"use client";
import React from "react";
import { ConnectEmbed } from "thirdweb/react";
import { client } from "./client";
import Aigenerator from "../../components/Aigenerator";

const page = () => {
  return (
    <div>
      <ConnectEmbed client={client} />
      <Aigenerator />
    </div>
  );
};

export default page;
