import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./layout/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsersPage from "./pages/users/UsersPage";
import UserForm from "./pages/users/UserForm";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Deliverables from "./pages/deliverable/Deliverables";
import LoginPage from "./pages/login/Login";
import Medicines from "./pages/medicines/Medicines";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/edit/:userId" element={<UserForm />} />
              <Route path="/deliverables" element={<Deliverables />} />
              <Route path="/medicines" element={<Medicines />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
