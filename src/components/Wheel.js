import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button, Space } from 'antd';
import cats from '../assets/cats.gif'
import dog from '../assets/dog.gif'

const getData = (list) => {
    let data = [];

    list.forEach(({ item, point }) => {
        data = data.concat(new Array(point).fill({ item, option: item.slice(0, 48) }));
    });

    return data;
};

const WheelRoulette = ({ list, onStop }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const data = getData(list);
    const showPrizer = !mustSpin && !!prizeNumber;

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    return (
        <div>
            <Space>
                <div>
                    {showPrizer && <p>🍦 Переможець - {data[prizeNumber].item}! 🍦</p>}
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        fontSize={8}
                        radiusLineWidth={1}
                        textDistance={50}
                        backgroundColors={[
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
                        ]}
                        // textColors={['#ffffff']}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                    <div>
                        {mustSpin ? '🤡 Кручу-верчу 🤡' : <Button type="primary" onClick={handleSpinClick}> Крутити... </Button>}
                    </div>
                    <div>
                        <Button type="link" onClick={onStop}>Зупините це свавілля!!1</Button>
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
