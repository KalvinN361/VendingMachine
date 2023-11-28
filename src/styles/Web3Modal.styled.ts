import tw from 'twin.macro';
import styled from 'styled-components';

export const DisconnectedWalletContainer = styled.div`
    ${tw`fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50`}
`;
export const ButtonWeb3 = styled.button`
    ${tw``}
`;
export const ConnectHeader = styled.h1`
    ${tw`bg-[#05CA0D] hover:bg-green-500 text-white px-4 py-2 text-2xl font-semibold rounded`}
`;
export const ConnectContainer = styled.div`
    ${tw`absolute h-[12vh] z-50 inset-0 left-0 right-0 top-0 bottom-0 md:hidden`}
`;
export const ConnectedWalletText = styled.h1`
    ${tw`text-white text-center min-h-[8vh] items-center flex flex-col justify-center`}
`;

export const WalletAddressConnected = styled.span`
    ${tw`text-2xl`}
`;
export const DetailText = styled.div`
    ${tw`text-white min-h-[4vh] items-center flex justify-center`}
`;
export const MobileConnectContainer = styled.div`
    ${tw`w-[20%] absolute z-50 top-10 right-10 hidden md:block`}
`;
export const MobileConnectedWalletContainer = styled.div`
    ${tw`text-white px-2 text-center min-h-[7vh] items-center flex justify-center`}
`;
export const MobileDetailText = styled.div`
    ${tw`px-2 text-white min-h-[4vh] items-center text-center flex justify-center`}
`;
