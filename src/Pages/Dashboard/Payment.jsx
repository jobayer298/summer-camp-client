import React from 'react';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Container from '../../Components/Container';
import useCart from '../../hooks/useCart';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
    const [cart] = useCart()
    const {id} = useParams()
    const cartData = cart.find(c=> c._id === id)
    console.log(id);

    // const total = cartData.reduce((acc, curr) => acc + curr.price, 0);
    // const price = parseFloat(total.toFixed(2));
    
    return (
      <div className="my-10">
        <Container>
          <Elements stripe={stripePromise}>
            <CheckOut cartData={cartData} ></CheckOut>
          </Elements>
        </Container>
      </div>
    );
};

export default Payment;