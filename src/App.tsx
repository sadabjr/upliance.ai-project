import "./App.css";
import AuthPage from "./pages/AuthPage";
import { SignedIn, SignedOut } from "@clerk/react-router";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <SignedOut>
        <AuthPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;
