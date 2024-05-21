import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button, Space } from 'antd';

import { colors } from '../utils/colors';
import { gifs, mainGif } from '../utils/gifs';

const getData = (list) => {
    let data = [];

    list.forEach(({ item, nick, point, index }) => {
        data = data.concat(new Array(point).fill({ index, item, nick, option: item?.slice(0, 44), style: { backgroundColor: colors[index % 11] } }));
    });

    return data;
};

const getRandomGif = () => {
    const keys = Object.keys(gifs);
    const newGifNumber = Math.floor(Math.random() * keys.length);

    return keys[newGifNumber];
};

const WheelRoulette = ({ list, onStop }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [wheelData, setWheelData] = useState(null);
    const [winGif, setWinGif] = useState(null);
    const showPrizer = !mustSpin && !!prizeNumber;
    const prizerInfo = showPrizer && wheelData[prizeNumber];

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
            setWinGif(getRandomGif());
        }
    };

    // TO DO
    // const deletePrizer = () => {};

    useEffect(()=> {
        if (list) {
            const newWheelData = getData(list);
            setWheelData(newWheelData);
        }
    }, [list]);

    return (
        <div>
            <Space>
                <div style={{ textAlign: '-webkit-center' }}>
                    {showPrizer && (
                        <div><p>🍦 Переможець - {prizerInfo.item}! 🍦</p></div>
                    )}
                    {wheelData && (
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={wheelData}
                            fontSize={8}
                            radiusLineWidth={1}
                            textDistance={50}
                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                        />
                    )}
                    <div>
                        {mustSpin ? '🤡 Кручу-верчу 🤡' : <Button type="primary" onClick={handleSpinClick}> Крутити... </Button>}
                    </div>
                    {/* {showPrizer && (
                        <div style={{ marginTop: 8 }}>
                            <Button type="link" onClick={deletePrizer}>Видалити переможця зі списку</Button>
                        </div>
                    )} */}
                    <div>
                        <Button type="link" onClick={onStop}>Хочу додому</Button>
                    </div>
                </div>

                {mustSpin && (
                    <div style={{ marginLeft: 40 }}>
                        <img src={mainGif} width="340" height="300" controls alt='Cats' />
                    </div>
                )}

                {showPrizer && (
                    <div style={{ marginLeft: 40 }}>
                        <img src={gifs[winGif]} width="340" height="300" controls alt='Dog' />
                    </div>
                )}
            </Space>
        </div>
    )
};

export default WheelRoulette;
