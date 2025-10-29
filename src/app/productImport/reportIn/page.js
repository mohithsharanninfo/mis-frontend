"use client";
import React, { useEffect, useState } from 'react'
import ReportInTable from '@/components/ReportIn'
import { useUserDetails } from '@/auth';
import { useDispatch } from 'react-redux';
import { startOfDay, endOfDay, format } from 'date-fns';
import { CiSearch } from "react-icons/ci";
import { BASE_URL } from '../../../../constant';
import { setImportedDataIn } from '../../../redux/slice';
import axios from 'axios';

const ReportIn = () => {
  const { user } = useUserDetails();

  const today = new Date();
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(format(today, "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(format(today, "yyyy-MM-dd"));
  const [searchTerm, setSearchTerm] = useState('')


  const handleStartChange = (e) => {
    const selected = startOfDay(new Date(e.target.value));
    setFromDate(format(selected, "yyyy-MM-dd"));
  };

  const handleEndChange = (e) => {
    const selected = endOfDay(new Date(e.target.value));
    setToDate(format(selected, "yyyy-MM-dd"));
  };

  const getReportsIn = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/importedProducts?fromDate=${fromDate}&toDate=${toDate}`);
      const result = await response?.data?.data
      dispatch(setImportedDataIn(result))
    } catch (err) {
      throw new Error(err)
    }
  }

  const searchStylecodesIn = async () => {
    try {
      if (!searchTerm) {
        getReportsIn()
        return
      }
      const response = await axios.get(`${BASE_URL}/api/searchstylecodeIn?searchTerm=${searchTerm}`);
      const result = await response?.data?.data
      dispatch(setImportedDataIn(result))
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    getReportsIn()
  }, [fromDate, toDate]);


  return (
    <div className="min-h-screen">
      <h1 className='text-center text-2xl my-5 border-b border-amber-200'>Report-IN</h1>

      <div className='flex items-center justify-between'>
        <div className="flex gap-4 items-center ">
          <div className=" max-w-[300px] w-full">
            <label className="block text-sm font-semibold text-[#c7a44d] ">
              From Date
            </label>
            <input
              type="date"
              value={format(fromDate, "yyyy-MM-dd")}
              onChange={handleStartChange}
              className="border-2 border-amber-300 text-black text-sm outline-amber-200 p-1 rounded w-full"
            />
          </div>

          <div className=" max-w-[300px] w-full">
            <label className="block text-sm font-semibold  text-[#c7a44d]">
              To Date
            </label>
            <input
              type="date"
              value={format(toDate, "yyyy-MM-dd")}
              onChange={handleEndChange}
              className="border-2 border-amber-300 p-1 text-black text-sm outline-amber-200 rounded w-full"
            />
          </div>
        </div>

        <div className='w-full max-w-[250px]'>
          <label className="block text-sm font-semibold text-[#c7a44d]">Search </label>
          <div className='flex flex-row justify-end items-center gap-2 '>
            <div className='w-full'>
              <input type="text" placeholder='Stylecode...' onChange={(e) => {
                setSearchTerm(e.target.value)
                if (e.target.value === '') {
                  getReportsIn()
                }
              }} className='border-2 border-amber-300 p-1 text-sm text-black outline-amber-200 rounded w-full' />
            </div>
            <div className='bg-[#b8860b] p-1 rounded-bl-md rounded-tr-md cursor-pointer' onClick={() => searchStylecodesIn()}> <CiSearch color='white' size={24} /></div>
          </div>
        </div>
      </div>
      <div >
        <ReportInTable />
      </div>
    </div>

  )
}

export default ReportIn