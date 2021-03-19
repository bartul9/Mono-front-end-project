import React from "react";

// Styles
import "./Pagination.css";

function Pagination(props) {
  const {
    currentPage,
    postsPerPage,
    totalVehicles,
    paginate,
    nextPage,
    prevPage,
  } = props;

  const pageNumbers = [];

  // Find the number of total pages and push it to pageNumbers so I can create li elements based on those numbers
  for (let i = 1; i <= Math.ceil(totalVehicles / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const linkColor = { color: "black" };

  // Find the number of max pages, so I can disable previous and next buttons if pageNumber === 1 or pageNumber === maxPages
  const maxPages = Math.ceil(totalVehicles / postsPerPage);

  return (
    <nav className="Pagination-nav">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            style={linkColor}
            className="page-link"
            href="#topContainer"
            onClick={() => {
              if (currentPage === 1) {
                return;
              }
              prevPage();
            }}
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <a
              style={linkColor}
              onClick={() => paginate(num)}
              href="#topContainer"
              className="page-link"
            >
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            style={linkColor}
            className="page-link"
            href="#topContainer"
            onClick={() => {
              if (currentPage === maxPages) {
                return;
              }

              nextPage();
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
