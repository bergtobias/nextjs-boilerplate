import CustomTable from "@/components/table/CustomTable";
import columns, { Users } from "./coulmns";

export default async function Table() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: Users = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CustomTable columns={columns} data={data} />
    </main>
  );
}
