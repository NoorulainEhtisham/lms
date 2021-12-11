//admin side
import 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Checkbox, Grid, IconButton, Tooltip } from '@material-ui/core';
import MaterialDataTable from '../shared-components/data-table';
import { NextPage } from 'next';
import axios from 'axios';
import moment from 'moment';


const url = 'http://localhost:4000';


const FilterMultiValDataComponent = (props: any) => {

  // receive database table here

  const [allIssueReturns, setAllIssueReturns] = useState<any>([]);
  // receive database table here

  useEffect(() => {

    axios.request({
      url: url + '/issuereturn/getAllAdminSide',
      method: 'GET',
    }).then((response) => {
      console.log(response.data);
      setAllIssueReturns(response.data);
    });
  }, []);


  const columnDefs: any[] = [
    { title: 'Issue_ID', field: 'ISSUE_ID', editable: 'never' },
    {
      title: 'Member_ID',
      field: 'MEMBER_ID',

      // cellStyle: {
      //     maxWidth: '75ch',
      //     whiteSpace: 'nowrap',
      //     overflow: 'hidden',
      //     textOverflow: 'ellipsis',
      // },
    },
    { title: 'Copy_ID', field: 'COPY_ID' },
    {
      title: 'ISSUE_DATE', field: 'ISSUE_DATE', type: "date",
      render: rowData => moment(rowData.DUE_DATE).format('DD-MMM-YY')
    },
    {
      title: 'DUE_DATE', field: 'DUE_DATE', type: "date",
      render: rowData => moment(rowData.DUE_DATE).format('DD-MMM-YY')
    },
    { title: 'LATE_FINE', field: 'LATE_FINE' },
    {
      title: 'RETURN_DATE', field: 'RETURN_DATE', type: "date",
      render: rowData => moment(rowData.DUE_DATE).format('DD-MMM-YY')
    },
    {
      title: 'FINE_DATE', field: 'FINE_DATE', type: "date",
      render: rowData => moment(rowData.DUE_DATE).format('DD-MMM-YY')
    },
    { title: 'AMOUNT_FINE', field: 'AMOUNT_FINE' },
    {
      title: 'Return Status',
      field: 'RETURN_DATE', //existence of return_date
      //Edit the following code:
      render: (rowData: any) => <Checkbox checked={rowData.RETURN_DATE ? true : false}></Checkbox>,
      // editComponent: (props: any) => {
      //   console.log(props);
      //   return (
      //     <Checkbox
      //       checked={props.rowData.RETURN_DATE ? true : false}
      //       onChange={(e) => {
      //         const newRowData = { ...props.rowData, Returned: e.target.checked };
      //         props.onRowDataChange(newRowData);
      //       }}
      //     />
      //   );
      // },
    },

  ];



  return (
    <React.Fragment>

      <MaterialDataTable
        options={{
          exportButton: true,
          draggable: false,
          actionsColumnIndex: 0,
          padding: 'dense',
          search: true,
        }}
        title={'Members Issued History'}
        data={allIssueReturns}
        columns={columnDefs}
        singleSelect={true}
        editable={{
          onRowAdd: (newAddedData) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                axios.request({
                  url: url + `/issuereturn/insertbyadmin`,
                  data: newAddedData,
                  method: 'POST',
                }).then((response) => {
                  // const dataUpdate = [...allIssueReturns];
                  // const index = oldData.tableData.id;
                  // dataUpdate[index] = newData;
                  setAllIssueReturns([...allIssueReturns, newAddedData]);
                });
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData: any) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                axios.request({
                  url: url + `/issuereturn/updatebyid`,
                  data: newData,
                  method: 'PUT',
                }).then((response) => {
                  const dataUpdate = [...allIssueReturns];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;

                  setAllIssueReturns([...dataUpdate]);

                });
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData: any) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                axios.request({
                  url: url + `/issuereturn/deletebyid`,
                  data: { id: oldData.ISSUE_ID },
                  method: 'DELETE',
                }).then((response) => {
                  console.log(oldData);
                  const dataDelete = [...allIssueReturns];
                  const index = oldData.tableData.id;
                  console.log(index);
                  dataDelete.splice(index, 1);
                  setAllIssueReturns([...dataDelete]);
                });

                resolve();
              }, 1000);
            }),
        }}
      />

    </React.Fragment>
  );
};

export default FilterMultiValDataComponent;
