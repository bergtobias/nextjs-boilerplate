import { FilterFn } from "@tanstack/react-table";

export const globalFilterFn: FilterFn<any> = (
  row,
  columnId,
  filterValue: string | number
) => {
  const rowValues = JSON.stringify(
    Object.values(row.original)
  ).toLocaleLowerCase();
  const searchTerms = filterValue.toString().toLowerCase().trim().split(" ");

  return searchTerms.every((term) => rowValues.includes(term));
};
