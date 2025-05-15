import { MagnifyingGlass } from "@phosphor-icons/react";

export function EmptySearchState({ search }: { search: string }) {
  const shouldTrancate = search.length > 15;
  return (
    <div
      className="flex flex-col justify-center items-center mt-4"
      data-testid="empty-search-results"
    >
      <div className="rounded-full p-4 bg-black/5">
        <MagnifyingGlass size={40} color="#00000080" />
      </div>
      <p className="font-semibold text-lg text-center mt-2">No results</p>
      <p className="font-semibold text-sm text-center text-gray-500">
        No connection found that matches{" "}
        {search.match(/^.{1,15}/gi)?.[0]?.trim() ?? ""}
        {shouldTrancate && "..."}
      </p>
    </div>
  );
}
