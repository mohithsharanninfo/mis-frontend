'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startOfDay, endOfDay, format } from 'date-fns';
import apiservice from '@/app/apiservices/page';
import Card from '@/components/Card';
import { toast } from 'react-toastify';

const BmcSummary = () => {
  const today = new Date();
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(format(today, "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(format(today, "yyyy-MM-dd"));

  const [bmcSummary, setBmcSummary] = useState([])

  const handleStartChange = (e) => {
    const selected = startOfDay(new Date(e.target.value));
    setFromDate(format(selected, "yyyy-MM-dd"));
  };

  const handleEndChange = (e) => {
    const selected = endOfDay(new Date(e.target.value));
    setToDate(format(selected, "yyyy-MM-dd"));
  };

  const fetchBmcSummary = async () => {
    try {
      const data = await apiservice?.getBmcSummary(fromDate, toDate);
      setBmcSummary(data)
    } catch (err) {
      throw new Error(err)
    }
  }

  const overalltransactions = bmcSummary?.summary?.reduce((total, item) => total + item?.TxnAmt, 0);
  const notPushedToVurdhi = bmcSummary?.notpushed?.reduce((total, item) => total + item?.TxnAmt, 0);
  const pushedToVurdhi = bmcSummary?.pushedtovurdhi?.reduce((total, item) => total + item?.TxnAmt, 0);



  useEffect(() => {
    fetchBmcSummary()
  }, [fromDate, toDate])

  return (
    <div className="min-h-screen">
      <h1 className='text-center text-2xl my-5 border-b border-amber-200'>BMC Summary</h1>
      <div className="flex gap-4 items-center ">
        <div className=" max-w-[200px] w-full">
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

        <div className=" max-w-[200px] w-full">
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
      <div className='my-5 grid grid-cols-4  gap-5'>
        <div>
          <Card
            title="Overall Transactions"
            amount={overalltransactions}
            onView={() => {toast.info('Feature not implemented yet !') }}
          />
        </div>
        <div>
          <Card
            title="Pushed To Vurdhi"
            amount={pushedToVurdhi}
             onView={() => {toast.info('Feature not implemented yet !') }}
          />
        </div>
        <div>
          <Card
            title="Not Pushed To Vurdhi"
            amount={notPushedToVurdhi}
             onView={() => {toast.info('Feature not implemented yet !') }}
          />
        </div>
      </div>
    </div>
  )
}

export default BmcSummary