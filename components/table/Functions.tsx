import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Functions = ({ table }: { table: Table<unknown> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="">
          Funktioner <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => table.setSorting([])}>
          Återställ Sortering
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            table.setGlobalFilter("");
            table.setColumnFilters([]);
          }}
        >
          Återställ Alla Filter
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Visa Kolumer</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                checked={table.getIsAllColumnsVisible()}
                onCheckedChange={(value: boolean) =>
                  table.toggleAllColumnsVisible(!!value)
                }
              >
                {!table.getIsAllColumnsVisible() ? "Visa alla" : "Dölj alla"}
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      onSelect={(e) => e.preventDefault()}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Functions;
