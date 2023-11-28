import { Magic } from 'magic-sdk';
import * as process from 'process';

// Initialize the Magic instance
const magicKey = process.env.REACT_APP_MAGIC_KEY as string;

export const magic = new Magic(magicKey, {
    network: {
        rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/',
        chainId: 5,
    },
});
