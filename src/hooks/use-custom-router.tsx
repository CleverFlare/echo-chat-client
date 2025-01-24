import { useRouter, useSearchParams } from "next/navigation";

const isArray = Array.isArray;

export function useCustomRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParams<T extends string | { name: string; value: string }[]>(
    nameOrArray: T,
    value: T extends string ? string : undefined,
  ) {
    const mutableParams = new URLSearchParams(searchParams);

    // handles array of param objects (if a list of params is passed)
    if (isArray(nameOrArray)) {
      // a clear name to denote the nameOrArray parameter is an array of param objects
      const params = nameOrArray;

      for (const param of params) {
        mutableParams.set(param.name, param.value);
      }
    }
    // handles a single param
    else if (typeof nameOrArray === "string") {
      // a clear name to denote the nameOrArray parameter is a single name string
      const name = nameOrArray;
      mutableParams.set(name, value as string);
    }

    router.push(`?${mutableParams.toString()}`);
  }

  return {
    ...router,
    searchParams: {
      ...searchParams,
      set: setParams,
    },
  };
}
