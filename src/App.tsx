import "./App.css";
import { SignedIn, SignedOut } from "@clerk/react-router";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage.tsx";

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
