import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from 'web3modal';
import { Magic, UserInfo } from 'magic-sdk';
import axios from 'axios';

let magic: Magic | undefined;

if (typeof window !== 'undefined') {
    const magicKey = process.env.REACT_APP_MAGIC_KEY as string;
    magic = new Magic(magicKey, {
        network: 'mainnet',
    });
}

let infuriaId = process.env.REACT_APP_INFURA_KEY;
const providerOptions = {
    injected: {
        package: null,
        options: {
            darkMode: true,
        },
    },
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: infuriaId,
            darkMode: true,
        },
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: 'web3modal',
            infuraId: infuriaId,
            rpc: 'https://chain-proxy.wallet.coinbase.com?',
            chainId: 1,
            darkMode: true,
        },
    },
    'custom-wallet': {
        package: magic,
        options: {
            darkMode: true,
            chainId: 1,
        },
        display: {
            name: 'MagicLink',
            description: 'Log in with MagicLink',
            onClick: () => {
                // Implement the MagicLink login logic here
            },
        },
        // move over to the drop page.
        connector: async () => {
            if (typeof window !== 'undefined') {
                const accounts: string[] = await magic!.wallet.connectWithUI();
                try {
                    const userInfo: UserInfo =
                        await magic!.wallet.requestUserInfoWithUI({
                            scope: { email: 'required' },
                        });
                } catch (err) {
                    console.log(err);
                }

                return magic!.wallet.getProvider();
            } else {
                throw new Error('window object is not available');
            }
        },
    },
};

let web3ModalProvider: Web3Modal | null = null;

if (typeof window !== 'undefined') {
    web3ModalProvider = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: 'dark',
    });
}

export default web3ModalProvider;
