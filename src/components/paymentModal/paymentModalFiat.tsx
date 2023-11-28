import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { ModalContainer, ModalInnerContainer, CloseButton, InputContainer, InputField, CardElementContainer, PurchaseButtonContainer, PurchaseButton } from '@styles/index';
import { Prize } from '../vendingMachine'

interface PaymentModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPurchase: (prize: Prize, name: string, email: string, phone: string) => void;
    selectedPrize: Prize;
}

export const PaymentModalFiat: React.FC<PaymentModalProps> = ({ isVisible, onClose, onPurchase, selectedPrize }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [buttonClicked, setButtonClicked] = React.useState(false);

    if (!isVisible) {
        return null;
    }



    return (
        <ModalContainer>
            <ModalInnerContainer>
                <CloseButton onClick={onClose}>
                    Close
                </CloseButton>
                <InputContainer>
                    <InputField
                        type="text"
                        placeholder="Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className={`p-2 border rounded ${!name && buttonClicked
                            ? 'border-red-500'
                            : ''
                            }`}
                        required
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className={`p-2 border rounded ${!email && buttonClicked
                            ? 'border-red-500'
                            : ''
                            }`}
                        required
                    />
                    <InputField
                        type="tel"
                        placeholder="Phone"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        className={`p-2 border rounded ${!phone && buttonClicked
                            ? 'border-red-500'
                            : ''
                            }`}
                        required

                    />
                </InputContainer>
                <CardElementContainer>
                    <CardElement
                        options={{
                            iconStyle: 'solid',
                            style: {
                                base: {
                                    iconColor: '#c4f0ff',
                                    color: '#fff',
                                    fontWeight: 500,
                                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                    fontSize: '16px',
                                    fontSmoothing: 'antialiased',
                                    '::placeholder': {
                                        color: '#87BBFD',
                                    },
                                    ':-webkit-autofill': {
                                        color: '#fce883',
                                    },
                                },
                                invalid: {
                                    iconColor: '#FFC7EE',
                                    color: '#FFC7EE',
                                },
                            },
                        }}
                    />
                </CardElementContainer>
                <PurchaseButtonContainer>
                    <PurchaseButton
                        onClick={() => {
                            setButtonClicked(true);
                            if (name && email && phone) {
                                onPurchase(selectedPrize, name, email, phone);
                            }
                        }}
                    >
                        Purchase
                    </PurchaseButton>
                </PurchaseButtonContainer>
            </ModalInnerContainer>
        </ModalContainer>
    );
};