import { sepolia } from "thirdweb/chains";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

export const nftCollectionContractAddress =
  "0x3121f213e88cf5b2b02e330c98a92a19ee81a3d6";

export const contract = getContract({
  client: client,
  chain: sepolia,
  address: nftCollectionContractAddress,
});
