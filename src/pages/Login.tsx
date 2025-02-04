import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> 
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to My Project</h2> 
        
       


        <div className="text-center"> 
          <button
            onClick={signInWithGoogle}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition duration-300"
          >
            Sign in with Google
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default Login;