"use client";
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import React, { useState } from 'react'
import { BLUEDART_TRACK, SEQUEL_TRACK } from '../../constant';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Modal from './ReactModal';
import { MdContentCopy } from "react-icons/md";
import { toast } from 'react-toastify';
import { format } from 'date-fns';

ModuleRegistry.registerModules([AllCommunityModule]);

const ShipmentStatusReport = () => {

    const deliveryStatusData = useSelector((state) => state?.sliceData?.deliveryStatusData);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});


    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [colDefs] = useState([
        { field: "ecomorderid", headerName: "Order No", flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header',
             cellRenderer: (params) => {
                return (
                  <p className='cursor-pointer' title='click to copy' onClick={()=>navigator.clipboard.writeText(params?.value)}>{params?.value}</p>
                );
            },
        },
        { field: "Orderrefno", headerName: 'OrderRef No.', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header', },

        {
            field: "AwNo",
            headerName: 'Shiplable No',
            flex: 1,
            minWidth: 100,
            wrapText: true,
            autoHeight: true,
            headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                const url = params.value == 'Sequel' || params.value == 'sequel247' ? `${SEQUEL_TRACK}${params.value}` :
                    params.value == 'bluedart' ? `${BLUEDART_TRACK}${params.value}` : params.value;
                return (
                    <>
                        {
                            params.value && params.value != 'null' &&
                           <p className='cursor-pointer' title='click to copy' onClick={()=>navigator.clipboard.writeText(params?.value)}>{params?.value}</p>
                        }
                    </>
                );
            },
        },

        //{ field: "mobile_no", headerName: 'Mobile No', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header', },

        //{ field: "cust_name", headerName: 'Customer', flex: 1, minWidth: 100, wrapText: false, autoHeight: true, },

        {
            field: "logisticPartner", headerName: 'Logistics', flex: 1, minWidth: 100, wrapText: true,
            autoHeight: true, headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <>
                        {
                            params.value && params.value != 'null' ?
                                <p>{params.value}</p> : <p>Not Assigned</p>
                        }
                    </>
                );
            },
        },
        {
            field: "Status", headerName: 'Status', flex: 1, minWidth: 100, wrapText: true, autoHeight: true,
            headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <p className={` font-semibold 'text-yellow-700'} `}>
                        {params.value}
                    </p>
                );
            },
        },
        {
            field: "ShippedOn", headerName: 'Shipped On', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <>
                        {
                            params.value && params.value != 'null' ?
                                <p>{format(params?.value, "yyyy-MM-dd HH:mm:ss")}</p> : <p>Not Assigned</p>
                        }
                    </>

                );
            },
        },

        {
            field: "Delivered_Message", headerName: 'Message  ', flex: 1, minWidth: 100, wrapText: true,
            autoHeight: true, headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <>
                        {
                            params.value && params.value != 'null' ?
                                <p className={`${params?.value == 'DELIVERED' ? 'text-green-500' : params?.value == 'CANCELLED' ? 'text-red-500' : 'text-yellow-700'}`}>{params.value}</p> : <p>IN TRANSIT</p>
                        }
                    </>
                );
            },
        },

        {
            field: "DeliveredOn", headerName: 'Delivered On', flex: 1, minWidth: 100, wrapText: true,
            autoHeight: true, headerClass: 'ag-left-aligned-header',
            cellRenderer: (params) => {
                return (
                    <>
                        {
                            params.value && params.value != 'null' ?
                                <p>{format(params?.value, "yyyy-MM-dd HH:mm:ss")}</p> : <p>---.---.--</p>
                        }
                    </>

                );
            },
        },

        // {
        //     field: "action",
        //     headerName: 'Action',
        //     flex: 1,
        //     maxWidth: 100,
        //     cellRenderer: (params) => (
        //         <p onClick={() => {
        //             setModalData(params?.data)
        //             openModal()
        //             console.log(params?.data)
        //         }} className="w-fit bg-gradient-to-r from-[#614119] via-[#d4af37] to-[#614119] cursor-pointer text-center text-white px-2 rounded-sm ">View more</p>
        //     )
        // }

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
            <div>
                {showModal && (
                    <Modal onClose={closeModal}>
                        <p className='text-center font-bold border-b-1 '>Summary</p>
                        <div className='flex flex-col gap-3 text-black my-2 '>
                            <div>
                                <p className='font-semibold flex items-center gap-x-2'>Order No : <span className='font-medium'>{modalData?.order_no}</span> <span className='cursor-pointer' onClick={() => {
                                    navigator.clipboard.writeText(modalData?.order_no);
                                    toast.success('Order No copied to clipboard!');

                                }}><MdContentCopy /></span></p>
                            </div>
                            <div>
                                <p className='font-semibold flex items-center gap-x-2'>Sku : <span className='font-medium'>{modalData?.barcode_no}</span> <span className='cursor-pointer' onClick={() => {
                                    navigator.clipboard.writeText(modalData?.barcode_no);
                                    toast.success('Sku copied to clipboard!');

                                }}><MdContentCopy /></span></p>
                            </div>
                            <div>
                                <p className='font-semibold'>Mobile No :<span className='font-medium'>{modalData?.mobile_no}</span></p>
                            </div>

                            <div>
                                <p className='font-semibold'>Customer Name :<span className='font-medium capitalize'>{modalData?.cust_name}</span></p>
                            </div>
                            <div>
                                <p className='font-semibold'>Branch Order No: <span className='font-medium capitalize'>{modalData?.branch_order_no}</span></p>
                            </div>

                            <div>
                                <p className='font-semibold'>Aw No: <span className='font-medium'>{modalData?.Awno && modalData?.Awno != 'null' ? modalData?.Awno : 'Not Generated'}</span></p>
                            </div>
                            <div>
                                <p className='font-semibold'>Status: <span className='font-medium'>{modalData?.Status}</span></p>
                            </div>
                            <div>
                                <p className='font-semibold'>Order Date: <span className='font-medium'>{modalData?.order_date}</span></p>
                            </div>
                            <div>
                                <p className='font-semibold '>{modalData.Status.charAt(0).toUpperCase() + modalData.Status.slice(1).toLowerCase()} On: <span className='font-medium'>{modalData?.Createdon}</span></p>
                            </div>

                            <div>
                                <p className='font-semibold'>Delivery Date : <span className='font-medium'>{modalData?.delivery_date}</span></p>
                            </div>
                            <div>
                                <p className='font-semibold'>Logistic Partner : <span className='font-medium'> {modalData?.logisticPartner && modalData?.logisticPartner != 'null' ? modalData?.logisticPartner : 'Not Assigned'}</span></p>
                            </div>

                        </div>
                    </Modal>
                )}
            </div>


        </div>
    )
}

export default ShipmentStatusReport