"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import axios from 'axios';
import { BASE_URL, PRODUCT_URL_SG } from '../../constant';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import DateRangePickerPopup from './DateRangePicker';
import { CiSearch } from "react-icons/ci";


ModuleRegistry.registerModules([AllCommunityModule]);

const ReportSgTable = () => {

    const [dataSg, setDataSg] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const dateRange = useSelector((state) => state?.sliceData);

    const getReportsSg = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/importedProductsSg?fromDate=${dateRange?.startDate}&toDate=${dateRange?.endDate}`)
            const result = await response?.data?.data
            setDataSg(result)
        } catch (err) {
            throw new Error(err)
        }
    }

    const searchStylecodesSg = async () => {
        try {
            if (!searchTerm) {
                getReportsSg()
                return
            }
            const response = await axios.get(`${BASE_URL}/api/searchstylecodeSg?searchTerm=${searchTerm}`);
            const result = await response?.data?.data
            setDataSg(result)
        } catch (err) {
            throw new Error(err)
        }
    }

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
        { field: "productpushedsg", headerName: 'Productpushed', flex: 1, minWidth: 100, wrapText: true, autoHeight: true, },
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

    useEffect(() => {
        getReportsSg()
    }, [dateRange?.startDate, dateRange?.endDate])

    return (
        <div className="ag-theme-alpine w-full overflow-x-auto">
            <div className='flex flex-row justify-between items-center'>
                <div> <DateRangePickerPopup /></div>
                <div className='w-full max-w-[250px]'>
                    <label className="block text-sm font-semibold text-[#c7a44d]">Search </label>
                    <div className='flex flex-row justify-end items-center gap-2 '>
                        <div className='w-full'>
                            <input type="text" placeholder='Stylecode...' onChange={(e) => {
                                setSearchTerm(e.target.value)
                                if (e.target.value === '') {
                                    getReportsSg()
                                }
                            }} className='border-2 border-amber-300 p-2 outline-amber-200 rounded w-full' />
                        </div>
                        <div className='bg-[#b8860b] p-1 rounded-bl-md rounded-tr-md cursor-pointer' onClick={() => searchStylecodesSg()}> <CiSearch color='white' size={24} /></div>
                    </div>
                </div>

            </div>
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
                        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
                    }}
                    domLayout="autoHeight"
                    copyHeadersToClipboard={true}
                />
            </div>
        </div>
    )
}

export default ReportSgTable