import "./App.css";
import AuthPage from "./Pages/AuthPage";
import Dashboard from "./Pages/Dashboard";
import { SignedIn, SignedOut } from "@clerk/react-router";

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
