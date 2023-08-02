import { SearchOutlined, LineChartOutlined, BarChartOutlined, DollarOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import { useSelector } from'react-redux';
import { useEffect, useState } from 'react';

const Sidebar = () => {
    const { isAuthenticated } = useSelector(({auth}) => auth)
    console.log(isAuthenticated)
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type
        };
    }
    const items = [
        getItem('BackTesting', 'sub1', <DollarOutlined />, [
            getItem('Backtesting', '1'),
            getItem('Screener', '2'),
            getItem('Charts', '3'),
            getItem('Patterns', '4'),
        ]),
        getItem('Screening', 'sub2', <SearchOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
        getItem('Charts', 'sub4', <LineChartOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),
        getItem('Patterns', 'sub5', <BarChartOutlined />, [
            getItem('Option 13', '13'),
            getItem('Option 14', '14'),
            getItem('Option 15', '15'),
            getItem('Option 16', '16'),
        ]),
    ];

    // submenu keys of first level
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4', 'sub5'];

    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        console.log(openKeys)
    },[openKeys])
    return isAuthenticated ? (
        <div className='sidebar'>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: '256px',
                    minWidth:'auto',
                }}
                items={items}
            />
        </div>
    ) : null;
};
export default Sidebar;