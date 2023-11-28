import React, { FC } from 'react';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PurchaseCompleteModal: FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
            <div className="bg-gray-800 p-6 rounded-lg w-4/5 md:w-1/2 lg:w-1/3 text-center">
                <h2 className="text-3xl mb-4 text-white">
                    Thank you for your purchase.
                </h2>
                <p className="mb-4 text-white">
                    Click here to reload for more purchases.
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Reload
                </button>
            </div>
        </div>
    );
};

export default PurchaseCompleteModal;
