import { useContext } from "react";
import { AuthContext } from "../Auth.Context";
import { login, register, getme } from "../services/Auth.api";

export const useAuth = () => {

  const context = useContext(AuthContext);

  const { user, setuser, loading, setloading } = context;

  async function handlelogin(username, password) {
    try {
      setloading(true);

      const response = await login(username, password);
      console.log(response);

      setuser(response);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setloading(false);
    }
  }

  async function handleregister(username, email, password) {
    try {
      setloading(true);

      const response = await register(username, email, password);

      setuser(response);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setloading(false);
    }
  }

  return { user, loading, handlelogin, handleregister };
};