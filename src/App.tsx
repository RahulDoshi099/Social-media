import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Sentiment from "./pages/Sentiment";
import Trends from "./pages/Trends";
import { ThemeProvider } from "./hooks/use-theme";
import AuthModal from "./components/auth/AuthModal";
import { useState } from "react";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!isAuthenticated && (
        <AuthModal onLogin={() => setIsAuthenticated(true)} />
      )}
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/sentiment" component={Sentiment} />
        <Route path="/trends" component={Trends} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
