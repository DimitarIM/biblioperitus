'use client'

import { useBookContext } from '@/store/useBookContext';
import PageBtn from './PageBtn';
import { useEffect, useState } from 'react';

function Pagination() {
  const [pageIndexes, setPageIndexes] = useState<number[]>([]);
  const [searchedPageIndex, setSearchedPageIndex] = useState<string>("");


  const ctx = useBookContext();
  if (!ctx) return null;
  const { totalBooks, limit, setCurrentPage, currentPage } = ctx;

  useEffect(() => {
    setPageIndexes(Array.from({ length: Math.ceil(totalBooks / limit) }, (_, i) => i + 1));
  }, [totalBooks, limit])

  if (pageIndexes.length === 0) return null;
  const windowSize = 3;
  const totalPages = pageIndexes.length;

  let visiblePages: number[] = [];
  if (totalPages <= 10) {
    visiblePages = pageIndexes;
  } else {
    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(start + windowSize - 1, totalPages);
    visiblePages = pageIndexes.slice(start - 1, end);
  }

  return (
    <div className='flex gap-2 justify-center'>
      {
        visiblePages.map((page) => (
          <PageBtn key={page} pageIndex={page} />
        ))
      }

      {totalPages > 10 && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const pageNum = parseInt(searchedPageIndex, 10);
              if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
                setCurrentPage(pageNum);
              }
            }}
            className='flex'
          >
            <input
              type="number"
              min={1}
              value={searchedPageIndex}
              placeholder="...."
              onChange={(e) => setSearchedPageIndex(e.target.value)}
              className="w-12 rounded-[1px] max-w-full border text-center focus:outline-none focus:ring-2 focus:ring-detail"
            />
          </form>
          {[totalPages - 1, totalPages].map((page) => (
            <PageBtn key={page} pageIndex={page} />
          ))}

        </>
      )}
    </div>
  )
}

export default Pagination