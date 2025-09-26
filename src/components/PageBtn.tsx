'use client'

import { useBookContext } from '@/store/useBookContext';
import React, { useEffect } from 'react'

function PageBtn({ pageIndex }: { pageIndex: number }) {
    const ctx = useBookContext();
    if (!ctx) return null;
    const { setCurrentPage, currentPage } = ctx;

    return (
        <button onClick={() => setCurrentPage(pageIndex)} className={`relative rounded-[1px] z-2 flex justify-center items-center ${currentPage === pageIndex ? "bg-detail" : "bg-foreground"} text-background p-2 cursor-pointer`}>
            {pageIndex}
        </button>
    )
}

export default PageBtn