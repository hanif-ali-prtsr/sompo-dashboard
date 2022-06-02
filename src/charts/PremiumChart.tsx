import { useTranslation } from "react-i18next";
import { LineChart } from "../components/LineChart";
import { useCubeData } from "../cube/context";
import { CONTRACT_CATEGORIES, CONTRACT_CATEGORIES_LABELS } from "../utils/constants";

export default function () {
  const { countAndPremiumData: cubeData } = useCubeData();

  const { t } = useTranslation();

  const CONTRACT_CATEGORIES_LABELS: {[key: string]: string} = {
    A: t("Building"),
    B: t("Assembly"),
    CDEF: t("Civil Engineering"),
    H: t("Logistics"),
    G: t("Manufacturing"),
    K: t("Retail"),
    J: t("Wholesale"),
    M: t("Catering"),
    P: t("Service"),
    Q: t("Others"),
    L: t("Professional Service"),
  }

  const labels = cubeData?.map((obj) =>
    new Date(obj["x"] as string).toLocaleDateString("en-US")
  );

  const categoryWiseDatasets: { label: string; data: any[] }[] =
    CONTRACT_CATEGORIES.map((quoteCategory) => {
      return {
        label: CONTRACT_CATEGORIES_LABELS[quoteCategory],
        data: cubeData?.map(
          (obj) => obj[`QuotesQuote.cumulativePremium${quoteCategory}`]
        ),
        hidden: true,
      };
    });

  const totalPremiumData = cubeData.map((obj) =>
    CONTRACT_CATEGORIES.reduce(
      (prev, cur) =>
        prev + Number.parseFloat(obj[`QuotesQuote.cumulativePremium${cur}`]),
      0
    )
  );

  return (
    <LineChart
      xLabel={t("Date")}
      yLabel={t("Amount")}
      labels={labels}
      datasets={[
        {
          label: t("Total Premium"),
          data: totalPremiumData,
        },
        ...categoryWiseDatasets,
      ]}
      title={t("Total Premium Submitted")}
    />
  );
}
