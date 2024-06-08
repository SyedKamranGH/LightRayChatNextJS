import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

export const TryEnterprise = () => (
    <div className="px-[30px]">
        <p className="font-size-[18px] font-semibold text-white">Try Enterprise</p>
        <p className="font-size-[16px] py-[12px] font-normal text-[#A8AAAE]">
            Upgrade to Enterprise for Superior Features
        </p>
        <Link href="/enterprise" className="text-[#A8AAAE]">
            <div className="font-size-[13px] inline-flex bg-[#A8AAAE29] px-[14px] py-[6px] align-middle">
                <FiArrowUpRight size={23} />
                Learn More
            </div>
        </Link>
    </div>
)
