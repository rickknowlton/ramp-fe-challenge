import { useCallback, useState } from "react"
import { RequestByEmployeeParams, Transaction } from "../utils/types"
import { TransactionsByEmployeeResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"

export function useTransactionsByEmployee(): TransactionsByEmployeeResult {
  const { fetchWithCache } = useCustomFetch();
  const [transactionsByEmployee, setTransactionsByEmployee] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchById = useCallback(async (employeeId: string) => {
    setLoading(true);
    const data = await fetchWithCache<Transaction[], RequestByEmployeeParams>("transactionsByEmployee", {
      employeeId,
    });
    setLoading(false);

    setTransactionsByEmployee(data);
  }, [fetchWithCache]);

  const invalidateData = useCallback(() => {
    setTransactionsByEmployee(null);
  }, []);

  return { data: transactionsByEmployee, loading, fetchById, invalidateData };
}

