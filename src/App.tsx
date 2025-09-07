import "./App.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { ViewModeProvider } from "./contexts/ViewModeContext";

function App() {
  return (
    <ViewModeProvider>
      <RouterProvider router={router} />
    </ViewModeProvider>
  );
}

export default App;
