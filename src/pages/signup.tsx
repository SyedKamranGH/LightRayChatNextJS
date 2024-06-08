import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { signUpUser } from '@/queries/user'
import { Logo } from '@/components/shared'
import { twMerge } from 'tailwind-merge'
import { countryNameToCode } from '@/utils/countries'

const Signup = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referralCode, setReferralCode] = useState('')
    const [error, setError] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])
    const [selectedCountry, setSelectedCountry] = useState('')

    const handleCountryChange = e => {
        setSelectedCountry(e.target.value)
    }
    const validatePassword = (value: string) => {
        const errors: string[] = []

        // Validation criteria
        const lengthRegex = /.{8,}/
        const lowercaseRegex = /[a-z]/
        const uppercaseRegex = /[A-Z]/
        const digitRegex = /\d/
        const symbolRegex = /[!@#$%^&*]/

        // Check each criteria
        if (!lengthRegex.test(value)) {
            errors.push('✓ Use 8 or more characters')
        } else {
            errors.push('✓ Use 8 or more characters ✓')
        }
        if (!lowercaseRegex.test(value)) {
            errors.push('✓ Use lower case letters (e.g., a)')
        } else {
            errors.push('✓ Use lower case letters (e.g., a) ✓')
        }
        if (!uppercaseRegex.test(value)) {
            errors.push('✓ Use upper case letters (e.g., A)')
        } else {
            errors.push('✓ Use upper case letters (e.g., A) ✓')
        }
        if (!digitRegex.test(value)) {
            errors.push('✓ Use a number')
        } else {
            errors.push('✓ Use a number ✓')
        }
        if (!symbolRegex.test(value)) {
            errors.push('✓ Use a symbol')
        } else {
            errors.push('✓ Use a symbol ✓')
        }

        // Set password errors and validity state
        setPasswordErrors(errors)
        setPasswordValid(errors.every(error => error.endsWith('✓')))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            const response = await signUpUser.mutationFn({
                name: `${firstName} ${lastName}`,
                email,
                password,
                referralCode,
            })
            router.push(`/otp-confirmation?email=${response.user.email}`)
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message)
                return
            }

            if (axios.isAxiosError(err) && err.code === 'ERR_NETWORK') {
                setError('Network error. Please try again later!')
                return
            }

            setError('An error occurred while signing up.')
        }
    }

    return (
        <div className="flex h-screen flex-col md:flex-row">
            <div className="flex h-full items-center justify-center md:w-1/2">
                <div className="mx flex flex-col p-8 md:w-3/4">
                    <h1
                        className="text-3xl font-medium"
                        style={{ fontWeight: 600, fontSize: '26px', color: '#4B465C' }}
                    >
                        Create an account
                    </h1>
                    <p
                        className="mt-2 text-sm text-gray-800"
                        style={{ fontWeight: 500, fontSize: '15px', color: '#4B465C' }}
                    >
                        Enter Your Personal Information
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
                        {error && error.length > 0 && (
                            <p className="font-normal text-red-500">{error}</p>
                        )}

                        <div className="mt-5 flex justify-between gap-3">
                            <div className="w-full">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                    required
                                    placeholder="John"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 p-2"
                                    required
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Work Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mt-10">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    validatePassword(e.target.value)
                                }}
                                className={twMerge(
                                    'w-full rounded-lg border p-2',
                                    passwordValid ? 'border-green-500' : 'border-red-500',
                                )}
                                required
                                placeholder="Enter your password"
                            />
                            <div className="mt-2">
                                {password.length <= 0
                                    ? null
                                    : passwordErrors.map((error, index) => (
                                          <p
                                              key={error}
                                              className={twMerge(
                                                  'text-sm',
                                                  error.endsWith('✓')
                                                      ? 'text-green-500'
                                                      : 'text-red-500',
                                              )}
                                          >
                                              {error.replace(/✓$/, '')}
                                          </p>
                                      ))}
                            </div>
                        </div>

                        <div className="mt-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className={twMerge(
                                    'w-full rounded-lg border p-2',
                                    confirmPassword === password
                                        ? 'border-green-500'
                                        : 'border-gray-300',
                                )}
                                required
                                placeholder="Re-enter your password"
                            />
                            {confirmPassword?.length > 0 && confirmPassword !== password && (
                                <p className="text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        <div className="mt-10">
                            <label
                                htmlFor="organization"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Business/Organisation Name
                            </label>
                            <input
                                type="text"
                                id="organization"
                                className="w-full rounded-lg border border-gray-300 p-2"
                                placeholder="Enter your business/organisation"
                                required
                            />
                        </div>
                        <div className="mt-3 flex gap-3">
                            <div className="w-1/2">
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Location
                                </label>
                                <select
                                    id="location"
                                    className="w-full truncate rounded-lg border border-gray-300 p-2"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    required
                                >
                                    <option value="" disabled selected>
                                        <span className="text-gray-300 opacity-30">
                                            select country
                                        </span>
                                    </option>
                                    {Object.entries(countryNameToCode).map(([country, code]) => (
                                        <option key={code} value={code}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-1/2">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Phone Number
                                    <span className="float-right text-gray-500 opacity-50">
                                        {' '}
                                        (Optional)
                                    </span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className="w-1/4 rounded-lg border border-gray-300 p-2"
                                        placeholder="+91"
                                    />
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className="w-3/4 rounded-lg border border-gray-300 p-2"
                                        placeholder="Enter number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 w-full">
                            {/* Add Subscription code field */}
                            <label
                                htmlFor="subscriptionCode"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Subscription code
                            </label>
                            <input
                                type="text"
                                id="subscriptionCode"
                                value={referralCode}
                                onChange={e => setReferralCode(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-2"
                                placeholder="Enter the code received via email"
                                required
                            />
                        </div>

                        <div className="mt-10 flex gap-3 align-top">
                            <input
                                name="options[]"
                                type="checkbox"
                                className="h-[22px] rounded-full"
                                // value={label}
                                // onChange={e => setIsChecked(e.target.checked)}
                                // checked={isChecked}
                            />

                            <p className="text-sm font-thin">
                                I wish to receive informative marketing emails and updates on
                                releases from LightRay Inc
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-[100px] rounded-md bg-red-700 p-2 text-white"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden flex-col justify-center bg-primary/30 md:flex md:w-1/2 md:bg-black">
                <Logo iconStyle="w-60 h-60" />
            </div>
        </div>
    )
}

export default Signup
