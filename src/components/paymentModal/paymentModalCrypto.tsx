import React from 'react';
import { ModalContainer, ModalInnerContainer, CloseButton, InputContainer, InputField, PurchaseButtonContainer, PurchaseButton } from '@styles/index';
import { Prize } from '../vendingMachine'

interface PaymentModalProps {
    isVisible: boolean;
    onClose: () => void;
    onContinue: (prize: Prize, name: string, email: string, phone: string) => void;
    selectedPrize: Prize;
}

export const PaymentModalCrypto: React.FC<PaymentModalProps> = ({ isVisible, onClose, onContinue, selectedPrize }) => {
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
                <PurchaseButtonContainer>
                    <PurchaseButton
                        onClick={() => {
                            setButtonClicked(true);
                            if (name && email && phone) {
                                onContinue(selectedPrize, name, email, phone);
                            }
                        }}
                    >
                        Continue
                    </PurchaseButton>
                </PurchaseButtonContainer>
            </ModalInnerContainer>
        </ModalContainer>
    );
};