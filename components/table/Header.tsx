import { Input } from "@/components/ui/input";
import {
  Column,
  ColumnFiltersState,
  Header as HeaderType,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

const Header = ({
  header,
  table,
}: {
  header: HeaderType<any, unknown>;
  table: Table<unknown>;
}) => {
  const column = header.column;
  return (
    <div className="flex flex-col gap-1 pt-4 text-nowrap mb-2 h-full   ">
      <button
        tabIndex={-1}
        className="flex items-start justify-start"
        onClick={() =>
          table.setSorting((prev) => {
            const newPrev = prev.filter((c) => c.id !== column.id);
            return [
              { id: column.id, desc: column.getIsSorted() === "asc" },
              ...newPrev.slice(0, 2),
            ];
          })
        }
      >
        <span className="text-xs">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>
        {column.getCanSort() ? (
          <span className="flex">
            {column.getIsSorted() === "asc" ? (
              <MdArrowDownward />
            ) : column.getIsSorted() ? (
              <MdArrowUpward />
            ) : (
              <>
                <MdArrowDownward />
                <MdArrowUpward />
              </>
            )}
          </span>
        ) : (
          ""
        )}
      </button>
      {column.getCanFilter() ? (
        <Input
          onChange={(value) => column.setFilterValue(value.target.value ?? "")}
          className="w-full h-6 px-2 shadow font-normal "
          placeholder={`Filter`}
          value={(column.getFilterValue() as string) ?? ""}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
