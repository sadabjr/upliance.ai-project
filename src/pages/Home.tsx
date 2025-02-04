import React, { ReactNode } from 'react';
import Counter from '../components/Counter';
import UserForm from '../components/UserForm';
import RichTextEditor from '../components/RichTextEditor';

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const Card = ({ children, title, description }: CardProps) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 text-center mb-6">{description}</p>
      )}
      {children}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            A modern and responsive interface
          </p>
        </header>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card 
              title="Interactive Counter" 
              description="Watch the background change as you count"
            >
              <div className="flex justify-center items-center min-h-[200px]">
                <Counter />
              </div>
            </Card>

            <Card 
              title="User Information" 
              description="Enter your details below"
            >
              <div className="min-h-[200px]">
                <UserForm />
              </div>
            </Card>
          </div>

          <Card 
            title="Content Editor" 
            description="Create and edit rich content with autosave"
          >
            <div className="min-h-[400px] mt-4">
              <RichTextEditor />
            </div>
          </Card>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">Auto-saving enabled</span>
            </div>
            <p className="text-sm">Changes are saved automatically to local storage</p>
          </div>
        </footer>

        <div className="fixed bottom-4 right-4 transform transition-transform duration-300 hover:scale-105">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">All changes saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
