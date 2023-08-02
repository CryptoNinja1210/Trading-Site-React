import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../layout/BreadCrumb';
import PageDescription from '../layout/PageDescription';
import { Button, Table, Tabs } from 'antd';
import EditStrategy from './EditStrategy';

const Strategy = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(name);
  }, [name]);
  
  //table column setting
  const columns = [
    {
      title: 'Strategy Name',
      dataIndex: 'name',
      render: (name) => (
        <Link id={name} to={`strategy/${name.split(' ').join('_')}`}>
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
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, setTableData] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [showSection, setShowEditSection] = useState(false)
  const handleCreateModal = () => {
    setShowEditSection((prevState)=>!prevState)
  }
  //tab setting
  const tabItems = [
    {
      key: 'tab_1',
      label: `Strategies`,
      children: (
        <>
         <Button type='primary' onClick={handleCreateModal}>Customize Criteria and Run Test</Button>
          <EditStrategy showSection={showSection} setShowEditSection={setShowEditSection} />
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
  return (
    <div className="container-fluid">
      <BreadCrumb />
      <PageDescription page="Custom Strategy" />
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={tabItems}
        style={{ marginTop: '10px' }}
      />
      <h4>{/*name*/}</h4>
      <p>There are no test database yet.</p>
      <p>{`Selected Strategy is just "${name}` + '"'}</p>
    </div>
  );
};

export default Strategy;