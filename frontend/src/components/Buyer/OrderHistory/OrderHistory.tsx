import { SidebarInset, SidebarTrigger } from "@/components/Shadcn/Sidebar/sidebar";
import { Loader } from "lucide-react";
import { useId } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";
import { Badge } from "@/components/Shadcn/Badge";
import { Button } from "@/components/Shadcn/Button";
import { Label } from "@/components/Shadcn/Label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/Shadcn/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Shadcn/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shadcn/Table";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";
import {
  setOrderPagination,
  setOrderSorting
} from "@/store/orderHistorySlice";

type Order = {
  id: string;
  date: string;
  status: "En attente" | "Envoyée";
  total: string;
};

const columns: ColumnDef<Order>[] = [
  {
    header: "Numéro",
    accessorKey: "id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    size: 120,
  },
  {
    header: "Date",
    accessorKey: "date",
    size: 140,
  },
  {
    header: "Statut",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("status") === "En attente"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 120,
  },
  {
    header: "Total",
    accessorKey: "total",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("total")}</span>,
    size: 120,
  },
];

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.orderHistory.loading);
  const pagination = useSelector((state: RootState) => state.orderHistory.pagination);
  const sorting = useSelector((state: RootState) => state.orderHistory.sorting);
  const data = useSelector((state: RootState) => state.orderHistory.data);

  const id = useId();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (sort) => dispatch(setOrderSorting(sort)),
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (pag) => dispatch(setOrderPagination(pag)),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <SidebarInset>
      <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Historique de commandes</h1>
        </div>
      </header>
      <div className="flex w-full max-w-[1100px] mx-auto py-8 px-4">
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader className="animate-spin mr-2" /> Chargement...
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-3xl font-bold mb-4">Vos commandes</h2>
              <div className="space-y-4">
                <div className="bg-background overflow-hidden rounded-md border">
                  <Table className="table-fixed">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-transparent">
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              style={{ width: `${header.getSize()}px` }}
                              className="h-11"
                            >
                              {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                <div
                                  className={
                                    header.column.getCanSort()
                                      ? "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                                      : undefined
                                  }
                                  onClick={header.column.getToggleSortingHandler()}
                                  onKeyDown={(e) => {
                                    if (
                                      header.column.getCanSort() &&
                                      (e.key === "Enter" || e.key === " ")
                                    ) {
                                      e.preventDefault();
                                      header.column.getToggleSortingHandler()?.(e);
                                    }
                                  }}
                                  tabIndex={header.column.getCanSort() ? 0 : undefined}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: (
                                      <ChevronUpIcon
                                        className="shrink-0 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                    ),
                                    desc: (
                                      <ChevronDownIcon
                                        className="shrink-0 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                      />
                                    ),
                                  }[header.column.getIsSorted() as string] ?? null}
                                </div>
                              ) : (
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
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
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            Aucun historique de commandes pour l’instant.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only text-base">
                      Lignes par page
                    </Label>
                    <Select
                      value={table.getState().pagination.pageSize.toString()}
                      onValueChange={(value) => {
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger id={id} className="w-fit whitespace-nowrap py-1">
                        <SelectValue placeholder="Nombre de résultats" />
                      </SelectTrigger>
                      <SelectContent className="w-[50px]">
                        {[5, 10, 25, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={pageSize.toString()} className="w-fit">
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                    <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
                      <span className="text-foreground">
                        {table.getState().pagination.pageIndex *
                          table.getState().pagination.pageSize +
                          1}
                        -
                        {Math.min(
                          Math.max(
                            table.getState().pagination.pageIndex *
                              table.getState().pagination.pageSize +
                              table.getState().pagination.pageSize,
                            0
                          ),
                          table.getRowCount()
                        )}
                      </span>{" "}
                      sur{" "}
                      <span className="text-foreground">
                        {table.getRowCount().toString()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                            aria-label="Première page"
                          >
                            <ChevronFirstIcon size={16} aria-hidden="true" />
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            aria-label="Page précédente"
                          >
                            <ChevronLeftIcon size={16} aria-hidden="true" />
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            aria-label="Page suivante"
                          >
                            <ChevronRightIcon size={16} aria-hidden="true" />
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                            aria-label="Dernière page"
                          >
                            <ChevronLastIcon size={16} aria-hidden="true" />
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
};

export default OrderHistory;
