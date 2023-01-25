import { getPaginationItems } from "../lib/pagination";
import { PageLink } from "./PageLink";
import './Pagination.css';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  lastPage,
  maxLength,
  onPageChange,
}: Props) => {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);
  return (
    
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        href="#"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          href="#"
          active={pageNum === currentPage}
          disabled={isNaN(pageNum)}
          onClick={() => onPageChange(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink
        href="#"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
};
