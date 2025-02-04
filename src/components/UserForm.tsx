import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const initialFormData: Omit<UserData, 'id'> = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

// Typing formErrors to ensure proper structure
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<Omit<UserData, 'id'>>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(formData).some(key => formData[key as keyof typeof formData] !== initialFormData[key as keyof typeof initialFormData])) { 
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const userData: UserData = {
        ...formData,
        id: uuidv4(),
      };

      const existingUsers: UserData[] = JSON.parse(localStorage.getItem('users') || '[]');
      localStorage.setItem('users', JSON.stringify([...existingUsers, userData]));

      setFormData(initialFormData);
      setIsSubmitted(true);
      setFormErrors({});

      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="relative">
      {isSubmitted && (
        <div className="absolute top-0 left-0 right-0 -mt-12 flex justify-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-sm">
            User data saved successfully!
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
        <div className="space-y-6">
          {Object.keys(initialFormData).map((key) => (
            <div className="relative" key={key}>
              <input
                type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                id={key}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className={`peer w-full border-b-2 ${formErrors[key as keyof FormErrors] ? 'border-red-500' : 'border-gray-300'} bg-transparent pt-4 pb-1.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none`}
                placeholder=" "
                required
              />
              <label
                htmlFor={key}
                className={`absolute left-0 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 ${formErrors[key as keyof FormErrors] ? 'text-red-500' : ''}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {formErrors[key as keyof FormErrors] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[key as keyof FormErrors]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save User Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
