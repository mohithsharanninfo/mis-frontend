"use client";
import React from 'react'
import ReportInTable from '@/components/ReportIn'
import { useUserDetails } from '@/auth';

const ReportIn = () => {
    const { user } = useUserDetails();

  return (
    <div className="min-h-screen">
      <h1 className='text-center text-3xl my-5 border-b border-amber-200'>Report-IN</h1>
      <div >
        <ReportInTable />
      </div>
    </div>

  )
}

export default ReportIn