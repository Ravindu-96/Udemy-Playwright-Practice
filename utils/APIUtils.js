// This utility class provides methods to interact with the e-commerce API for authentication and order creation.
// It encapsulates the logic for making API requests, handling authentication tokens, and retrieving order IDs, allowing tests to easily perform these actions without duplicating code.

class APIUtils {
    constructor(apiContext, LoginPayload) {
        this.apiContext = apiContext;
        this.LoginPayload = LoginPayload;
    }

    async getToken() {
        const LoginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.LoginPayload },
        );
        const responseBody = await LoginResponse.json();
        const token = responseBody.token;
        return token;
    }

    async getOrderId(orderPayload) {
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    authorization: await this.getToken(),
                },
            },
        );
        const orderResponseBody = await orderResponse.json();
        const orderId = orderResponseBody.orders[0];
        return orderId;
    }
}

export default APIUtils;