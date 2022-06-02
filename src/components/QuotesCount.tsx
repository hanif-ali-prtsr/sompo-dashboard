import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useCubeData } from "../cube/context";
import { CONTRACT_CATEGORIES } from "../utils/constants";
import { useTranslation } from "react-i18next";

export default function QuotesCount() {
  const { countAndPremiumData: cubeData, allQuotesCount } = useCubeData();

  const { t } = useTranslation()

  if (!cubeData.length) {
    return <></>;
  }

  const lastCumulativeData = cubeData[cubeData.length - 1];

  const totalPremium = CONTRACT_CATEGORIES.reduce(
    (prev, cur) =>
      prev +
      Number.parseFloat(
        lastCumulativeData[`QuotesQuote.cumulativePremium${cur}`] as string
      ),
    0
  );
  const totalQuotesCount = lastCumulativeData[`QuotesQuote.cumulativeCount`];

  return (
    <React.Fragment>
      <Typography component="div" variant="h4" sx={{ mb: 2 }}>
        <Title>{t("Total Quotes Created")}</Title>
        {allQuotesCount}
      </Typography>
      <Typography component="div" variant="h4" sx={{ mb: 2 }}>
        <Title>{t("Total Quotes Submitted")}</Title>
        {totalQuotesCount}
      </Typography>
      <Typography component="div" variant="h4" sx={{ mb: 2 }}>
        <Title>{t("Total Premium Submitted")}</Title>{totalPremium} {t("Yen")}
      </Typography>
    </React.Fragment>
  );
}
