import { useEffect } from "react";
import toast from "react-hot-toast";

const Docs = () => {
  useEffect(() => {
    toast.success("welcome to docs!!!");
  }, []);
  return <div>Docs</div>;
};

export default Docs;
