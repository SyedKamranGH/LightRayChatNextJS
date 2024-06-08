import Link from 'next/link'
import { QuestionMarkIcon } from './icons/QuestionMarkIcon';

export const Footer = () => {
    return (
        <div className="mt-auto flex flex-wrap justify-center gap-x-6 gap-y-1 p-2 md:h-20 md:p-4">
            <FooterLink href="/confidentiality-disclaimer.pdf" title="Confidentiality Disclaimer" />
            <FooterLink href="/cookie-policy.pdf" title="Cookie Policy" />
            <FooterLink href="/privacy-policy.pdf" title="Privacy Policy" />
            <FooterLink href="/terms-of-service.pdf" title="Terms of Service" />
            <div className='fixed right-5 bottom-5'>
                <QuestionMarkIcon />
            </div>
        </div>
    )
}

const FooterLink = ({ href, title }: { href: string; title: string }) => {
    return (
        <Link
            className="text-sm text-gray-400 transition hover:text-primary-700"
            href={href}
            target="_blank"
        >
            {title}
        </Link>
    )
}
