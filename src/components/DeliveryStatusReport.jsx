"use client";
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL, PRODUCT_URL, SEQUEL_TRACK } from '../../constant';
import Link from 'next/link';
import { useSelector } from 'react-redux';



ModuleRegistry.registerModules([AllCommunityModule]);

const DeliveryStatusReport = () => {

const deliveryStatusData = useSelector((state) => state?.sliceData?.deliveryStatusData);

    const [colDefs] = useState([
        { field: "barcode_no", headerName: "Sku", flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header' },
        { field: "order_no", headerName: 'Order No.', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header', },
        {
            field: "OrderStatus", headerName: 'Status', flex: 1, minWidth: 100, wrapText: true, autoHeight: true,
            headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <p className={` ${params?.value == 'DELIVERED' ? 'text-green-500' : params?.value == 'CANCELLED' ? 'text-red-500' : 'text-yellow-700'} `}>
                        {params.value}
                    </p>
                );
            },

        },
        {
            field: "Awno",
            headerName: 'Awno',
            flex: 1,
            minWidth: 100,
            wrapText: true,
            autoHeight: true,
            headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                const url = `${SEQUEL_TRACK}${params.value}`;
                return (
                    <>
                        {
                            params.value ?
                                <Link href={url} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                                    {url}
                                </Link> : <p>Not Generated</p>
                        }
                    </>

                );
            },
        },

        { field: "mobile_no", headerName: 'Mobile No', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header', },

        { field: "cust_name", headerName: 'Customer', flex: 1, minWidth: 100, wrapText: false, autoHeight: true, },
        //{ field: "delivery_date", headerName: 'Expected Delivery', flex: 1, maxWidth: 100, wrapText: true, autoHeight: true, },
        {
            field: "Logistics", headerName: 'Logistics', flex: 1, minWidth: 100, wrapText: true,
            autoHeight: true, headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <>
                        {
                            params.value ?
                                <p>{params.value}</p> : <p>Not Assigned</p>
                        }
                    </>

                );
            },
        },

    ]);



    return (
        <div className="ag-theme-alpine w-full overflow-x-auto">
            <div className='w-full my-8 '>
                <p className='my-2 font-semibold text-[#614119]'>Total:{deliveryStatusData?.length}</p>
                <AgGridReact
                    //ref={gridRef}
                    theme="legacy"
                    rowHeight={40}
                    rowData={deliveryStatusData}
                    columnDefs={colDefs}
                    defaultColDef={{
                        resizable: false,
                        sortable: false,
                        filter: false,
                        suppressMovable: true,
                        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'start', fontSize: '12px', borderRight: '1px solid #d3d3d3', }
                    }}
                    domLayout="autoHeight"
                    copyHeadersToClipboard={true}
                />
            </div>
        </div>
    )
}

export default DeliveryStatusReport