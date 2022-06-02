import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { COLORS, COLORS_LIGHT } from "../utils/constants";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export function LineChart(props: {
  title: string;
  xLabel: string;
  yLabel: string;
  yCurrency: boolean;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    hidden?: boolean;
  }[];
  options: { [key: string]: any };
}) {
  const { t } = useTranslation();

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.00001,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },

    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOut",
        },
      },
    },

    scales: {
      y: {
        title: {
          display: props.yLabel ? true : false,
          text: props.yLabel,
        },
        ticks: {
          callback: function (value: number) {
            return props.yCurrency ? value + t("Yen") : value;
          },
        },
      },
      x: {
        title: {
          display: props.xLabel ? true : false,
          text: props.xLabel,
        },
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: props.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor ?? COLORS[index],
      backgroundColor: dataset.backgroundColor ?? COLORS_LIGHT[index],
      hidden: dataset.hidden ?? false,
    })),
  };

  return <Line options={{ ...options, ...props.options }} data={data} />;
}
