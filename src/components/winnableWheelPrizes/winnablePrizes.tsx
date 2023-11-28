import { api } from '@libs/api';
import { useEffect, useState } from 'react';

export const WinnableWheelPrizes: React.FC = (props) => {
    const [data, setData] = useState<any[]>([]);
    const wheelEventId = process.env.REACT_APP_WHEEL_EVENT_ID;

    const getPrizes = async () => {
        await api
            .post('/Prize/GetAllUnclaimedByEvent', {
                eventId: wheelEventId,
            })
            .then((res) => {
                // setCurrentPrizes(res.data);
                let Prizes = res.data;
                Prizes.map((prize: any, index: number) => {
                    const lastSixCharacters = prize.id.slice(-6);
                    return {
                        option: prize.name + '(' + lastSixCharacters + ')',
                        image: {
                            uri: prize.image,
                            offsetY: 120,
                            sizeMultiplier: 0.7,
                        },
                        optionSize: prize.name === 'ob' ? 1 : 25,
                    };
                });
                setData(Prizes);
            });
    };
    useEffect(() => {
        getPrizes();
    }, []);

    return (
        <div
            id={'help'}
            className="hidden md:block md:absolute top-1/2 right-0 transform -translate-y-1/2 h-[500px] mr-4"
        >
            <h1 className="text-white text-xl underline">
                Remaining Wheel Prizes
            </h1>
            <ol>
                {data.map((prize, index) => (
                    <li className="text-white" key={index}>
                        {index + 1}. {prize.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};
