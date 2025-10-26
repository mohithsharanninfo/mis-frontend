'use client';
import * as XLSX from 'xlsx';
import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../constant';
import AgGridTable from '@/components/AgGridTable';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader, RingLoader } from 'react-spinners';
import { FaFileCsv } from "react-icons/fa";
import { useUserDetails } from '@/auth';
import { SiTicktick } from "react-icons/si";


const ProductImport = () => {
  const { user } = useUserDetails();
  
    const selectedStylecodes = useSelector((state) => state?.sliceData?.selectedStylecodes)

    const [fileName, setFileName] = useState('No file choosen');
    const [excelData, setExcelData] = useState([]);
    const [resultData, setResultData] = useState([])

    const [loadExcel, setLoadExcel] = useState(false)
    const [loadImport, setLoadImport] = useState(false)

    const handleRefresh = () => {
        window.location.reload()
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFileName(e.target.files[0] ? e.target.files[0].name : 'No file choosen')

        if (!file) return;

        const reader = new FileReader();

        // Read file as binary string
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const fetchStyleCodeImage = async () => {
        if (excelData?.length <= 0) {
            return toast.warn('Please upload a CSV file.');
        }
        setLoadExcel(true)
        try {
            const response = await axios.post(`${BASE_URL}/api/getStylecodeImages`, { stylecodes: excelData });
            const result = await response?.data;
            setResultData(result?.data)
            if (result?.data?.length <= 0) {
                return toast.warn('No data found !');
            }
        } catch (err) {
            throw new Error(err)
        } finally {
            setLoadExcel(false)
        }
    }

    const importStylecodes = async () => {
        if (selectedStylecodes?.length <= 0) {
            return toast.error('Stylecodes not selected !');
        }
        setLoadImport(true)
        try {
            const response = await axios.post(`${BASE_URL}/api/importStylecode`, { jsonPayload: selectedStylecodes });
            const result = await response?.data;

            if (result?.success === true) {
                toast.success(result?.message);
            }else{
                toast.error('Something went wrong !');
            }
        } catch (err) {
            toast.error('Something went wrong !');
            throw new Error(err)
        } finally {
            setLoadImport(false)
            setTimeout(() => {
                window.location.reload()
            }, 2500)
        }
    }

    return (
        <div className="font-sans h-screen" >
            <div className=' pb-10'>
                <h1 className='text-center text-3xl my-5 border-b border-amber-200'>Product Import</h1>
                <div className="mx-auto mt-15 bg-white/90 grid gap-y-6 p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-[#d4af37] m-4  max-w-md w-full">
                    <p className='text-center'>Choose file to import.</p>

                    <label
                        htmlFor="file-upload"
                        className=" flex items-center justify-center gap-2 cursor-pointer  bg-gradient-to-r from-[#917049] via-[#d4af37] to-[#917049] text-white py-2 px-4 rounded-lg text-center hover:opacity-90 transition"
                    >
                        <FaFileCsv size={20} />Choose File
                    </label>

                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                            handleFileUpload(e)
                        }
                    />

                    <div className='flex flex-row justify-center items-center gap-x-3'>
                        <div>
                           <SiTicktick color={fileName != 'No file choosen' ? 'green' : '#e9ecef'} size={24} />
                        </div>
                        <p className="text-base text-gray-600 italic text-center border w-fit px-2.5  rounded-lg  border-amber-200">{fileName}</p>
                    </div>


                    <div className='flex flex-row justify-between items-center gap-x-5'>
                        <button
                            onClick={() => fetchStyleCodeImage()}
                            className="w-full bg-gradient-to-r from-[#c7a44d] via-[#d4af37] to-[#614119] cursor-pointer
                                       text-white py-2  rounded-md  hover:opacity-90 transition-opacity duration-200 flex justify-center items-center gap-2"
                        >
                            View
                        </button>
                        <button
                            onClick={() => handleRefresh()}
                            className="w-full bg-gradient-to-r from-[#614119] via-[#d4af37] to-[#c7a44d] cursor-pointer
                                       text-white py-2  rounded-md  hover:opacity-90 transition-opacity duration-200 flex justify-center items-center gap-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>


                {resultData.length > 0 && !loadExcel ?
                    <div>
                        <div className='flex justify-start items-center gap-x-6'>
                            <p>Stylecodes:{resultData?.length}</p>
                                <p>Selected:{selectedStylecodes?.length}</p>
                        </div>
                        <AgGridTable rowData={resultData} />
                        <div className="mx-auto flex lg:flex-row flex-col max-w-2xl w-full lg:gap-x-10 gap-5 ">
                            <button
                                onClick={() => importStylecodes()}
                                className="w-full bg-gradient-to-r from-[#c7a44d] via-[#d4af37] to-[#614119] cursor-pointer
                                       text-white py-2 rounded-md  hover:opacity-90 transition-opacity duration-200 flex justify-center items-center gap-2"
                            >
                                Import To Bhima Gold
                            </button>
                            <button
                                onClick={() => handleRefresh()}
                                className="w-full bg-gradient-to-r from-[#614119] via-[#d4af37] to-[#c7a44d] cursor-pointer
                                       text-white py-2 rounded-md  hover:opacity-90 transition-opacity duration-200 flex justify-center items-center gap-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div> :
                    <div className=' h-80 flex justify-center items-center'>
                        {loadExcel &&
                            <div>
                                <p className='my-3'>Loading.....</p>
                                <RingLoader color="#c7a44d" /></div>}
                    </div>
                }

            </div>

            {/* Overlay when import is running */}
            {loadImport && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-3 border border-amber-300">
                        <RingLoader color="#c7a44d" size={60} />
                        <p className="text-xl italic text-gray-700">Importing Please wait....</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductImport