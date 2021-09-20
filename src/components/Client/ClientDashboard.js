import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Card, Button, Dropdown } from "react-bootstrap";
import AddClient from "./AddClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClients, deleteClient } from "../../actions/client";

const ClientDashboard = () => {
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState("Add");
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
    setCurrClient(initialClient);
    setMethod("Add");
  };

  const initialClient = {
    fullName: "",
    nickName: "",
    email: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      telephone1: "",
      telephone2: "",
      fax: "",
    },
    website: "",
    billDetails: "",
  };

  const [currClient, setCurrClient] = useState(initialClient);
  const [currIndex, setCurrIndex] = useState(-1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients())
      .then(() => {
        // console.log("Clients fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch clients");
      });
  }, [dispatch, currClient]);

  const SortCaret = (order, column) => {
    if (!order)
      return (
        <span className="float-end">
          <font color="grey">
            &nbsp;&nbsp;<i className="bi bi-caret-up-fill"></i>
            <i className="bi bi-caret-down-fill"></i>
          </font>
        </span>
      );
    else if (order === "asc")
      return (
        <span className="float-end">
          &nbsp;&nbsp;<i className="bi bi-caret-up-fill"></i>
          <font color="grey">
            <i className="bi bi-caret-down-fill"></i>
          </font>
        </span>
      );
    else if (order === "desc")
      return (
        <span className="float-end">
          &nbsp;&nbsp;
          <font color="grey">
            <i className="bi bi-caret-up-fill"></i>
          </font>
          <i className="bi bi-caret-down-fill"></i>
        </span>
      );
    return null;
  };
  const { clients: content } = useSelector((state) => state.client);
  // var index=-1;
  const handleSelect = (e) => {
    showModal();

    const index = content.findIndex(
      (o) => o.id.toString() === e.target.id.toString()
    );

    setCurrClient(content[index]);
    setCurrIndex(e.target.id);
    setMethod("Update");
  };
  const handleDelete = (e) => {
    const index = content.findIndex(
      (o) => o.id.toString() === e.target.id.toString()
    );

    setCurrClient(content[index]);
    dispatch(deleteClient(e.target.id))
      .then(() => {
        // history.push("/home");
        // console.log("Successfully deleted");
        setCurrClient(initialClient);
      })
      .catch(() => {
        // setLoading(false);
        alert("Could Not Delete Client!");
        setCurrClient(initialClient);
      });
  };
  const dropDown = (id) => {
    return (
      <Dropdown>
        <Dropdown.Toggle id="options-menu" variant="secondary">
          <i className="bi bi-gear-fill"></i> Options
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item onClick={handleSelect} id={id}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDelete} id={id} disabled>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const clientData = content.map((client) => {
    // const ActiveStatus = client.active ? "Active" : "Inactive";
    // const BadgeType = ActiveStatus === "Active" ? "success" : "danger";
    const Data = {
      // clientActiveStatus: <Badge bg={BadgeType}>{ActiveStatus}</Badge>,
      cFullName: client.fullName,
      cNickName: client.nickName,
      clientEmail: client.email,
      clientCountry: client.address.country,
      clientTelephone1: client.address.telephone1,
      clientOptions: dropDown(client.id),
    };
    return Data;
  });

  const columns = [
    // {
    //   dataField: "clientActiveStatus",
    //   text: "",
    //   sort: true,
    //   sortCaret: SortCaret,
    //   headerStyle: (colum, colIndex) => {
    //     return { width: "80px", textAlign: "center" };
    //   },
    // },
    {
      dataField: "cNickName",
      text: "Client Nick",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "cFullName",
      text: "Client Name",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "clientEmail",
      text: "Email Address",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "clientCountry",
      text: "Country",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "clientTelephone1",
      text: "Telephone 1",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "clientOptions",
      text: "",

      headerStyle: (colum, colIndex) => {
        return { width: "140px", textAlign: "center" };
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "cNickName",
      order: "asc", //desc
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      &nbsp; Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: clientData.length,
      },
    ],
  };

  const { SearchBar } = Search;

  return (
      <Card  style={{ width: "95%" }} className="ms-5">
        <Card.Header as="h4">
          CLIENTS
          <Button
            variant="success"
            className="float-end"
            id="addClient"
            onClick={showModal}
          >
            + Add Client
          </Button>
        </Card.Header>
        <Card.Body>
          <ToolkitProvider
            keyField="cNickName"
            data={clientData}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  srText="Search Clients :"
                  placeholder="Enter text"
                />
                <br />
                <BootstrapTable
                  {...props.baseProps}
                  hover
                  // selectRow={{ mode: "checkbox" }}
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory(options)}
                  noDataIndication="No data available in table"
                />
              </div>
            )}
          </ToolkitProvider>
        </Card.Body>
        <AddClient
          show={show}
          onHide={hideModal}
          index={currIndex}
          data={currClient}
          method={method}
        />
      </Card>
  );
};

export default ClientDashboard;
