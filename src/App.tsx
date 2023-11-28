import React, { useEffect, useState } from 'react';
import './styles/output.css';
import MRoutes from './MRoutes';
import { Web3ModalComponent } from '@components/wallet';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ''
);
function App() {
    const [stripeLoaded, setStripeLoaded] = useState(false);

    useEffect(() => {
        stripePromise.then(() => {
            setStripeLoaded(true);
        });
    }, []);
    return (
        <div className="App">
            {stripeLoaded && (
                <Elements stripe={stripePromise}>
                    <MRoutes />
                    <div className="flex justify-end px-24 pt-4">
                        <Web3ModalComponent />
                    </div>
                </Elements>
            )}
        </div>
    );
}

export default App;
