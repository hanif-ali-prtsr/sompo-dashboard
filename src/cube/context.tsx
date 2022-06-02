import React, { useEffect, useState } from "react";
import { cubejsApi } from "./config";
import { queries } from "./queries";

type PivotResult = {[key: string]: string | number | boolean}

const initialData = {
  loading: false,
  allQuotesCount: 0,
  countAndPremiumData: [],
  statusData: [],
  contractTypeData: [],
  updateData: () => Promise.resolve(),
}

const CubeContext = React.createContext<{
  loading: boolean,
  allQuotesCount: number,
  countAndPremiumData: PivotResult[],
  statusData: PivotResult[],
  contractTypeData: PivotResult[],
  updateData: () => Promise<void>,
}>(initialData);

export const useCubeData = () => React.useContext(CubeContext);

export const CubeProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false);
  const [allQuotesCount, setAllQuotesCount] = useState<number>(0);
  const [countAndPremiumData, setCountAndPremiumData] = useState<PivotResult[]>([]);
  const [statusData, setStatusData] = useState<PivotResult[]>([]);
  const [contractTypeData, setContractTypeData] = useState<PivotResult[]>([]);

  const updateData = async (): Promise<void> => {
    setLoading(true);
    const allQuotesCount = (
      await cubejsApi.load(queries.allQuotesCount)
    ).tablePivot();
    const countAndPremiumData = (
      await cubejsApi.load(queries.countsAndPremiums)
    ).chartPivot();
    const statusData = (
      await cubejsApi.load(queries.quoteStatuses)
    ).tablePivot();
    const contractTypeData = (
      await cubejsApi.load(queries.quoteContractTypes)
    ).tablePivot();

    setAllQuotesCount(allQuotesCount[0]["QuotesQuote.cumulativeCount"] as number);
    setCountAndPremiumData(countAndPremiumData);
    setStatusData(statusData);
    setContractTypeData(contractTypeData);
    setLoading(false);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <CubeContext.Provider
      value={{
        allQuotesCount,
        countAndPremiumData,
        statusData,
        contractTypeData,
        updateData,
        loading,
      }}
    >
      {children}
    </CubeContext.Provider>
  );
};
