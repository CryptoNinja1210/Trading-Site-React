import React, { useEffect, useState } from 'react';
import { Tabs, Table, List, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addStrategy, deleteStrategy, getDefaultStrategies, getStrategies } from '../../actions/backtesting';
import PageDescription from '../layout/PageDescription';
import BreadCrumb from '../layout/BreadCrumb';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditStrategy from './EditStrategy';
import CreateStrategyBtn from './CreateStrategyBtn';

const Backtesting = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('new');
  const [name, setName] = useState('')
  
  //fetching defaultStrategies or strategies
  const { defaultStrategies, strategies } = useSelector(
    ({ backtesting }) => backtesting
  );
  
  //dispatching get defaultStrategies or strategies action functions
  useEffect(() => {
    // dispatch(getStrategies());
    // strategies
    dispatch(getDefaultStrategies());
  }, []);
    
  //table multiSelect feature
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      dispatch(deleteStrategy(selectedRowKeys))
      setLoading(false);
    }, 500);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  //table and list data state
  const [tableData, setTableData] = useState([]);
  const [listData, setListData] = useState([])

  //setState of defaultStrategies or strategies
  useEffect(() => {
    if (strategies.length !== 0) {
      setTableData([
        ...strategies,

      ]);
      setListData([]);
    } 
    else {
      setTableData([]);
      setListData(defaultStrategies);
    }
  }, [strategies, defaultStrategies]);

  //table column setting
  const columns = [
    {
      title: 'Strategy Name',
      dataIndex: 'name',
      render: (name) => (
        <Link id={name} to={`strategy/${name.split(' ').join('_')}`} onClick={()=>setStatus('default')}>
          {name}
        </Link>
      )
    },
    {
      title: 'Last Test',
      dataIndex: 'lastTest',
      sorter: {
        compare: (a, b) => a.lastTest - b.lastTest,
        multiple: 6
      }
    },
    {
      title: 'Last Test Time',
      dataIndex: 'lastTestTime',
      sorter: {
        compare: (a, b) => a.lastTestTime - b.lastTestTime,
        multiple: 5
      }
    },
    {
      title: 'Total Tests',
      dataIndex: 'totalTests',
      sorter: {
        compare: (a, b) => a.totalTests - b.totalTests,
        multiple: 4
      }
    },
    {
      title: 'Commets',
      dataIndex: 'comments',
      sorter: {
        compare: (a, b) => a.comments - b.comments,
        multiple: 3
      }
    },
    {
      title: 'Symbols for Performance Chart',
      dataIndex: 'symbolsForPerformanceChart',
      sorter: {
        compare: (a, b) => a.symbolsForPerformanceChart - b.symbolsForPerformanceChart,
        multiple: 2
      }
    }
  ];

  const [showSection, setShowEditSection] = useState(false)
  const handleCreateModal = () => {
    setShowEditSection((prevState)=>!prevState)
    setStatus((prev) => {return prev == 'default' ? 'new' : 'default'})
    if(status == 'new') dispatch(addStrategy(name))
  }

  //tab setting
  const tabItems = [
    {
      key: 'tab_1',
      label: `Strategies`,
      children: (
        <>
          <CreateStrategyBtn setShowModal={setShowEditSection} role='create'/>
          <Button type='primary' onClick={handleCreateModal}>{showSection ?'Create New Strategy and Run Test':'Customize Criteria'}</Button>
          <EditStrategy status={status} showSection={showSection} setShowEditSection={setShowEditSection} />
          <Table columns={columns} dataSource={tableData} size="small" rowSelection={rowSelection}/>
        </>
      )
    },
    {
      key: 'tab_2',
      label: `Compare All Tests For All Strategies`,
      children: `Content of Tab Pane 2`
    }
  ];
  
  //table container overflow setting
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  const ContainerHeight = 400;

  return (
    <div className="container-fluid">
      <BreadCrumb props={window.location.pathname} />
      <PageDescription page="backtesting" />
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={tabItems}
        style={{ marginTop: '10px' }}
      />
      <Button style={{display:tableData.length == 0 ?'none':'block'}} type="primary" danger onClick={start} disabled={!hasSelected} loading={loading}>
        Delete
      </Button>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span>
      <List style={{margin:"0 20px", display: strategies.length !== 0 ? "none" : "block" }}>
        <List.Item key="defaultStrategies comment">
          <div style={{fontWeight:"bold"}}><ExclamationCircleOutlined /> No records to display. Click the 'Create New Strategy' button above to create a new strategy.</div>
        </List.Item>
        <VirtualList
          data={listData}
          height={ContainerHeight}
          itemHeight={20}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item) => (
            <Link id={`default_${item.subject}`} to={`defaultStrategy/${item.subject.split(' ').join('_')}`}  style={{marginLeft:"20px"}} title={item.subject}>
              <div>{item.subject}</div>
            </Link>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default Backtesting;