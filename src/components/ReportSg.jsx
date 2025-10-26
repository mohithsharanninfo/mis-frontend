"use client"
import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import {  PRODUCT_URL_SG } from '../../constant';
import Link from 'next/link';
import { useSelector } from 'react-redux';



ModuleRegistry.registerModules([AllCommunityModule]);

const ReportSgTable = () => {

    const dataSg = useSelector((state) => state?.sliceData?.importDataSg);

    const [colDefs] = useState([
        { field: "barcode_no", headerName: "Sku", flex: 1, maxWidth: 100, wrapText: true, autoHeight: true, },
        { field: "StyleCode", headerName: 'Stylecode', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, },
        {
            field: "ExportedUrlKey",
            headerName: 'Product Url',
            flex: 1,
            minWidth: 100,
            wrapText: true,
            autoHeight: true,
            cellRenderer: (params) => {
                const url = `${PRODUCT_URL_SG}${params.value}`;
                return (
                    <Link href={url} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                        {url}
                    </Link>
                );
            },
        },
        { field: "productpushedsg", headerName: 'Product Pushed', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, },
        { field: "branch_code", headerName: 'Branch', flex: 1, maxWidth: 100, wrapText: true, autoHeight: true, },
        // {
        //     field: "action",
        //     headerName: 'Action',
        //     flex: 1,
        //     maxWidth: 100,
        //     cellRenderer: (params) => (
        //         <p onClick={() => console.log(params?.data)} className="w-fit bg-gradient-to-r from-[#614119] via-[#d4af37] to-[#614119] cursor-pointer text-center text-white px-2 rounded-sm ">View</p>
        //     )
        // }

    ]);


    return (
        <div className="ag-theme-alpine w-full overflow-x-auto">
            <div className='w-full my-8 '>
                <p className='my-2 font-semibold text-[#614119]'>Imported Stylecodes:{dataSg?.length}</p>
                <AgGridReact
                    //ref={gridRef}
                    theme="legacy"
                    rowHeight={40}
                    rowData={dataSg}
                    columnDefs={colDefs}
                    defaultColDef={{
                        resizable: false,
                        sortable: false,
                        filter: false,
                        suppressMovable: true,
                        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', borderRight: '1px solid #d3d3d3' }
                    }}
                    domLayout="autoHeight"
                    copyHeadersToClipboard={true}
                />
            </div>
        </div>
    )
}

export default ReportSgTable