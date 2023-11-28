import tw from 'twin.macro';
import styled from 'styled-components';

export const MobileModalContainer = styled.div`
    ${tw`fixed inset-x-0 bottom-0 bg-black bg-opacity-50 z-50 h-[50vh] lg:hidden`}
`;
export const DesktopModalContainer = styled.div`
    ${tw`fixed inset-y-1/4 min-h-[500px] right-40 z-50 w-full max-w-md hidden lg:block`}
`;
export const MobileInnerContainer = styled.div`
    ${tw`bg-white h-full p-4 rounded-t-lg w-full max-w-md mx-auto flex flex-col`}
`;
export const DesktopInnerContainer = styled.div`
    ${tw`bg-white flex flex-col justify-center h-full p-4`}
`;
export const XButton = styled.button`
    ${tw`absolute top-2 right-2 text-white cursor-pointer`}
`;
export const GlassesContainer = styled.div`
    ${tw`mb-4 text-center text-white`}
`;
export const BuyNowContainerMobile = styled.div`
    ${tw`mb-4 flex flex-col h-full justify-center items-center`}
`;
export const BuyNowHeaderMobile = styled.h1`
    ${tw`text-xl font-semibold mb-4 text-center text-white`}
`;
export const BuyImageContainerMobile = styled.div`
    ${tw`w-1/2 pr-2 flex justify-start items-center`}
`;
export const BuyImageMainMobile = styled.img`
    ${tw`w-3/4 rounded z-10`}
`;
export const BuyImageSecondaryMobile = styled.img`
    ${tw`absolute top-32 right-60 w-[25%] sm:w-[15%] sm:right-[20rem] md:right-[27rem] rounded z-0 transform translate-x-1/4`}
`;
export const ModalDescriptionContainerMobile = styled.div`
    ${tw`w-1/2 flex flex-col`}
`;
export const ModalNFTDescriptionMobile = styled.div`
    ${tw`h-1/2 mb-4 text-white text-center flex justify-center items-center`}
`;
export const ModalBuyNowContainerMobile = styled.div`
    ${tw`h-1/2 text-center flex flex-col`}
`;
export const ModalBuyNowButtonMobile = styled.button`
    ${tw`w-[155px] bg-[#05CA0D] h-[54px] px-4 py-2 text-white text-sm text-center rounded-lg hover:bg-green-400`}
`;
export const ModalImageContainerDesktop = styled.div`
    ${tw`pr-2 flex justify-center items-center`}
`;
export const ModalImageMainDesktop = styled.img`
    ${tw`w-1/2 rounded z-10 mb-4`}
`;
export const ModalImageSecondaryDesktop = styled.img`
    ${tw`absolute top-10 right-20 w-[35%] rounded z-0 transform translate-x-1/4`}
`;
export const ModalNFTHeaderDesktop = styled.h1`
    ${tw`text-xl font-semibold text-center text-white`}
`;
export const ModalNFTDescriptionDesktop = styled.div`
    ${tw`mb-4 text-white text-center`}
`;
export const ModalBuyNowButtonDesktop = styled.button`
    ${tw`w-[155px] bg-[#05CA0D] h-[54px] px-4 py-2 text-white text-center rounded-lg hover:bg-green-400 text-sm items-center justify-center py-2`}
`;
export const VendingMachineContainer = styled.div`
    ${tw`flex items-center justify-start lg:justify-start min-h-screen bg-transparent`}
`;
export const VendingMachineInnerContainer = styled.div`
    ${tw`h-[100vh] flex justify-start md:h-[80vh] w-full max-w-screen-lg relative`}
`;
export const VendingMachineBackground = styled.div`
    ${tw`absolute inset-0 flex justify-center items-center`}
`;
export const VendingNFTContainer = styled.div`
    ${tw`absolute top-[40%] sm:top-[40%] left-[50%] sm:left-[50%] md:left-[50%] lg:left-[50%] xl:left-[50%] 2xl:left-[50%] transform -translate-x-1/2 -translate-y-1/2 hover:bg-yellow-100 hover:bg-opacity-25`}
`;
export const VendingRelativeSpace = styled.div`
    ${tw`relative flex space-x-6`}
`;
export const VendImageContainer = styled.div`
    ${tw`flex items-center space-x-8`}
`;
export const VendingSlotContainer = styled.div`
    ${tw`hover:bg-yellow-300 hover:bg-opacity-20 transition duration-300`}
`;
export const VendNFTImage = styled.img`
    ${tw`md:w-[70px] lg:w-[70px] 2xl:w-[60px]`}
`;
export const EmptySlot = styled.div`
    ${tw`w-[60px] md:w-[70px] lg:w-[60px] 2xl:w-[70px]`}
`;
