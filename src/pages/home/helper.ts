import CryptoJS from "crypto-js";

export const getHashStrMD5Format = (signstr: string) => {
  const hashStr = CryptoJS.MD5(signstr).toString();
  return hashStr;
};

export const bookStatusesArr = [
  {
    id: 0,
    title: "status",
    statusNumber: 0,
    description: "New",
  },
  {
    id: 1,
    title: "status",
    statusNumber: 1,
    description: "Reading",
  },
  {
    id: 2,
    title: "status",
    statusNumber: 2,
    description: "Finished",
  },
];
