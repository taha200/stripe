import React, { useState, useEffect } from 'react';
import { Button, View,Text,TouchableOpacity } from 'react-native'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export default function CheckoutScreen() {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([])
    const fetchPaymentSheetParams = async () => {
        fetch('http://localhost:3300/payment-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            res.json()
        }).then(data => {
            console.log(data)
        })

        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        console.log("Data---->", data)

        const Res = await initPaymentSheet({
            customerId: data.customer,
            customerEphemeralKeySecret: data.ephemeralKey,
            paymentIntentClientSecret: data.paymentIntent,
        });
        console.log("Result",Res)
        // if (!error) {
        //     setLoading(true);
        // }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet({ clientSecret });

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        fetch('http://192.168.0.102:3300/payment-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(data => setdata(data))

    }, []);

    return (
        <View>
            <TouchableOpacity style={{ height: 10 }}>
                <Text>Ramis</Text>
            </TouchableOpacity>
            <Button
                variant="primary"
                title="Checkout"
                onPress={initializePaymentSheet}
            />
        </View>
    );
}