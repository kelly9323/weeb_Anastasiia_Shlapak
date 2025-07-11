import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ContactPage from "../pages/Contact/ContactPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContactPage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignUpPage />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
