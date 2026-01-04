import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const HeaderSection = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-10"
    >
      <ArrowLeft size={18} />
      <span className="text-lg  font-medium">Back</span>
    </button>
  );
};

export default HeaderSection;
