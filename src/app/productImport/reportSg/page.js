import DateRangePickerPopup from '@/components/DateRangePicker'
import ReportSgTable from '@/components/ReportSg'
import React from 'react'

const ReportSg = () => {
  return (
    <div className="min-h-screen">
      <h1 className='text-center text-3xl my-5 border-b border-amber-200'>Report-SG</h1>
      <div>
        <DateRangePickerPopup />
      </div>
      <div >
        <ReportSgTable />
      </div>
    </div>

  )
}

export default ReportSg