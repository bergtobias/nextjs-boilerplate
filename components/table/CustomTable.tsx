"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import Header from "./Header";
import Functions from "./Functions";
import {
  MdArrowRight,
  MdArrowRightAlt,
  MdLastPage,
  MdSkipPrevious,
} from "react-icons/md";
import { DataSheet } from "./DataSheet";
import { globalFilterFn } from "./filterFunctions";

type ShadCnTableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  options?: {};
  children?: React.ReactNode;
};

const CustomTable = forwardRef<unknown, ShadCnTableProps>(
  ({ data, columns, options, children }, ref) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {}
    );
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [lastClickedRow, setLastClickedRow] = useState<any>(null);

    const dataMemo = useMemo(() => data, [data]);
    const columnsMemo = useMemo(() => columns, [columns]);

    const table = useReactTable({
      data: dataMemo,
      columns: columnsMemo,

      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPagination,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: globalFilterFn,
      isMultiSortEvent: (e) => true,
      maxMultiSortColCount: 3,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination,
        globalFilter,
      },
    });
    return (
      <div className="w-full px-2 flex ">
        <div className="flex-grow">
          <div className="flex items-center py-2 gap-4 justify-end ">
            <div className="mr-auto">{children}</div>
            <Input
              placeholder="Sök..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />

            <Functions table={table} />
          </div>
          <div className="rounded-md border  h-[79vh]  overflow-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="top-0 sticky bg-background text-black"
                        >
                          <Header header={header} table={table} />
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:cursor-pointer"
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {
                        setLastClickedRow(row.original);
                        setIsSheetOpen(true);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="max-h-5 py-2 text-nowrap"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Inga rader att visa
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4  ">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex  ">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Första sidan
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Föregående
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Nästa
              </Button>
              <Button
                className="flex gap-2"
                variant="outline"
                size="sm"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                Sista sidan
              </Button>
              <Select
                onValueChange={(value: string) => {
                  const parsedValue = parseInt(value);
                  if (!parsedValue) table.setPageSize(table.getTotalSize());
                  else table.setPageSize(parsedValue);
                }}
              >
                <SelectTrigger className="w-[180px] h-9 ml-2">
                  <SelectValue placeholder="Storlek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Antal Poster</SelectLabel>
                    <SelectItem value={"0"}>Visa alla</SelectItem>
                    <SelectItem value={"25"}>25</SelectItem>
                    <SelectItem value={"50"}>50</SelectItem>
                    <SelectItem value={"100"}>100</SelectItem>
                    <SelectItem value={"250"}>250</SelectItem>
                    <SelectItem value={"500"}>500</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isSheetOpen && lastClickedRow ? (
          <DataSheet
            originalData={lastClickedRow}
            setIsSheetOpen={setIsSheetOpen}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
);

CustomTable.displayName = "CustomTable";

export default CustomTable;
