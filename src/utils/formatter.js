import {ethers} from "ethers";

export const getEllipsisTxt = (str, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};
export const getLastTxt = (str, n = 6) => {
    if (str) {
        return `***${str.slice(str.length - n)}`;
    }
    return "";
};
export const getFormTxt = (str, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}***${str.slice(str.length - n)}`;
    }
    return "";
};




