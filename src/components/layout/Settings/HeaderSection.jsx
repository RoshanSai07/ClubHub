import { useNavigate } from "react-router-dom";

const HeaderSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10">
      <button className="text-left" onClick={()=>navigate(-1)}>← Back</button>
    </div>
  );
};

export default HeaderSection;
