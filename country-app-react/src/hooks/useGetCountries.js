import { getContriesService } from "../service/getContriesService";
import { useQuery } from "@tanstack/react-query";
export const useGetCountries = () => {
  const {
    data: getAllCountries,
    error,
    isLoading,
    refetch: refetchAllCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await getContriesService.getCountries();
      return response;
    },
  });

  return { getAllCountries, refetchAllCountries, error, isLoading };
};
