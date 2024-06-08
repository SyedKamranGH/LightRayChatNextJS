import React, { useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaCaretDown, FaCheck } from 'react-icons/fa'

const checksNeeded = [
    'Company Information',
    'Beneficial Ownership',
    'Credit Check',
    'Assets',
    'Financials',
    'Legal',
    'Regulatory',
    'Media',
    'Technology Footprint',
]

type TCompanyRequest = {
    companyName: string
    tradeName: string
    location: string
    checksNeeded: string[]
}

export const CompanyRequestFormMessage = () => {
    const [formData, setFormData] = useState<TCompanyRequest>({
        companyName: '',
        tradeName: '',
        location: '',
        checksNeeded: [],
    })
    const [selectedChecks, setSelectedChecks] = useState<string[]>([])

    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleCheckChange = (data: string) => {
        setSelectedChecks(prevChecks => [...prevChecks, data])
    }

    useEffect(() => {
        formData.checksNeeded = selectedChecks
    }, [selectedChecks])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log({ formData })

        // Here you can handle form submission, such as sending data to a server
        // Reset form after submission
        setFormData({
            companyName: '',
            tradeName: '',
            location: '',
            checksNeeded: [],
        })
    }

    return (
        <div className="w-full max-w-[500px]">
            <form onSubmit={handleSubmit}>
                <p>
                    Apologies, we currently lack the information for the company you&apos;ve
                    requested. Kindly submit a request using the form provided below. 
                </p>
                <div className="mt-8">
                    <label htmlFor="checksNeeded" className="block font-semibold text-[#8692D0]">
                        Company/Individual Name*
                    </label>

                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="h-10 w-full rounded-md border border-gray-300 px-4"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="checksNeeded" className="block font-semibold text-[#8692D0]">
                        Trade Name
                    </label>

                    <input
                        type="text"
                        id="tradeName"
                        name="tradeName"
                        value={formData.tradeName}
                        onChange={handleChange}
                        className="h-10 w-full rounded-md border border-gray-300 px-4"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="checksNeeded" className="block font-semibold text-[#8692D0]">
                        Location*
                    </label>

                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="h-10 w-full rounded-md border border-gray-300 px-4"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="checksNeeded" className="block font-semibold text-[#8692D0]">
                        Checks Needed*
                    </label>
                    {/* <select
                        id="checksNeeded"
                        name="checksNeeded"
                        value={selectedChecks}
                        onChange={handleChange}
                        className="h-40 w-full rounded-md border border-gray-300 px-4"
                        required
                        multiple
                    >
                        {checksNeeded.map(check => (
                            <option key={check} value={check}>
                                {check}
                            </option>
                        ))}
                    </select> */}
                    <Listbox value={selectedChecks} onChange={setSelectedChecks} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative h-10 w-full cursor-default rounded-md border border-gray-300 px-4 pr-10 text-left sm:text-sm">
                                <span className="block truncate">
                                    {selectedChecks &&
                                        selectedChecks.map(check => check).join(', ')}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <FaCaretDown
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {checksNeeded.map((check, checkIdx) => (
                                        <Listbox.Option
                                            key={checkIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? 'bg-red-100 text-red-900'
                                                        : 'text-gray-900'
                                                }`
                                            }
                                            value={check}
                                            onClick={() => handleCheckChange(check)}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                    >
                                                        {check}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                                            <FaCheck
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <button
                    type="submit"
                    className="mt-8 rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    style={{ backgroundColor: '#DC3534' }}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
