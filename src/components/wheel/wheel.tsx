import React, { useEffect, useState } from "react";
import spinner from "@assets/images/v-spinner-2-HUGER.png";
import { api } from "@libs/api";
import { getCookie } from "@libs/getCookie";
import { Wheel as RouletteWheel } from "react-custom-roulette";
import { RestockingText, WheelBackground, WheelCloseButton, WheelContainer, WheelPage, WheelPopupContainer } from "@styles/index";
interface PointerProps {
    src?: string; // Optional
    style?: React.CSSProperties; // Optional
}
const pointerProps: PointerProps = {
    src: spinner,
    style: {
        width: "22%",
    },
};
interface WheelProps {
    isPopupOpen: boolean;
    closePopup: () => void;

}
export function Wheel({ isPopupOpen, closePopup }: WheelProps) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [mustSpin, setMustSpin] = useState(false);
    const [updatePage, setUpdatePage] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState<number | 0>(0);
    const [currentWallet, setCurrentWallet] = useState<string | null>(null);
    const [currentPrizes, setCurrentPrizes] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [runNextInQueue, setRunNextInQueue] = useState(false)
    const [wonPrize, setwonPrize] = useState<string | null>(null);
    const [Refresh, setRefresh] = useState(false)
    const [transactionType, setTransactionType] = useState<string | null>(null);
    const wheelEventId = process.env.REACT_APP_WHEEL_EVENT_ID;

    function isPastDate() {
        const now = new Date();
        const contestDate = new Date(now.getFullYear(), 6, 25, 10, 52, 0);
        if (now > contestDate) {
            return true;
        }
        return false;
    }
    //HERE this function deletes person who just went in que and then moves the next person in que to the front of the line.
    const NextInQueue = async () => {
        setTimeout(async () => {
            await api.post("/Queue/NextInQueue", { eventId: wheelEventId })
                .then((res) => {
                    console.log("Finished api.post /Queue/NextInQueue");
                    // window.location.reload();
                    closePopup();
                    window.location.reload();
                });
        }, 1000);
    };


    const getPrizes = async () => {
        await api
            .post("/Prize/GetAllUnclaimedByEvent", {
                eventId: wheelEventId,
            })
            .then((res) => {
                setCurrentPrizes(res.data);
                let Prizes = res.data;
                const data = Prizes.map((prize: any, index: number) => {
                    const lastSixCharacters = prize.id.slice(-6);
                    let prizeObject: any = {
                        option: prize.name + "(" + lastSixCharacters + ")", style: { fontSize: '0px' },
                        optionSize: prize.name === "ob" ? 1 : 20,
                    };
                    if (prize.image) {
                        prizeObject.image = {
                            uri: prize.image,
                            offsetY: 120,
                            sizeMultiplier: 0.7
                        };
                    }
                    return prizeObject;
                });
                setData(data);
            });
    };

    // TODO find way to check the position in queue for transaction type 
    const claimPrize = async () => {
        const foundPrize = currentPrizes.find(prize => prize.id.slice(-6) === wonPrize);
        if (!foundPrize) {
            return;
        }
        console.log(transactionType)
        try {
            if (transactionType === 'crypto') {
                console.log('crypto')
                await api.post("/Prize/ClaimTransfer", {
                    prizes: [foundPrize],
                    walletAddress: currentWallet,
                }).then(async (res) => {
                    if (res.status === 200) {
                        console.log(foundPrize.type)
                    }
                });
            } else if (transactionType === 'fiat') {
                console.log('fiat')
                await api.post("/Prize/ClaimHoldTransfer", {
                    prizes: [foundPrize],
                    walletAddress: currentWallet,
                }).then(async (res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                    }
                });
            }
            await getPrizes();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };


    const handleSpinClick = async () => {
        if (!mustSpin && !hasSpun) {
            // await setStatusSpin('Spinning', '202f9a1a-a841-4b5d-afab-4bbf74276154', currentPosition?.[0]);
            setMustSpin(true);
            setHasSpun(true);
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
        }

    };

    // const setStatusSpin = async (spinStatus: string, eventId: string, position?: number) => {
    //     setIsBusy(true);
    //     await api
    //         .post("/Queue/StatusSpin", {
    //             eventId: wheelEventId,
    //             status: spinStatus,
    //             position: currentPosition?.[0],
    //         }).then(async () => {
    //             setIsBusy(false);
    //         })
    // }

    // const checkSpinStatus = async () => {
    //     await api
    //         .post("/Queue/CheckSpinStatus", {
    //             eventId: wheelEventId,
    //         })
    //         .then((res) => {
    //             if (res.data === 'WaitingSpin') {
    //                 setRefresh(true)
    //             }
    //         })
    // }
    const initialLoad = async () => {
        if (mustSpin) return;
        if (!mustSpin) {
            let walletAddress = getCookie("walletAddress");
            setCurrentWallet(walletAddress);
            await getPrizes().then(async () => {
                // await getClaimedPrizes().then(async () => {
                // })
                await getTransactionType();
            });
        }
    }
    const getTransactionType = async () => {
        let walletAddress = getCookie("walletAddress");

        await api
            .post("/Queue/GetPositionTransactionType", {
                eventId: wheelEventId,
                walletAddress: walletAddress
            })
            .then((res) => {
                console.log(res.data[0])
                if (res.data[0].transactionType === 'crypto') {
                    console.log('crypto')
                    setTransactionType('crypto')
                } else if (res.data[0].transactionType === 'fiat') {
                    console.log('fiat')
                    setTransactionType('fiat')
                }
            })
    }
    const removeUpdatePrize = async () => {
        console.log("Starting removeUpdatePrize");
        await claimPrize().then(async () => {
            console.log("Finished claimPrize");
            setRunNextInQueue(true);
            // await NextInQueue()
        });
        console.log("Finished removeUpdatePrize");
    };
    useEffect(() => {
        if (!runNextInQueue) return;
        (async () => {
            await NextInQueue();
        })()
    }, [runNextInQueue])

    useEffect(() => {
        if (!Refresh) return;
        if (Refresh) {
            initialLoad();
        }
    }, [Refresh])
    // useEffect(() => {
    //     if (!data) return;
    //     (async () => {
    //         await getTransactionType();
    //     })()
    // }, [data])
    // useEffect(() => {
    //     if (!shouldPoll) return;
    //     const interval = setInterval(async () => {
    //         setShouldPoll(false);
    //         setShouldPoll(true);
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, [shouldPoll]);


    useEffect(() => {
        if (updatePage) return;
        initialLoad()
    }, [updatePage]);
    useEffect(() => {
        if (!wonPrize) return;
        if (wonPrize) {
            removeUpdatePrize().then(async () => {
                // await getClaimedPrizes();
            }
            );
        }
    }, [wonPrize])
    useEffect(() => {
        setPopupOpen(isPopupOpen);
    }, [isPopupOpen]);
    return (
        <WheelPage>
            {popupOpen && (
                <WheelPopupContainer>
                    <WheelBackground>
                        {/* Close button */}
                        <WheelCloseButton
                            onClick={() => {
                                closePopup();
                            }}                        >
                            Close
                        </WheelCloseButton>
                        {currentWallet && (
                            <WheelContainer id={"wheelContainer"}>
                                {currentPrizes.length > 0 ? (
                                    <div id={'wheelCenter'}>
                                        <RouletteWheel
                                            mustStartSpinning={mustSpin}
                                            prizeNumber={prizeNumber}
                                            data={data}
                                            backgroundColors={["#0f0c23", "#2a1e59"]}
                                            textColors={["black"]}
                                            onStopSpinning={() => {
                                                setMustSpin(false);
                                                setwonPrize(
                                                    data[prizeNumber].option.slice(-8).replace(/[()]/g, "")
                                                );
                                            }}
                                            radiusLineWidth={1}
                                            outerBorderWidth={10}
                                            fontSize={12}
                                            pointerProps={pointerProps}
                                            innerRadius={20}
                                        />
                                    </div>
                                ) : (
                                    <RestockingText>
                                        Restocking, come back later.
                                    </RestockingText>
                                )}
                                {/* HERE we need to check to see if the currentWallet is on the que list which would verify if they have made a puchase. */}
                                <button
                                    className={`bg-[#37b063] text-black min-w-[100px] min-h-[50px] mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(isPastDate()) || hasSpun ? '' : 'cursor-not-allowed'
                                        }`}
                                    onClick={handleSpinClick}
                                    disabled={(!isPastDate()) || hasSpun}
                                >
                                    Spin
                                </button>
                            </WheelContainer>
                        )}
                        {/* <ClaimedLeaderboard wonPrize={wonPrize} /> */}
                        {/* {
                            claimedPrizes.length > 0 && currentWallet && (
                                <div className="absolute top-12 right-12 bg-[#aff57d] opacity-90 px-2 py-2">
                                    <h3 className="text-xl font-semibold">Claimed Prizes</h3>
                                    <hr className="border-b-2 border-black mt-2" />
                                    <ol className="mt-0 text-sm">
                                        {claimedPrizes.map((prize, index) => (
                                            <li key={prize.id}>
                                                {index + 1}. {prize.ownerWallet.slice(0, 4)}...{prize.ownerWallet.slice(-4)} - {prize.name}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )
                        } */}
                    </WheelBackground>
                </WheelPopupContainer>
            )
            }
        </WheelPage >

    );
}
