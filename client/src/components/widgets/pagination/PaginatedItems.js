import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { useSearchParams, useLocation } from "react-router-dom";

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  @media (min-width: 700px) {
    margin-bottom: 2rem;
    display: flex;
    padding-right: 0px !important;
    flex-direction: row;
    margin-top: 20px;
    justify-content: flex-end;
    list-style-type: none;
    font-size: 17px;

    li a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
    }
    ,
    li.previous a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
      text-decoration: none;
    }
    ,
    li.next a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
      text-decoration: none;
    }
    ,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #198754;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    ,
    li.disabled a {
      color: grey;
    }
    ,
    li.disable,
    li.disabled a {
      cursor: default;
    }
  }
  @media (max-width: 699px) {
    margin-bottom: 2rem;
    list-style-type: none;
    font-size: 15px;
    margin-top: 20px;
    padding-right: 0px !important;
    display: flex;
    height: 80px;
    flex-wrap: wrap;
    justify-content: flex-end;
    li a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
    }
    ,
    li.previous a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
      text-decoration: none;
    }
    ,
    li.next a {
      border-radius: 2px;
      padding: 0.1rem 1rem;
      padding-top: 5px;
      padding-bottom: 5px;
      border: #dee2e6 1px solid;
      cursor: pointer;
      text-decoration: none;
    }
    ,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #198754;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    ,
    li.disabled a {
      color: grey;
    }
    ,
    li.disable,
    li.disabled a {
      cursor: default;
    }
  }
`;

const PaginatedItems = ({ itemsPerPage, items, ItemsLoop }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event.selected + " data selected pagination");
    // setSearchParams({
    //   page: event.selected + 1,
    // });
    const pageSelected = event.selected + 1;
    searchParams.set("page", pageSelected);

    setSearchParams(searchParams);
    // searchParams.set("page", event.selected + 1);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <ItemsLoop currentItems={currentItems} />
      <MyPaginate
        // nextClassName="page-item"
        // pageClassName="page-item"
        // className="pagination"
        initialPage={searchParams.get("page") - 1}
        // forcePage={searchParams.get("page") - 1}
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
