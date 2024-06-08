import Link from 'next/link'
import { useRouter } from 'next/router'
import { SelectedCaretIcon } from '@/components/shared/icons'

interface LogoProps {
    className?: string
}

interface IProps {
    label: string
    link: string
    Logo?: React.ComponentType<LogoProps>
}

export const SidebarMenuButton = (props: IProps) => {
    const router = useRouter()
    const { label, Logo, link = '/home' } = props
    const isActive = router.pathname === link

    return (
        <Link href={link}>
            <div className="flex-between flex h-14 items-center gap-x-3">
                <SelectedCaretIcon />
                {Logo && (
                    <Logo className={isActive ? 'stroke-text-selected' : 'stroke-text-primary'} />
                )}
                <div className={isActive ? 'text-text-selected' : 'text-text-primary'}>{label}</div>
            </div>
        </Link>
    )
}
