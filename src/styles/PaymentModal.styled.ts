import tw from 'twin.macro';
import styled from 'styled-components';

export const ModalContainer = styled.div`
    ${tw`fixed inset-0 flex items-center justify-center z-50`}
`;

export const ModalInnerContainer = styled.div`
    ${tw`bg-gray-800 p-5 rounded shadow-lg w-full lg:w-1/2 h-[500px] overflow-auto relative`}
`;

export const CloseButton = styled.button`
    ${tw`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-2`}
`;

export const InputContainer = styled.div`
    ${tw`flex flex-col space-y-4 mt-16`}
`;

export const InputField = styled.input`
    ${tw`p-2 border rounded`}
`;

export const CardElementContainer = styled.div`
    ${tw`p-2 border rounded mt-4`}
`;

export const PurchaseButtonContainer = styled.div`
    ${tw`flex justify-between mt-4`}
`;

export const PurchaseButton = styled.button`
    ${tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
`;
