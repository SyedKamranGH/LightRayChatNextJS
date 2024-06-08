import { Logo } from '../..'

export const AIProfile = () => {
    return (
        <div className="flex items-center gap-[10px]">
            <div className="rounded-md bg-black">
                {/* <Logo iconStyle="h-[34px] w-[34px]" /> */}
                <svg
                    width="34"
                    height="34"
                    viewBox="0 0 99 99"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <image xlinkHref="/LR_icon.png" />
                </svg>
            </div>
            <p className="md:paragraph-regular font-medium text-black">LightRay</p>
        </div>
    )
}
