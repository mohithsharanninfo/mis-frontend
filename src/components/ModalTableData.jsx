import { MdContentCopy } from "react-icons/md";
import { toast } from 'react-toastify';
import { BASE_URL } from "../../constant";
import axios from "axios";

export default function ModalDetailsTable({ modalData = [], LocaleIN, LocaleSG }) {
    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    const reImportStylecode = async (StyleCode) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/re_importStylecode`, {
                Stylecode: StyleCode,
                LocaleIN: LocaleIN,
                LocaleSG: LocaleSG,
                LocaleAE: 0,
                LocaleUS: 0
            })

            const result = await response.data
            console.log('result', result)
            if (result?.success == true) {
                toast.success(result?.message);
            }

        } catch (err) {
            toast.success('Import failed unexpectedly');
            throw new Error(err)
        }
    }

    return (
        <div className="overflow-x-auto mt-4 mb-2">
            <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-900">
                    <tr>
                        <th className="px-4 py-2 border">Barcode No</th>
                        <th className="px-4 py-2 border">Stylecode</th>
                        <th className="px-4 py-2 border">Product Pushed</th>
                        <th className="px-4 py-2 border">Order No</th>
                        <th className="px-4 py-2 border">Sold Flag</th>
                        <th className="px-4 py-2 border">Is Lock</th>
                        <th className="px-4 py-2 border">Is Stock</th>
                        <th className="px-4 py-2 border">Img Url</th>
                        <th className="px-4 py-2 border">Branch Code</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {modalData?.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 border  gap-x-2">
                                <p className="flex items-center  gap-x-2 ">{item.barcode_no} <MdContentCopy
                                    className="cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={() => handleCopy(item.barcode_no, "barcode_no")}
                                /></p>

                            </td>

                            <td className="px-4 py-2 border ">
                                <p className="flex items-center  gap-x-2 ">{item.StyleCode} <MdContentCopy
                                    className="cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={() => handleCopy(item.StyleCode, "Stylecode")}
                                /></p>

                            </td>

                            <td className="px-4 py-2 border capitalize">{item.productpushed}</td>
                            <td className="px-4 py-2 border capitalize">{item.order_no}</td>
                            <td className="px-4 py-2 border capitalize">{item.sold_flag}</td>
                            <td className="px-4 py-2 border">{item.islock}</td>
                            <td className="px-4 py-2 border">{item.isstock}</td>
                            <td className="px-4 py-2 border">{item.ImageURL}</td>
                            <td className="px-4 py-2 border">{item.branch_code}</td>
                            <td onClick={() => reImportStylecode(item.StyleCode)} className="px-4 py-2 border cursor-pointer font-semibold underline text-blue-600">
                                Re-Import
                            </td>
                        </tr>
                    ))}

                    {modalData.length === 0 && (
                        <tr>
                            <td colSpan="10" className="text-center py-4 text-gray-500">
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
