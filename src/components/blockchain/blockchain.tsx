export const switchNetwork = async (chainId: number) => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: getChainHexId(chainId) }],
    });
};

export const getChainHexId = (chainId: number) => {
    switch (chainId) {
        case 1:
            return '0x1';
        case 3:
            return '0x3';
        case 4:
            return '0x4';
        case 5:
            return '0x5';
        case 42:
            return '0x2a';
        case 56:
            return '0x38';
        case 97:
            return '0x61';
        case 128:
            return '0x80';
        case 137:
            return '0x89';
        case 250:
            return '0xfa';
        case 256:
            return '0x100';
        case 1337:
            return '0x539';
        case 43114:
            return '0xa86a';
        case 43113:
            return '0xa85d';
        case 80001:
            return '0x13881';
        case 11155111:
            return '0xaa36a7';
        default:
            return '0x1';
    }
};