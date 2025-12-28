const InputField = ({
  label,
  name,
  value,
  isEditing,
  onChange,
}) => {
  return (
    <div className="mt-3">
      <label className="text-sm text-gray-500">{label}</label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]"
        />
      ) : (
        <p className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">{value}</p>
      )}
    </div>
  );
};

export default InputField;
