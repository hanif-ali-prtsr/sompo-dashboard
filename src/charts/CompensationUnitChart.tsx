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
    Number.parseInt(obj["QuotesQuote.cumulativeCompensationDeposit"] as number)
  );

  return (
    <LineChart
      options={{
        scales: {
          y: {
            title: {
              display: true,
              text: t("Amount"),
            },
            ticks: {
              callback: function (value: number) {
                return value + t("Yen");
              },
            },
          },
          x: {
            title: {
              display: true,
              text: t("Date"),
            },
          },
        },
      }}
      labels={labels}
      datasets={[
        {
          data: data,
          label: t("Sompo Business Master Plus"),
        },
      ]}
      title={t("Cumulative Deposit for Compensation Unit")}
    />
  );
}
