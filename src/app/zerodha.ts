import { KiteConnect } from "kiteconnect";
import { ZerodhaConfig } from "../../secrets/config";

export const kc = new KiteConnect({ api_key: ZerodhaConfig.apiKey,
  debug: false
 });
console.log(kc.getLoginURL());
// kc.setAccessToken(ZerodhaConfig.accessToken);

async function init() {
  try {
    await generateSession();
    // await getProfile();
    // await getEquityHoldings();
    // await getMFHoldings();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    // if(true || !ZerodhaConfig.accessToken) {
        const response = await kc.generateSession(ZerodhaConfig.requestToken, ZerodhaConfig.apiSecret);
        console.log("Session generated:", response);
        ZerodhaConfig.accessToken = response.access_token;
    // }
    // kc.setAccessToken(ZerodhaConfig.accessToken);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

async function getEquityHoldings() {
  try {
    const holdings = await kc.getHoldings();
    console.log(holdings);
  } catch (err) {
    console.log("Error getting Equity Holdings: ", err);
  }
}

async function getMFHoldings() {
  try {
    const holdings = await kc.getMFHoldings();
    console.log(holdings);
  } catch (err) {
    console.log("Error getting MF Holdings: ", err);
  }
}

init();