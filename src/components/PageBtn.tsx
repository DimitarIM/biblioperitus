'use client'

import { useBookContext } from '@/store/useBookContext';
import React, { useEffect } from 'react'

function PageBtn({ pageIndex }: { pageIndex: number }) {
    const ctx = useBookContext();
    if (!ctx) return null;
    const { setCurrentPage, currentPage } = ctx;

    return (
        <button onClick={() => setCurrentPage(pageIndex)} className={`flex justify-center items-center ${currentPage === pageIndex ? "bg-red-800" : "bg-foreground"} text-background p-2 cursor-pointer`}>
            {pageIndex}
        </button>
    )
}

export default PageBtn