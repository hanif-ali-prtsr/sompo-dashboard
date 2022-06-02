import { useTranslation } from "react-i18next";
import { LineChart } from "../components/LineChart";
import { useCubeData } from "../cube/context";

export default function () {
  const { countAndPremiumData: cubeData } = useCubeData();

  const { t } = useTranslation();

  const labels = cubeData?.map((obj) =>
    new Date(obj["x"] as string).toLocaleDateString("en-US")
  );
  const data = cubeData?.map((obj) =>
    Number.parseInt(obj["QuotesQuote.cumulativeCount"] as string)
  );

  return (
    <LineChart
      labels={labels}
      datasets={[
        {
          data: data,
          label: t("Sompo Business Master Plus"),
        },
      ]}
      title={t("Total Quotes")}
    />
  );
}
