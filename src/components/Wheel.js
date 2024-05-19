import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button, Space } from 'antd';
import cats from '../assets/cats.gif'
import dog from '../assets/dog.gif'

const colors = [
    "#BD559C",
    "#FFB3DE",
    "#E4007C",
    "#6583C6",
    "#FF6FFF",
    "#F9D73A",
    "#FD9E1B",
    "#FF69B4",
    "#F15A50",
    "#ffcc00",
    "#0066cc"
];

const getData = (list) => {
    let data = [];

    list.forEach(({ item, nick, point, index }) => {
        data = data.concat(new Array(point).fill({ index, item, nick, option: item?.slice(0, 44), style: { backgroundColor: colors[index % 11] } }));
    });

    return data;
};

const WheelRoulette = ({ list, onStop }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [wheelData, setWheelData] = useState(null);
    const showPrizer = !mustSpin && !!prizeNumber;
    const prizerInfo = showPrizer && wheelData[prizeNumber];

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
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
                        <img src={cats} width="340" height="300" controls alt='Cats' />
                    </div>
                )}

                {showPrizer && (
                    <div style={{ marginLeft: 40 }}>
                        <img src={dog} width="340" height="300" controls alt='Dog' />
                    </div>
                )}
            </Space>
        </div>
    )
};

export default WheelRoulette;
