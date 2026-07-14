import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "../ui/AppLayout";
import Feed from "../pages/Feed";
import Messages from "../pages/Messages";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

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
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
