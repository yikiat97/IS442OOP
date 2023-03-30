import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, Button, TableContainer, Link } from "@mui/material";
import { useState, useRef } from "react";
import { Table, Space, Input } from "antd";
import Highlighter from "react-highlight-words";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

function QuantumDetailTable({ props }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          fullWidth
          size="small"
          style={{
            marginBottom: 10,
            display: "block",
            variant: "outlined",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchIcon />}
            variant="contained"
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchIcon
        style={{
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      ...getColumnSearchProps("contactNumber"),
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
    },
    {
      render: () => <DeleteOutlineIcon sx={{ color: "#c62828" }} />,
    },
    {
      render: (val) => (
        <Link
          href={
            "../EditUser/" +
            props.companyDetails.registrationNum +
            "/" +
            val.email
          }
          underline="none">
          <EditIcon sx={{ color: "#1565c0" }} />
        </Link>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <TableContainer component={Paper}>
      <Table columns={columns} dataSource={props.users} onChange={onChange} />
    </TableContainer>
  );
}

export default QuantumDetailTable;
