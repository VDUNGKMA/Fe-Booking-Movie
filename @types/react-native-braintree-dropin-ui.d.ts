declare module 'react-native-braintree-dropin' {
    interface BraintreeDropInProps {
        clientToken: string;
        paypal?: {
            enabled: boolean;
            displayName: string;
        };
        card?: {
            required: boolean;
        };
    }

    interface BraintreeResult {
        nonce: string;
    }

    export default class BraintreeDropIn {
        static show(options: BraintreeDropInProps): Promise<BraintreeResult>;
    }
}
