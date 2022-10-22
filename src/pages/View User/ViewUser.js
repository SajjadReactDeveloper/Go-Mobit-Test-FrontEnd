import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ViewUser = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [Name, setName] = React.useState('');

  const handleChange = async(event) => {
    setName(event.target.value);
    const res = await axios.post(`/user/search`, {Name: event.target.value})
    setUser(res.data)
  };

  React.useEffect(() => {
    const getData = async() => {
        const res = await axios.get(`/user/view`)
        setData(res.data)
    }
    getData();
}, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: '30%',
      ...getColumnSearchProps('_id'),
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
      ...getColumnSearchProps('Name'),
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
        width: '30%',
        ...getColumnSearchProps('Email'),
      },
    {
      title: 'Cell Number',
      dataIndex: 'Cell',
      key: 'Cell',
      width: '20%',
      ...getColumnSearchProps('Cell'),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
      width: '20%',
      ...getColumnSearchProps('Age'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      ...getColumnSearchProps('createdAt'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      ...getColumnSearchProps('updatedAt'),
    },
  ];

  
  return (
    <>
    <Box sx={{ minWidth: 300, marginBottom: 5, float: 'right' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Search User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Name}
          label="Search User"
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {data.map((user) => (
            <MenuItem value={user.Name}>{user.Name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
        <Table columns={columns} dataSource={user.length > 0 ? Name === "All" ? data : user : data} />
    </>
  )
};

export default ViewUser;