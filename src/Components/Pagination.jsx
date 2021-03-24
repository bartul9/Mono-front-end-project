import React from "react";
import { Component } from "react";

import { inject, observer } from "mobx-react";

// Styles
import "./Pagination.css";

@inject("rootStore")
@observer
class Pagination extends Component {
  render() {
    const {
      currentPage,
      pageNumbers,
    } = this.props.rootStore.paginationStore.storeData;

    const {
      paginate,
      nextPage,
      prevPage,
    } = this.props.rootStore.paginationStore;

    const linkColor = { color: "black" };

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
                if (currentPage === pageNumbers.length) {
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
}

export default Pagination;
