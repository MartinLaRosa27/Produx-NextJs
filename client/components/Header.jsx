import React from "react";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { HiOutlineClipboardList } from "react-icons/hi";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <Link href="/">
          <h1 className="text-uppercase title">
            <HiOutlineClipboardList /> Produx
          </h1>
        </Link>
      </div>
      <Link
        href="/product/new-product"
        className="btn-danger new-post d-block d-md-inline-block"
      >
        <span className="add-text">New product</span>
        <span className="add-logo">
          <IoIosAddCircle />
        </span>
      </Link>
    </nav>
  );
};
