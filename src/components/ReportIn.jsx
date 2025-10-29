"use client"
import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { PRODUCT_URL } from '../../constant';
import Link from 'next/link';
import { useSelector } from 'react-redux';

ModuleRegistry.registerModules([AllCommunityModule]);

const ReportInTable = () => {

    const dataIn = useSelector((state) => state?.sliceData?.importDataIn);

    const [colDefs] = useState([
        { field: "sku", headerName: "Sku", flex: 1, maxWidth: 100, wrapText: true, autoHeight: true, },
        { field: "StyleCode", headerName: 'Stylecode', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, 
              cellRenderer: (params) => {
                return (
                  <p className='cursor-pointer' title='click to copy' onClick={()=>navigator.clipboard.writeText(params?.value)}>{params?.value}</p>
                );
            },
        },
        {
            field: "ExportedUrlKey",
            headerName: 'Product Url',
            flex: 1,
            minWidth: 100,
            wrapText: true,
            autoHeight: true,
            cellRenderer: (params) => {
                const url = `${PRODUCT_URL}${params.value}`;
                return (
                    <Link href={url} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                        {url}
                    </Link>
                );
            },
        },
        { field: "productpushed", headerName: 'Product Pushed', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, },
        { field: "ListingBranchCode", headerName: 'Branch', flex: 1, maxWidth: 100, wrapText: true, autoHeight: true, },

    ]);


    return (
        <div className="ag-theme-alpine w-full overflow-x-auto">
            <div className='flex flex-row justify-between items-center'>

            </div>
            <div className='w-full my-8 '>
                <p className='my-2 font-semibold text-[#614119]'>Imported Stylecodes:{dataIn?.length}</p>
                <AgGridReact
                    //ref={gridRef}
                    theme="legacy"
                    rowHeight={40}
                    rowData={dataIn}
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

export default ReportInTable