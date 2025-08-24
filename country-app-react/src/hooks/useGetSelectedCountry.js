import { useQuery } from "@tanstack/react-query";
import { getContriesService } from "../service/getContriesService";

export const useGetSelectedCountry = (countryCode) => {
  const {
    data: getSelectedCountry,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["country", countryCode],
    queryFn: async () => {
      if (!countryCode) return null;
      const response = await getContriesService.getSelectedCountry(countryCode);
      return response;
    },
    enabled: !!countryCode,
  });

  return { getSelectedCountry, error, isLoading, refetch };
};
