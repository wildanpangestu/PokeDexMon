import React from "react";
import "font-awesome/css/font-awesome.min.css";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      <div className="row">
        <div className="col">
          {gotoPrevPage && (
            <button
              type="button"
              className="btn btn-dark"
              onClick={gotoPrevPage}
              style={{ marginTop: 30, marginBottom: 30 }}
            >
              <i className="fa fa-arrow-left"></i> Previous
            </button>
          )}
        </div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          {gotoNextPage && (
            <button
              type="button"
              className="btn btn-dark float-right"
              onClick={gotoNextPage}
              style={{ marginTop: 30, marginBottom: 30 }}
            >
              Next <i className="fa fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
