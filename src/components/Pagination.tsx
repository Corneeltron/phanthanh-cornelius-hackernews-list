import React from "react";
import { PageLink } from "./PageLink";

export type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination = ({ currentPage, setCurrentPage }: Props) => {
  const pageNums = [1, 2, 3];
  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink href="#" onClick={() => setCurrentPage(currentPage - 1)}>Previous</PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink key={idx} href="#" active={pageNum === currentPage} onClick={() => setCurrentPage(pageNum)}>
          {pageNum}
        </PageLink>
      ))}
      <PageLink href="#" onClick={() => setCurrentPage(currentPage + 1)}>Next</PageLink>
    </nav>
  );
};
