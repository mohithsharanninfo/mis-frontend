import React, { useRef, useState } from 'react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStylecodes } from '@/redux/slice';

ModuleRegistry.registerModules([AllCommunityModule]);

const AgGridTable = ({ rowData }) => {
    const dispatch = useDispatch()
    const gridRef = useRef();

    const [colDefs] = useState([
        {
            headerName: '',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 60,
            suppressSizeToFit: true,
        },
        {
            field: "ImagePath",
            headerName: "Image",
            flex: 1,
            minWidth: 100,
            cellRenderer: (params) => {
                // Replace backslashes in URLs
                const cleanUrl = params.value?.replace(/\\/g, "/");
                if (!cleanUrl) {
                    return <span>No Image</span>;
                }
                return (
                    <img
                        src={cleanUrl}
                        alt="Product"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                );
            },
        },
        {
            field: "Stylecode", headerName: 'Stylecode', flex: 1, minWidth: 200, wrapText: true,
            autoHeight: true,
        },
        {
            field: "Name", headerName: 'Title', flex: 1, minWidth: 200, wrapText: true,
            autoHeight: true,
        },
        {
            field: "CategoryName", headerName: 'Category', flex: 1, minWidth: 100, wrapText: true,
            autoHeight: true,
        },
        { field: "LocaleIN", headerName: 'LocaleIN', flex: 1, minWidth: 100 },
        { field: "LocaleSG", headerName: 'LocaleSG', flex: 1, minWidth: 100 },
        { field: "LocaleAE", headerName: 'LocaleAE', flex: 1, minWidth: 100 },
        { field: "LocaleUS", headerName: 'LocaleUS', flex: 1, minWidth: 100 },
    ]);


    const onSelectionChanged = () => {
        const selectedData = gridRef.current.api.getSelectedRows();
        dispatch(setSelectedStylecodes(selectedData))
    };


    return (
        <div className="ag-theme-alpine w-full overflow-x-auto">
            <div className='w-full my-8 '>
                <AgGridReact
                    ref={gridRef}
                      theme="legacy"
                    rowHeight={100}
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection="multiple"
                    onSelectionChanged={onSelectionChanged}
                    suppressRowClickSelection={true}
                    defaultColDef={{
                        resizable: false,
                        sortable: false,
                        filter: false,
                        suppressMovable: true,
                        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                    }}
                    domLayout="autoHeight"
                />
            </div>
        </div>
    )
}

export default AgGridTable