import React, { useEffect } from "react";
import { getTimeSince } from "./get-time-since";

export const useTimeSinceLastUpdate = (interval = 5) : {
	timeSinceLastUpdate: string,
	resetTimer: () => void
}=> {
  const [timeSince, setTimeSince] = React.useState<string>("0 seconds");
	const [timer, setTimer] = React.useState<number | null>(null)

	const resetTimer = () => {
		if (timer) clearInterval(timer)
		setTimeSince("0 seconds")

		const currentTime = new Date()
    const newTimer = setInterval(() => {
			setTimeSince(getTimeSince(currentTime))
    }, interval * 1000);
		setTimer(newTimer)
	}

	useEffect(resetTimer, [])

  return { timeSinceLastUpdate: timeSince, resetTimer };
};
