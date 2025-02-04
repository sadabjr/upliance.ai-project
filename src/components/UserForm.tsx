import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData }) => {
  const [formData, setFormData] = useState<UserData>(
    userData.id ? userData : { ...userData, id: crypto.randomUUID() }
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    setIsDirty(true);
    setError(null);
  };

  const handleSubmit = () => {
    const fieldsAreValid =
      formData.name && formData.email && formData.phone && formData.address;

    if (!fieldsAreValid) {
      setError("All fields are required.");
      return;
    }

    setUserData(formData);
    localStorage.setItem("userData", JSON.stringify(formData));

    setFormData({
      id: crypto.randomUUID(),
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsDirty(false);
    setError(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth="400px" margin="auto">
      <h2 className="text-xl font-semibold">User Information</h2>

      <FormControl fullWidth error={Boolean(error)} className="flex gap-4">
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth className="mt-4">
        Save
      </Button>
    </Box>
  );
};

export default UserForm;
