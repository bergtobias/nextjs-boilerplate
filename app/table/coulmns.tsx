"use client";

import { createColumnHelper } from "@tanstack/react-table";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Users = User[];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", { header: "Id" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("username", { header: "Username" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("address.street", { header: "Street" }),
  columnHelper.accessor("address.suite", { header: "Suite" }),
  columnHelper.accessor("address.city", { header: "City" }),
  columnHelper.accessor("address.zipcode", { header: "Zipcode" }),
  columnHelper.accessor("address.geo.lat", { header: "Lat" }),
];
export default columns;
