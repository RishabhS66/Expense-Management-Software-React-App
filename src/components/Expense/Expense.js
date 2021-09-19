import React from "react";
import {
  Card,
  Button,
  
} from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./Expense.css";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import { GetExpenseSheets } from '../../services/expense.service';


const { SearchBar } = Search;
const headerSortingStyle = { backgroundColor: '#c8e6c9' };


const afterSearch = (newResult) => {
    console.log(newResult);
  };

const columns = [
//     {
//   dataField: 'id',
//   text: 'ID',
//   filter: textFilter(),
//   sort: true
// }, 
{
  dataField: 'date',
  text: 'Date',
//   filter: textFilter(),
  sort: true,
  onSort: (field, order) => {
    console.log();
  },
  headerSortingStyle
}, {
  dataField: 'description',
  text: 'Description',
//   filter: textFilter(),
  sort: true,
  headerSortingStyle
}, {
  dataField: 'amount',
  text: 'Amount',
//   filter: textFilter(),
  sort: true,
  headerSortingStyle
}];

const products = [{
    id : "1",
    date:"31-13-23",
    description: "aaa",
    amount : "2424"
}, {
    id : "2",
    date:"21-13-23",
    description: "bbb",
    amount : "43524"
}]


export default function Expense() {

  const dispatch = useDispatch();

    const expandRow = {
     renderer: row => (
              <div>
                <p>.....</p>
                <p>You can render anything here, also you can add additional data on every row object</p>
                <p>expandRow.renderer callback will pass the origin row object to you</p>
              </div>
            ),
            showExpandColumn: true
          };

const { SearchBar } = Search;
const headerSortingStyle = { backgroundColor: "#c8e6c9" };

        return (
          

    <div type= "card">
            {/* <Container > */}
            
            <Navbar bg="light" expand="lg">
    <Breadcrumb className="breadCrumb" >
    <div className="ms-5"/>
  <Breadcrumb.Item href="/home" > <a className="text-muted" >Home</a></Breadcrumb.Item>
  {/* <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Library
  </Breadcrumb.Item> */}
  <Breadcrumb.Item active> My Expense Sheets</Breadcrumb.Item>
        </Breadcrumb> 
    </Navbar>
    <br/>
            {/* <Container className="mt-n2" style={{width: "200%"}}> */}
            <Card style={{ width: "95%" }}  className="ms-5" >
            
              <Card.Header as="h5" >
               
              <div className="text-primary">EXPENSE SHEET LIST
                <Button variant="success" className="float-end" id="addExpenseSheet" href='/expenseEntries' >
                <i className="bi bi-plus"></i> Add Expense Sheet
                </Button>
                </div>
                </Card.Header>
              <Card.Body>
                
              <ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search={ { afterSearch } }
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <hr />
        
        <BootstrapTable
        //   ref={ n => this.node = n }      //ASK NISHANT ABOUT THIS
          keyField="id"
          data={ products }
          columns={ columns }
          headerClasses="header-class"
        //   filter={ filterFactory() }
          pagination={ paginationFactory() }
          selectRow={ { mode: 'checkbox', clickToSelect: true } }
        //   expandRow={ expandRow }

          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>

                

              </Card.Body>
            </Card>
          {/* </Container> */}
          </div>
        );
    
}
