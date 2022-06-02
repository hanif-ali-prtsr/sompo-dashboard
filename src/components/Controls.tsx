import { Replay, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useCubeData } from "../cube/context";
import { useTimeSinceLastUpdate } from "../utils/use-time-since-last-update";

export const Controls = () => {
  const { loading, updateData } = useCubeData();
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [refreshDuration, setRefreshDuration] = useState<number>(0);
  const { timeSinceLastUpdate, resetTimer } = useTimeSinceLastUpdate();

  const { t } = useTranslation();

  const updateRefreshInterval = async (newDuration: number) => {
    if (refreshInterval) clearInterval(refreshInterval);
    setRefreshDuration(newDuration);
    if (newDuration <= 0) return;
    const newInterval = setInterval(() => {
      updateData().then(() => resetTimer());
    }, newDuration);
    setRefreshInterval(newInterval);
    localStorage.setItem("dashboardRefreshDuration", newDuration.toString());
  };

  const handleClickRefresh = () => {
    updateData().then(() => resetTimer());
  };

  useEffect(() => {
    if (localStorage.getItem("dashboardRefreshDuration")) {
      updateRefreshInterval(
        Number.parseInt(localStorage.getItem("dashboardRefreshDuration"))
      );
    } else {
      updateRefreshInterval(refreshDuration);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<Save />}
          variant="outlined"
          color="primary"
        >
          {t("Refreshing")}
        </LoadingButton>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          component="span"
          startIcon={<Replay />}
          onClick={handleClickRefresh}
        >
          {t("Refresh Data")}
        </Button>
      )}
      <Typography display="inline" ml={6}>
        {t("Auto-refresh")}
      </Typography>

      <FormControl size="small" sx={{ ml: 2 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={refreshDuration}
          onChange={(e) => updateRefreshInterval(e.target.value as number)}
        >
          <MenuItem value={5000}>{t("every 5 Seconds")}</MenuItem>
          <MenuItem value={10000}>{t("every 10 Seconds")}</MenuItem>
          <MenuItem value={30000}>{t("every Thirty Seconds")}</MenuItem>
          <MenuItem value={60000}>{t("every 1 Minute")}</MenuItem>
          <MenuItem value={300000}>{t("every 5 Minutes")}</MenuItem>
          <MenuItem value={600000}>{t("every 10 Minutes")}</MenuItem>
          <MenuItem value={0}>{t("Never")}</MenuItem>
        </Select>
      </FormControl>

      <Typography sx={{ ml: 4 }} display="inline" color="text.secondary">
        {t("Last Updated")}: {timeSinceLastUpdate} {t("ago")}
      </Typography>
    </>
  );
};
