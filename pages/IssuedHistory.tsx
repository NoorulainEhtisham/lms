//User side
import 'react';
import { Box, Checkbox, Grid, IconButton, Tooltip } from '@material-ui/core';
import MaterialDataTable from '../shared-components/data-table';
import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import axios from 'axios';


const url = 'http://localhost:4000';
const user = { user_name: 'Ali Hasan', user_id: '101' };

const FilterMultiValDataComponent = (props: any) => {
  const [allIssueReturns, setAllIssueReturns] = useState<any>([]);
  // receive database table here

  useEffect(() => {

    axios.request({
      url: url + '/issuereturn/getAllUserSide',
      data: user,
      method: 'POST',
    }).then((response) => {
      console.log(response.data);
      setAllIssueReturns(response.data);
    });
  }, []);

  const columnDefs: any[] = [
    { title: 'Book Name', field: 'title', editable: 'never' },
    { title: 'Issue date', field: 'ISSUE_DATE', editable: 'never' },
    { title: 'Due date', field: 'DUE_DATE', editable: 'never' },
    { title: 'Amount fine if book not returned', field: 'AMOUNT_FINE', editable: 'never' },

    {
      title: 'Return Status',
      field: 'Returned',
      editable: 'never',
      //Edit the following code:
      render: (rowData: any) => <Checkbox disabled checked={rowData.Returned}></Checkbox>,
      editComponent: (props: any) => {
        return (
          <Checkbox
            checked={props.rowData.Returned}
          // onChange={(e) => {
          //   const newRowData = { ...props.rowData, Returned: e.target.checked };
          //   props.onRowDataChange(newRowData);
          // }}
          />
        );
      },
    },
    { title: 'Accumulated late fine', field: 'LATE_FINE', editable: 'never' },
    { title: 'Returned on date', field: 'RETURN_DATE', editable: 'never' },
    { title: 'fine payed on date', field: 'FINE_DATE', editable: 'never' },
    { title: 'Fine Amount', field: 'AMOUNT_FINE', editable: 'never' },


  ];

  return (
    <React.Fragment>

      <MaterialDataTable
        options={{
          exportButton: true,
          draggable: false,
          actionsColumnIndex: -1,
          padding: 'dense',
          search: true,
        }}
        title={'The books you have issued'}
        data={allIssueReturns}
        columns={columnDefs}
        singleSelect={true}
      />

    </React.Fragment>
  );
};

export default FilterMultiValDataComponent;
