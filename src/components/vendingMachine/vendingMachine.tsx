import React, { useCallback, useEffect, useState } from 'react';
import { api } from '@libs/api';
import { getCookie } from '@libs/getCookie';
import { Wheel } from '@components/wheel';
import { ethers } from 'ethers';
import {
    BuyImageContainerMobile,
    BuyImageMainMobile,
    BuyImageSecondaryMobile,
    BuyNowContainerMobile,
    BuyNowHeaderMobile,
    DesktopInnerContainer,
    DesktopModalContainer,
    GlassesContainer,
    MobileInnerContainer,
    MobileModalContainer,
    ModalBuyNowButtonDesktop,
    ModalBuyNowButtonMobile,
    ModalBuyNowContainerMobile,
    ModalDescriptionContainerMobile,
    ModalImageContainerDesktop,
    ModalImageMainDesktop,
    ModalImageSecondaryDesktop,
    ModalNFTDescriptionDesktop,
    ModalNFTDescriptionMobile,
    ModalNFTHeaderDesktop,
    VendNFTImage,
    VendingMachineBackground,
    VendingMachineContainer,
    VendingMachineInnerContainer,
    VendingNFTContainer,
    VendingRelativeSpace,
    VendingSlotContainer,
    XButton,
    EmptySlot,
} from '@styles/index';
import web3ModalProvider from '@components/wallet/provider';
import { MintingOverlay } from '@components/MintingOverlay';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PurchaseCompleteModal from './purchaseModal';
import { WinnableWheelPrizes } from '@components/winnableWheelPrizes';
import { switchNetwork } from '@components/blockchain';
import { PaymentModalCrypto, PaymentModalFiat } from '@components/paymentModal';
export interface Prize {
    archived: boolean;
    chainId: number;
    claimed: boolean;
    contractAddress: string;
    createdBy: string;
    createdDate: string;
    description: string;
    eventId: string;
    id: string;
    image: string;
    name: string;
    slot: number;
    tokenId: string;
    updatedBy: string;
    updatedDate: string;
    type: string;
}

