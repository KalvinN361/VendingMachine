import React from 'react';
import '@styles/App.css';
import { VendingMachine } from '@components/vendingMachine';


export const Home: React.FC = () => {
    return (
        <div className='bg-transparent	'>
            <VendingMachine />
        </div>
    )
}