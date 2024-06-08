import { Tab } from '@headlessui/react'
import { Fragment, ReactNode, useRef } from 'react'
import { twJoin } from 'tailwind-merge'

import { AllFilesSection, RepositoryTitleWithActions } from '@/components/pages/repository'
import { Layout } from '@/components/shared'
import { useProtectRoute } from '@/hooks/useProtectRoute'

export default function Repository() {
    useProtectRoute()

    const uploadInputRef = useRef<HTMLInputElement>(null)

    const uploadFile = () => {
        uploadInputRef.current?.click()
    }

    return (
        <Layout>
            <section className="relative flex h-full w-full flex-col overflow-hidden sm:pt-[30px]">
                <Tab.Group as={Fragment}>
                    <div className={twJoin('space-y-4 sm:space-y-[15px]', 'shadow-header')}>
                        <RepositoryTitleWithActions uploadFile={uploadFile} />

                        {/* Tab navigation */}
                        <div className="mx-[15px] max-w-6xl md:mx-[150px] 2xl:mx-auto">
                            <Tab.List className="flex gap-8 sm:justify-start">
                                <TabItem title="My Storage" />
                                {/* <TabItem title="Shared with Me" /> */}
                            </Tab.List>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col overflow-auto">
                        <Tab.Panels as={Fragment}>
                            {/* My Storage */}
                            <TabPanel>
                                {/* TODO: Implement Recent Files */}
                                {/* <RecentFilesSection /> */}
                                <AllFilesSection uploadInputRef={uploadInputRef} />
                                {/* <div className="h-24" /> */}
                            </TabPanel>

                            {/* TODO: Implement Shared with Me page */}
                            {/* Shared with Me */}
                            {/* <TabPanel>Shared with Me is under development.</TabPanel> */}
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </section>
        </Layout>
    )
}

const TabItem = (props: { title: string }) => {
    const { title } = props

    return (
        <Tab className="space-y-[18px] outline-none sm:flex-none sm:space-y-5">
            <h2 className="line-clamp-1 text-sm font-semibold sm:text-base">{title}</h2>
            <div className="h-1 rounded-lg ui-selected:bg-primary-700" />
        </Tab>
    )
}

const TabPanel = (props: { children: ReactNode }) => {
    const { children } = props

    return (
        <Tab.Panel className="mx-[15px] flex max-w-6xl flex-1 flex-col gap-8 py-8 md:mx-[150px] 2xl:mx-auto 2xl:w-full">
            {children}
        </Tab.Panel>
    )
}
