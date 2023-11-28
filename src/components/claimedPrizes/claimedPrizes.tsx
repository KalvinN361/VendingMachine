// import React, { useEffect, useState } from 'react';
// import { getCookie } from '@lib/getCookie';
// import { api } from '@lib/api';

// interface ClaimedLeaderboardProps {
//     wonPrize: string | null;
// }

// const ClaimedLeaderboard: React.FC<ClaimedLeaderboardProps> = ({ wonPrize }) => {
//     const [claimedPrizes, setClaimedPrizes] = useState<any[]>([]);
//     const [currentWallet, setCurrentWallet] = useState<string | null>(null);

//     const getClaimedPrizes = async () => {
//         await api
//             .post("/Prize/GetAllClaimedByEvent", {
//                 eventId: wheelEventId,
//             })
//             .then(async (res) => {
//                 setClaimedPrizes(res.data);
//             });
//     };
//     useEffect(() => {
//         setTimeout(() => {
//             getClaimedPrizes();
//             let walletAddress = getCookie("walletAddress");
//             setCurrentWallet(walletAddress);
//         }, 1500);
//     }, [wonPrize]);
//     return (
//         <>
//             {
//                 claimedPrizes.length > 0 && currentWallet && (
//                     <div className="absolute top-12 right-12 bg-[#aff57d] opacity-90 px-2 py-2">
//                         <h3 className="text-xl font-semibold">Claimed Prizes</h3>
//                         <hr className="border-b-2 border-black mt-2" />
//                         <ol className="mt-0 text-sm">
//                             {claimedPrizes.map((prize, index) => (
//                                 <li key={prize.id}>
//                                     {index + 1}. {prize.ownerWallet.slice(0, 4)}...{prize.ownerWallet.slice(-4)} - {prize.name}
//                                 </li>
//                             ))}
//                         </ol>
//                     </div>
//                 )
//             }
//         </>
//     );
// }
// export default ClaimedLeaderboard;
export { };