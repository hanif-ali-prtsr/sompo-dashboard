import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(props) {
  const data = {
    labels: props.labels,
    datasets: props.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor || [],
      borderColor: dataset.borderColor || [],
      borderWidth: dataset.borderWidth || 1,
    })),
  };

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
		},
	};

  return <Pie data={data} options={options} />;
}
