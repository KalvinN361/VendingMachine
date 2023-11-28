import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import web3ModalProvider from './provider';
import { getCookie } from '@libs/getCookie';
import { api } from '@libs/api';
import {
    ButtonWeb3,
    ConnectHeader,
    ConnectContainer,
    DisconnectedWalletContainer,
    ConnectedWalletText,
    WalletAddressConnected,
    DetailText,
    MobileConnectContainer,
    MobileConnectedWalletContainer,
    MobileDetailText,
} from '@styles/index';

export const Web3ModalComponent: React.FC = (props) => {
    const [currentWallet, setCurrentWallet] = useState<string | null>(null);
    let {} = props;

    const connectWallet = async () => {
        try {
            web3ModalProvider?.clearCachedProvider();
            const provider = await web3ModalProvider?.connect();
            let ethProvider = new ethers.BrowserProvider(provider);
            const accounts = await ethProvider.listAccounts();
            let currentWallet = accounts[0].address;
            console.log(currentWallet);

            // Update the state with the new wallet address
            setCurrentWallet(currentWallet);

            // Make a call to check if the user owns a bill asset
            const res = await api.post('/UAAsset/GetByWalletAddress', {
                walletAddress: currentWallet,
            });
            if (res.data.length > 0) {
                document.cookie = `walletAddress=${accounts[0].address}`;
            } else {
                console.log("You don't own a bill asset");
                // toast.error("You don't own a bill asset");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const walletAddress = getCookie('walletAddress');
        if (walletAddress) {
            setCurrentWallet(walletAddress);
        }
    }, []);
    function clearWalletAddressAndReload() {
        document.cookie =
            'walletAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    }

    return (
        <>
            {!currentWallet && (
                <DisconnectedWalletContainer>
                    <ButtonWeb3 id="connected-button" onClick={connectWallet}>
                        <ConnectHeader>Connect Wallet</ConnectHeader>
                    </ButtonWeb3>
                </DisconnectedWalletContainer>
            )}
            {currentWallet && (
                <ConnectContainer>
                    <div style={{ backgroundColor: 'rgba(0, 246, 25, 0.5)' }}>
                        <ConnectedWalletText>
                            <WalletAddressConnected>{`Wallet ...${currentWallet.slice(
                                -4
                            )} connected`}</WalletAddressConnected>
                            <button
                                className="text-red-500 text-sm"
                                onClick={clearWalletAddressAndReload}
                            >
                                Disconnect Wallet
                            </button>
                        </ConnectedWalletText>
                    </div>
                    <DetailText
                        style={{ backgroundColor: 'rgba(168, 246, 0, 0.5)' }}
                    >
                        Click a Bill NFT for details
                    </DetailText>
                </ConnectContainer>
            )}
            {/* Conditional div for mobile with currentWallet */}
            {currentWallet && (
                <MobileConnectContainer>
                    <div style={{ backgroundColor: 'rgba(0, 246, 25, 0.5)' }}>
                        <MobileConnectedWalletContainer className="text-white px-2 text-center min-h-[7vh] items-center flex-col flex justify-center">
                            <DetailText className="text-2xl">{`Wallet ...${currentWallet.slice(
                                -4
                            )} connected`}</DetailText>
                            <button
                                onClick={clearWalletAddressAndReload}
                                className="text-red-500 text-sm"
                            >
                                Disconnect Wallet
                            </button>
                        </MobileConnectedWalletContainer>
                    </div>
                    <MobileDetailText
                        style={{ backgroundColor: 'rgba(168, 246, 0, 0.5)' }}
                    >
                        Click a Bill NFT for details
                    </MobileDetailText>
                </MobileConnectContainer>
            )}
        </>
    );
};

export default Web3ModalComponent;