export const VendingMachine: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const vendingEventId = process.env.REACT_APP_VENDING_EVENT_ID;
    const [currentWallet, setCurrentWallet] = useState<string | null>(null);
    const [vendingPrizesSlot1, setVendingPrizesSlot1] = useState<Prize[]>([]);
    const [vendingPrizesSlot2, setVendingPrizesSlot2] = useState<Prize[]>([]);
    const [vendingPrizesSlot3, setVendingPrizesSlot3] = useState<Prize[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPrizesForModal, setSelectedPrizesForModal] = useState<
        Prize[]
    >([]);
    const [isFiatPaymentModalVisible, setFiatPaymentModalVisible] =
        useState(false);
    const [isCryptoPaymentModalVisible, setCryptoPaymentModalVisible] =
        useState(false);
    const [has3D, setHas3D] = useState(false);
    const [wheelModal, setWheelModal] = useState(false);
    const [shouldPoll, setShouldPoll] = useState(true);
    const wheelEventId = process.env.REACT_APP_WHEEL_EVENT_ID;
    const [holdingPrize, setHoldingPrize] = useState(false);
    const [vendingPrizeSlot4, setVendingPrizeSlot4] = useState<Prize[]>([]);
    const [showClaimButton, setShowClaimButton] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [notAvailableModal, setnotModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

    const initialLoad = async () => {
        await getVendingPrizes();
        let walletAddress = getCookie('walletAddress');
        setCurrentWallet(walletAddress);
    };

    const check3DGlasses = async () => {
        let walletAddress = getCookie('walletAddress');
        const glassContract = ['40000001-0001-0001-0002-000000000003'];
        await api
            .get(
                `/Asset/GetAll/WalletAddress/${walletAddress}/Contracts/${glassContract}`
            )
            .then((res) => {
                console.log(res);
                if (res.data.assets.length > 0) {
                    setHas3D(true);
                }
            });
    };

    const getVendingPrizes = async () => {
        await api
            .post('/Prize/GetAllUnclaimedByEvent', {
                eventId: vendingEventId,
            })
            .then((res) => {
                const rawPrizes: Prize[] = res.data;
                let slot1: Prize[] = [];
                let slot2: Prize[] = [];
                let slot3: Prize[] = [];
                let slot4: Prize[] = [];
                rawPrizes.forEach((prize: any) => {
                    if (prize.slot === 1 && prize.hold === false) {
                        slot1.push(prize);
                    } else if (prize.slot === 2 && prize.hold === false) {
                        slot2.push(prize);
                    } else if (prize.slot === 3 && prize.hold === false) {
                        slot3.push(prize);
                    }
                    //  else if (prize.slot === 4 && prize.hold === false) {
                    //     slot4.push(prize);
                    // }
                });
                setVendingPrizesSlot1(slot1);
                setVendingPrizesSlot2(slot2);
                setVendingPrizesSlot3(slot3);
                setVendingPrizeSlot4(slot4);
            });
    };
    const addToQueue = async (quantity: number, transactionType: string) => {
        let walletAddress = getCookie('walletAddress');
        api.post('/Queue/AddToQueue', {
            eventId: wheelEventId,
            walletAddress: walletAddress,
            quantity: quantity,
            transactionType: transactionType,
        })
            .then(() => {
                console.log('Added to Queue');
            })
            .catch((error) => console.error(error));
    };

    const claimPrizeStripe = async (prize?: any) => {
        let foundPrize = prize;
        if (!foundPrize) {
            return;
        }
        let walletAddress = getCookie('walletAddress');
        try {
            await api
                .post('/Prize/ClaimHoldTransfer', {
                    prizes: foundPrize,
                    walletAddress: walletAddress,
                })
                .then(async (res) => {
                    if (res.status === 200) {
                        // TODO: send email telling transaction complete but have to wait a week.
                    }
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const claimPrizeCrypto = async (prize?: any) => {
        let foundPrize = prize;
        if (!foundPrize) {
            return;
        }
        let walletAddress = getCookie('walletAddress');
        try {
            await api
                .post('/Prize/ClaimTransfer', {
                    prizes: foundPrize,
                    walletAddress: walletAddress,
                })
                .then(async (res) => {
                    console.log(res);
                    if (res.status === 200) {
                        // TODO: send the emailconfirming the purchase.
                    }
                });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const Modal = () => {
        useEffect(() => {
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }, []);

        return (
            <div className="modal flex justify-center items-center h-screen bg-gray-900 bg-opacity-70 z-100">
                <div className="modal-content pointer-events-none bg-red-700">
                    <h2 className="text-lg px-4 py-4">
                        Sorry, the item is already purchased. Refreshing...
                    </h2>
                </div>
            </div>
        );
    };
    const holdPrize = async (prize: any) => {
        if (prize) {
            setHoldingPrize(true);
            let walletAddress = getCookie('walletAddress');
            await api
                .post('/Prize/holdPrize', {
                    prizes: prize,
                    walletAddress: walletAddress,
                })
                .then(async (res) => {
                    setHoldingPrize(false);
                });
        }
    };
    const updateTimeHold = async () => {
        await api.post('/Prize/removeExpiredHold', {
            eventId: vendingEventId,
        });
    };
    const stripePayment = async (
        prize: any,
        name: string,
        email: string,
        phone: string
    ) => {
        try {
            let priceAmount = 500;

            await api.post('/Prize/removeExpiredHold', {
                eventId: vendingEventId,
            });

            const queueResponse = await api.post('/Queue/StopQueue', {
                eventId: wheelEventId,
            });

            if (queueResponse.status === 204) {
                console.log('Sweepstate queue Full');
                return;
            }

            console.log('prize', prize);
            holdPrize(prize);

            const paymentIntentResponse = await api.post(
                '/stripe/createPayment',
                {
                    amount: priceAmount,
                    currency: 'usd',
                }
            );
            const clientSecret = paymentIntentResponse.data.clientSecret;

            if (!stripe || !elements) {
                throw new Error('Stripe or elements is not available');
            }

            let cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error('Card element is not available');
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: name,
                        email: email,
                        phone: phone,
                    },
                },
            });
            if (result.error) {
                throw new Error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // TODO: send email here using state
                    await claimPrizeStripe(prize);
                    await addToQueue(prize.length, 'fiat');
                    console.log('Payment succeeded');
                    setPurchaseModalOpen(true);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const cryptoPayment = async (prize: any) => {
        const toAddress = process.env.REACT_APP_TO_ADDRESS;
        let amount = 0.0001;
        await api
            .post('/Prize/removeExpiredHold', {
                eventId: vendingEventId,
            })
            .then(async (res) => {
                await api
                    .post('/Queue/StopQueue', {
                        eventId: wheelEventId,
                    })
                    .then(async (res) => {
                        if (res.status === 204) {
                            console.log('Sweepstate queue Full ');
                        } else {
                            const network =
                                process.env.REACT_APP_ETHEREUM_NETWORK;
                            // const provider = await web3ModalProvider?.connect();
                            let p;
                            if (window.ethereum) {
                                p = window.ethereum;
                            } else if (window.web3) {
                                p = window.web3.currentProvider;
                            }
                            holdPrize(prize);
                            let ethProvider = new ethers.BrowserProvider(p);
                            const signer = await ethProvider.getSigner();
                            const userAddress = await signer.getAddress();
                            const nonce = await ethProvider.getTransactionCount(
                                userAddress,
                                'latest'
                            );
                            console.log(`Nonce: ${nonce}`);
                            try {
                                if (window.ethereum) {
                                    await window.ethereum.enable();
                                } else {
                                    throw new Error(
                                        'Ethereum object is not available on window'
                                    );
                                }
                                const tx = await signer.sendTransaction({
                                    to: toAddress,
                                    value: ethers.parseEther(amount.toString()),
                                });
                                alert(tx);
                                setModalVisible(false);
                                setIsMinting(true);
                                console.log('Mining transaction...');
                                console.log(
                                    `https://${network}.etherscan.io/tx/${tx.hash}`
                                );
                                const receipt = await tx.wait();
                                console.log(
                                    `Mined in block ${receipt?.blockNumber}`
                                );
                                console.log(`Mined Status ${receipt?.status}`);
                                if (receipt?.status === 1) {
                                    // TODO: here send the email.
                                    await claimPrizeCrypto(prize).then(
                                        async () => {
                                            await addToQueue(
                                                prize.length,
                                                'crypto'
                                            );
                                        }
                                    );
                                    setIsMinting(false);
                                    setPurchaseModalOpen(true);
                                }
                            } catch (error: any) {
                                setIsMinting(false);
                                console.error(error);
                                alert(error);
                            }
                        }
                    });
            });
    };
    const buyNowCrypto = async (
        prize: any,
        name: string,
        email: string,
        phone: string
    ) => {
        try {
            if (prize) {
                await api
                    .post('/Prize/CheckIfPrizeIsAvailable', {
                        prizeId: prize.id,
                    })
                    .then(async (res) => {
                        console.log(res);
                        if (res.data.available === true) {
                            setName(name);
                            setEmail(email);
                            setPhone(phone);
                            await cryptoPayment([prize]);
                        } else {
                            setModalVisible(false);
                            setnotModalVisible(true);
                            console.log('Prize is not available');
                        }
                    });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const openBuyMenu = async (prize: any) => {
        if (prize) {
            await check3DGlasses();
            if (Array.isArray(prize)) {
                setSelectedPrizesForModal(prize);
            } else {
                setSelectedPrizesForModal([prize]);
            }
            setModalVisible(true);
        }
    };
    const buyNow = async (
        prize: any,
        name: string,
        email: string,
        phone: string
    ) => {
        try {
            if (prize && name && email && phone) {
                await api
                    .post('/Prize/CheckIfPrizeIsAvailable', {
                        prizeId: prize.id,
                    })
                    .then(async (res) => {
                        console.log(res);
                        if (res.data.available === true) {
                            setName(name);
                            setEmail(email);
                            setPhone(phone);
                            await stripePayment([prize], name, email, phone);
                        } else {
                            setModalVisible(false);
                            setnotModalVisible(true);
                            console.log('Prize is not available');
                        }
                    });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    // const sweepButton = async () => {
    //     // TODO check what prizes are available and then get the length. \
    //     await api
    //         .post('/Prize/GetAllUnclaimedByEvent', {
    //             eventId: vendingEventId,
    //         })
    //         .then(async (res) => {
    //             // const rawPrizes: Prize[] = res.data;
    //             // await stripePayment(res.data);
    //             // await socket(res.data);
    //         });
    // };
    // const removeHold = async () => {
    //     await api
    //         .post('/Prize/RemoveHold', {
    //             eventId: wheelEventId,
    //             walletAddress: currentWallet,
    //             quantity: 1,
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         });
    // };
    const currentPositionQueue = async (walletAddress: string) => {
        api.post('/Queue/CurrentPosition', {
            eventId: wheelEventId,
            walletAddress: walletAddress,
        }).then((res) => {
            console.log(res);
            if (res.status === 404) return;
            if (res.status === 200) {
                if (res.data === null) return;
                if (res.data.length > 0) {
                    setShowClaimButton(true);
                }
            }
        });
    };
    const openFiatModal = async () => {
        setModalVisible(false);
        setShouldPoll(false);
        setFiatPaymentModalVisible(true);
    };

    const openCryptoModal = async () => {
        setModalVisible(false);
        setShouldPoll(false);
        setCryptoPaymentModalVisible(true);
        switchNetwork(11155111);
    };
    const openPopup = async () => {
        setWheelModal(true);
    };
    const closePopup = useCallback(() => {
        setWheelModal(false);
    }, []);
    useEffect(() => {
        initialLoad();
    }, []);
    useEffect(() => {
        if (!shouldPoll) return;
        const interval = setInterval(async () => {
            if (holdingPrize || wheelModal) return;
            setShouldPoll(false);
            await updateTimeHold();
            // TODO take off ownerId
            await getVendingPrizes().then(async () => {
                setShouldPoll(true);
            });
        }, 10000);
        return () => clearInterval(interval);
    }, [shouldPoll, closePopup, holdingPrize, wheelModal]);
    useEffect(() => {
        if (!currentWallet) return;
        (async () => {
            await currentPositionQueue(currentWallet!);
        })();
    }, [currentWallet]);
    const createVendNFTImage = (prizes: Prize[], slot: number) => {
        if (prizes.length > 0) {
            return (
                <VendNFTImage
                    src={prizes[0].image}
                    alt="Vending Machine"
                    width={60}
                    height={130}
                    onClick={() => openBuyMenu(prizes)}
                />
            );
        } else if (
            vendingPrizesSlot1.length === 0 &&
            vendingPrizesSlot2.length === 0 &&
            vendingPrizesSlot3.length === 0 &&
            vendingPrizeSlot4.length > 0 &&
            slot === 2
        ) {
            return (
                <VendNFTImage
                    src={vendingPrizeSlot4[0].image}
                    alt="Vending Machine"
                    width={60}
                    height={130}
                    onClick={() => openBuyMenu(vendingPrizeSlot4)}
                />
            );
        } else {
            return <EmptySlot />;
        }
    };
    console.log(isPurchaseModalOpen);
    return (
        <>
            <WinnableWheelPrizes />
            <PurchaseCompleteModal
                isOpen={isPurchaseModalOpen}
                onClose={() => {
                    window.location.reload();
                }}
            />

            {isFiatPaymentModalVisible && (
                <PaymentModalFiat
                    isVisible={isFiatPaymentModalVisible}
                    onClose={() => setFiatPaymentModalVisible(false)}
                    onPurchase={buyNow}
                    selectedPrize={selectedPrizesForModal[0]} // Pass the selected prize as a prop
                />
            )}
            {isCryptoPaymentModalVisible && (
                <PaymentModalCrypto
                    isVisible={isCryptoPaymentModalVisible}
                    onClose={() => setCryptoPaymentModalVisible(false)}
                    selectedPrize={selectedPrizesForModal[0]}
                    onContinue={buyNowCrypto}
                />
            )}

            {notAvailableModal && <Modal />}
            {isMinting && <MintingOverlay />}
            {wheelModal && (
                <Wheel isPopupOpen={wheelModal} closePopup={closePopup} />
            )}
            {isModalVisible && (
                // Small screen modal (hidden on md and larger screens)
                <MobileModalContainer>
                    <MobileInnerContainer
                        style={{ backgroundColor: 'rgba(0, 158, 16, 1)' }}
                    >
                        <XButton onClick={() => setModalVisible(false)}>
                            X
                        </XButton>
                        <GlassesContainer>
                            {has3D && '3D glasses detected'}
                        </GlassesContainer>
                        {selectedPrizesForModal && (
                            <BuyNowContainerMobile>
                                <BuyNowHeaderMobile>
                                    {selectedPrizesForModal[0].name}
                                </BuyNowHeaderMobile>
                                <div className="flex">
                                    <BuyImageContainerMobile>
                                        <BuyImageMainMobile
                                            src={
                                                selectedPrizesForModal[0].image
                                            }
                                            alt={selectedPrizesForModal[0].name}
                                        />
                                        {has3D &&
                                            selectedPrizesForModal.length >
                                                1 && (
                                                <BuyImageSecondaryMobile
                                                    src={
                                                        selectedPrizesForModal[1]
                                                            .image
                                                    }
                                                    alt={
                                                        selectedPrizesForModal[1]
                                                            .name
                                                    }
                                                />
                                            )}
                                    </BuyImageContainerMobile>
                                    <ModalDescriptionContainerMobile>
                                        <ModalNFTDescriptionMobile>
                                            {
                                                selectedPrizesForModal[0]
                                                    .description
                                            }
                                        </ModalNFTDescriptionMobile>
                                        <ModalBuyNowContainerMobile>
                                            <ModalBuyNowButtonMobile
                                                onClick={() => openFiatModal()}
                                                style={{
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                BUY FIAT (1 Week Delivery)
                                            </ModalBuyNowButtonMobile>
                                            <ModalBuyNowButtonMobile
                                                onClick={() =>
                                                    openCryptoModal()
                                                }
                                                style={{ marginTop: '10px' }}
                                            >
                                                Buy With Crypto (Instant
                                                Delivery)
                                            </ModalBuyNowButtonMobile>
                                        </ModalBuyNowContainerMobile>
                                    </ModalDescriptionContainerMobile>
                                </div>
                            </BuyNowContainerMobile>
                        )}
                    </MobileInnerContainer>
                </MobileModalContainer>
            )}
            {isModalVisible && (
                // Medium and larger screen modal (hidden on sm screens)
                <DesktopModalContainer>
                    <DesktopInnerContainer
                        style={{ backgroundColor: 'rgba(0, 158, 16, 0.7)' }}
                    >
                        <XButton onClick={() => setModalVisible(false)}>
                            X
                        </XButton>
                        <GlassesContainer>
                            {has3D && '3D Glasses Detected'}
                        </GlassesContainer>
                        {selectedPrizesForModal && (
                            <div className="relative">
                                <ModalImageContainerDesktop>
                                    {/* NFT Image with higher z-index */}
                                    <ModalImageMainDesktop
                                        src={selectedPrizesForModal[0].image}
                                        alt={selectedPrizesForModal[0].name}
                                    />
                                    {has3D &&
                                        selectedPrizesForModal.length > 1 && (
                                            <ModalImageSecondaryDesktop
                                                src={
                                                    selectedPrizesForModal[1]
                                                        .image
                                                }
                                                alt={
                                                    selectedPrizesForModal[1]
                                                        .name
                                                }
                                            />
                                        )}
                                </ModalImageContainerDesktop>
                            </div>
                        )}
                        <div className="text-center">
                            <ModalNFTHeaderDesktop>
                                {selectedPrizesForModal[0]!.name}
                            </ModalNFTHeaderDesktop>
                            <ModalNFTDescriptionDesktop>
                                {selectedPrizesForModal[0]!.description}
                            </ModalNFTDescriptionDesktop>
                            <ModalBuyNowButtonDesktop
                                onClick={() => openFiatModal()}
                                style={{ marginRight: '10px' }}
                            >
                                BUY FIAT (1 Week Delivery)
                            </ModalBuyNowButtonDesktop>
                            <ModalBuyNowButtonDesktop
                                onClick={() => openCryptoModal()}
                                style={{ marginLeft: '10px' }}
                            >
                                Buy With Crypto (Instant Delivery)
                            </ModalBuyNowButtonDesktop>
                        </div>
                    </DesktopInnerContainer>
                </DesktopModalContainer>
            )}

            <VendingMachineContainer>
                <VendingMachineInnerContainer>
                    <VendingMachineBackground id={'VendingMachineBackground'}>
                        <VendingNFTContainer>
                            <VendingRelativeSpace>
                                <VendingSlotContainer
                                    style={{
                                        animation:
                                            'wiggle 1s ease-in-out infinite',
                                    }}
                                >
                                    <div>
                                        {createVendNFTImage(
                                            vendingPrizesSlot1,
                                            1
                                        )}
                                    </div>
                                </VendingSlotContainer>
                                <VendingSlotContainer
                                    style={{
                                        animation:
                                            'wiggle 1s ease-in-out infinite',
                                    }}
                                >
                                    <div>
                                        {createVendNFTImage(
                                            vendingPrizesSlot2,
                                            2
                                        )}
                                    </div>
                                </VendingSlotContainer>
                                <VendingSlotContainer
                                    style={{
                                        animation:
                                            'wiggle 1s ease-in-out infinite',
                                    }}
                                >
                                    <div>
                                        {createVendNFTImage(
                                            vendingPrizesSlot3,
                                            3
                                        )}
                                    </div>
                                </VendingSlotContainer>
                            </VendingRelativeSpace>
                        </VendingNFTContainer>
                        <div className="fixed bottom-8 right-8 flex flex-col">
                            {showClaimButton && (
                                <button
                                    onClick={() => {
                                        openPopup();
                                    }}
                                    className="w-[155px] h-[54px] px-4  text-white text-center rounded-lg mb-4 animate-pulse bg-[#05CA0D]"
                                >
                                    Claim Your Free Spin
                                </button>
                            )}
                            {/* <button onClick={() => sweepButton()} className="w-[155px] bg-[#05CA0D] h-[54px] px-4 py-2 text-white text-center rounded-lg hover:bg-green-400">
                                Sweep
                            </button> */}
                        </div>
                    </VendingMachineBackground>
                </VendingMachineInnerContainer>
            </VendingMachineContainer>
        </>
    );
};
export default VendingMachine;
