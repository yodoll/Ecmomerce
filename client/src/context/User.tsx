import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "src/types/User";

// Định nghĩa kiểu dữ liệu cho context
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Tạo Context với kiểu dữ liệu là UserContextType
const UserContext = createContext<UserContextType | undefined>(undefined);

// Tạo Provider, nhận children là các component con
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
