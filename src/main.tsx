import ReactDOM from "react-dom/client";
import "./translations/i18n";

import Dashboard from "./Dashboard";
import { CubeProvider } from "./cube/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CubeProvider>
    <Dashboard />
  </CubeProvider>
);
