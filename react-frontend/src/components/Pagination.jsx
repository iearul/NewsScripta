import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPage, setCurrentPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const setPageNumber = () => {
    const page = [];
    let firstPage = currentPage -5;
    let lastPage = currentPage + 5;
    if (firstPage < 1) {
      firstPage = 1;
    }
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }
    for (let i = firstPage; i <= lastPage; i++) {
      page.push(i);
    }
    setPageNumbers(page);
  };

  useEffect(() => {
    setPageNumber();
  }, [currentPage]);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <div
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="page-link"
          >
            First
          </div>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(number);
              }}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </div>
          </li>
        ))}
        <li className="page-item">
          <div
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(totalPage);
            }}
            className="page-link"
          >
            Last
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
