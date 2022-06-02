import { cubejsApi } from "./config";

const todayDate = (new Date())
const oneMonthAgo = new Date()
oneMonthAgo.setMonth(todayDate.getMonth() - 1);

export const queries = {
  allQuotesCount: {
    measures: [
      "QuotesQuote.cumulativeCount",
    ],
  },

  countsAndPremiums: {
    measures: [
      "QuotesQuote.cumulativeCount",
      "QuotesQuote.cumulativePremiumA",
      "QuotesQuote.cumulativePremiumB",
      "QuotesQuote.cumulativePremiumCDEF",
      "QuotesQuote.cumulativePremiumH",
      "QuotesQuote.cumulativePremiumG",
      "QuotesQuote.cumulativePremiumK",
      "QuotesQuote.cumulativePremiumJ",
      "QuotesQuote.cumulativePremiumM",
      "QuotesQuote.cumulativePremiumP",
      "QuotesQuote.cumulativePremiumQ",
      "QuotesQuote.cumulativePremiumL",

      "QuotesQuote.cumulativeCompensationDeposit",
    ],
    timeDimensions: [
      {
        dimension: "QuotesQuote.createdAt",
        granularity: "day",
        dateRange: [oneMonthAgo.toISOString().split('T')[0], todayDate.toISOString().split('T')[0]]
      },
    ],
    filters: [
      {
        member: "PoliciesPolicy.status",
        operator: "equals",
        values: ["SUBMITTED"],
      },
    ],
  },

  quoteStatuses: {
    "measures": [
      "QuotesQuote.count"
    ],
    "order": {
      "QuotesQuote.count": "desc"
    },
    "dimensions": [
      "PoliciesPolicy.status"
    ],
    "timeDimensions": []
  },

  quoteContractTypes: {
    "measures": [
      "QuotesQuote.count"
    ],
    "order": {
      "QuotesQuote.count": "desc"
    },
    "dimensions": [
      "QuotesQuote.contractType"
    ]
  },
} as const;
