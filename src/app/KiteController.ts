import { KiteConnect } from "kiteconnect";
import { ZerodhaConfig } from "../../secrets/config";
import { ApiMethods, TransactionType } from "./consts/zerodha.consts";

export class KiteController {
    public kc: any;

    constructor() {
        this.kc = new KiteConnect({
            api_key: ZerodhaConfig.apiKey,
            debug: true
        });
        this.kc.setAccessToken(ZerodhaConfig.accessToken);
    }

    private async executeApiCall(operationName: ApiMethods, parameters?: object) {
        try {
            let result;
            if(parameters) {
                result = await this.kc[operationName](...Object.values(parameters));
            }
            else {
                result = await this.kc[operationName]();
            }
            console.log(`${operationName}:`, result);
            return result;
        } catch (err) {
            console.error(`Error getting ${operationName.toLowerCase()}:`, err);
            return err;
        }
    }

    public async getProfile() {
        return this.executeApiCall(ApiMethods.PROFILE);
    }

    public async getHoldings() {
        return this.executeApiCall(ApiMethods.HOLDINGS);
    }

    public async getPositions() {
        return this.executeApiCall(ApiMethods.POSITIONS);
    }

    public async getOrderHistory(order_id: number | string) {
        return this.executeApiCall(ApiMethods.ORDER_HISTORY, {order_id});
    }

    public async placeOrder(tradingsymbol: string, quantity: number, transaction_type: TransactionType, variety: string, exchange: string, product: string, order_type: string) {
        const orderDetails = {variety, Params: {tradingsymbol, quantity, transaction_type, exchange, product, order_type}};
        return this.executeApiCall(ApiMethods.PLACE_ORDER, orderDetails);
    }

    public async cancelOrder(order_id: number | string, variety: string) {
        const orderDetails = {variety, order_id};
        return this.executeApiCall(ApiMethods.CANCEL_ORDER, orderDetails);
    }
}