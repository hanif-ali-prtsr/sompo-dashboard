import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import QuotesCount from "./components/QuotesCount";
import QuotesCountChart from "./charts/QuotesCountChart";
import PremiumChart from "./charts/PremiumChart";
import StatusChart from "./charts/StatusChart";
import CompensationUnitChart from "./charts/CompensationUnitChart";
import { Controls } from "./components/Controls";
import ContractTypeChart from "./charts/ContractTypeChart";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from "react";

const mdTheme = createTheme();

function DashboardContent() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: Event | null, newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("dashboardLanguage", newLanguage)
  };

  useEffect(() => {
    if (localStorage.getItem("dashboardLanguage")) {
      changeLanguage(null, localStorage.getItem("dashboardLanguage")!)
    }
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <MuiAppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {t("Sompo Business Master Plus Dashboard")}
            </Typography>

            <ToggleButtonGroup
              value={i18n.language}
              exclusive
              onChange={changeLanguage}
            >
              <ToggleButton sx={{color: "#bdbdbd", borderColor: "#bdbdbd"}} value="en">EN</ToggleButton>
              <ToggleButton value="ja" sx={{color: "#bdbdbd", borderColor: "#bdbdbd"}}>倭国語</ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        </MuiAppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls />
              </Grid>
              <Grid item xs={12} md={7} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <QuotesCountChart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={5} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <QuotesCount />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <PremiumChart />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <CompensationUnitChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 370,
                  }}
                >
                  <StatusChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 370,
                  }}
                >
                  <ContractTypeChart />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
