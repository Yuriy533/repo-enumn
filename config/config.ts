import dotenv from "dotenv";

dotenv.config();

const {
  POLYGON_MUMBAI_API_URL,
  PRIVATE_KEY,
  GOERLI_API_URL,
  ROOT_TOKEN_ADDRESS,
} = process.env;

if (
  !POLYGON_MUMBAI_API_URL ||
  !PRIVATE_KEY ||
  !GOERLI_API_URL ||
  !ROOT_TOKEN_ADDRESS
) {
  throw new Error("Wrong config");
}

const config = {
  polygonMumbaiApiUrl: POLYGON_MUMBAI_API_URL,
  goerliApiUrl: GOERLI_API_URL,
  privateKey: PRIVATE_KEY,
  rootTokenAddress: ROOT_TOKEN_ADDRESS,
};

export default config;
