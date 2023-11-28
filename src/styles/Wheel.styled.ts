import tw from 'twin.macro';
import styled from 'styled-components';

export const WheelPage = styled.div`
    ${tw`flex flex-col mt-10 items-center`}
`;

export const WheelPopupContainer = styled.div`
    ${tw`fixed inset-0 flex justify-center items-center z-50`}
`;
export const WheelBackground = styled.div`
    ${tw`bg-green-400 bg-opacity-50 rounded shadow-lg p-8 max-w-3xl relative`}
`;
export const WheelCloseButton = styled.button`
    ${tw`absolute top-[130px] right-4 text-white hover:text-gray-700 z-60`}
`;
export const WheelContainer = styled.div`
    ${tw`w-full h-[100vh] flex justify-center flex-col items-center`}
`;
export const RestockingText = styled.div`
    ${tw`text-center text-white text-5xl font-bold`}
`;
