import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "../ui/AppLayout";
import Feed from "../pages/Feed";
import Messages from "../pages/Messages";
import SignIn from "../pages/SignIn";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Discover from "../pages/Discover";
import ConnectionsPage from "../pages/ConnectionsPage";
import ProtectedRoute from "../ui/ProtectedRoute";
import ActivePost from "../ui/ActivePost";
import UserProfile from "../pages/UserProfile";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Feed />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile/:user_name" element={<UserProfile />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/post-id/:postId" element={<ActivePost />} />
            </Route>
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroudColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
