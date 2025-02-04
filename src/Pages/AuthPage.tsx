import { SignInButton } from "@clerk/react-router";

const AuthPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <SignInButton />
    </div>
  );
};

export default AuthPage;
