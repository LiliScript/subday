import React, { useState } from 'react';
import { AppstoreOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

import Table from './ParsedTable';
import WheelRoulette from './Wheel';

const items = [
  {
    label: 'Фільми',
    key: 'films',
    icon: <PlayCircleOutlined />,
  },
  {
    label: 'Ігри',
    key: 'games',
    icon: <AppstoreOutlined />,
  },
];

const ParsedWrap = ({ films, games, onClear }) => {
    const [current, setCurrent] = useState('films');
    const [wheeling, setWheeling] = useState(false);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const toggleWheel = () => {
        setWheeling(!wheeling);
    };

    if (wheeling) {
        return (<WheelRoulette onStop={toggleWheel} list={current === 'films' ? films : games} />)
    }

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

            {((current === 'films' && !films.length) || (current === 'games' && !games.length)) ? (
                <div style={{ minWidth: 527, minHeight: 700 }}>
                    <p>А де дані?</p>
                </div>
            ) : (
                <div>
                    <Table films={films} games={games} type={current === 'films' ? 'films' : 'games'} />

                    <div>
                        <Button type="primary" onClick={toggleWheel}>
                            🍦💋🐣😍💫 КрУтИтИ кОлЕс0 {current === 'films' ? 'пО фіЛьмАм' : 'пО ігрАм'} 💫😍💥🍟🍦
                        </Button>
                    </div>

                    <div>
                        <Button type="link" onClick={onClear}>А давай спробуємо все спочатку...</Button>
                    </div>
                </div>
            )}
                
        </div>
    );
};

export default ParsedWrap;