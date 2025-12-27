const ToggleItem = ({
  title,
  description,
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full flex items-center px-1 transition cursor-pointer
          ${enabled ? "bg-blue-600" : "bg-gray-300"}
        `}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform
            ${enabled ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleItem;
