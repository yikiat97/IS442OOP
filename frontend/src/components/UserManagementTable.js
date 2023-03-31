import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, Button, TableContainer, Link } from "@mui/material";
import { useState, useRef } from "react";
import { Table, Space, Input } from "antd";
import Highlighter from "react-highlight-words";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function UserManagementTable({ props }) {
  console.log(props);
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
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Registration Number",
      dataIndex: "registrationNum",
      key: "registrationNum",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("registrationNum"),
    },
    {
      title: "Country of Origin",
      dataIndex: "country",
      key: "country",
      ...getColumnSearchProps("country"),
    },
    {
      render: (val) =>
        val.name === "Quantum" ? (
          <Link href={"QuantumDetails/" + val.registrationNum} underline="none">
            <ArrowForwardIosIcon />
          </Link>
        ) : (
          <Link href={"CompanyDetails/" + val.registrationNum} underline="none">
            <ArrowForwardIosIcon />
          </Link>
        ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <TableContainer component={Paper}>
      <Table columns={columns} dataSource={props} onChange={onChange} />
    </TableContainer>
  );
}

export default UserManagementTable;
