import React from "react";

const Toast = ({msg}) => {
  return (
    <div>
      <div className="toast toast-top toast-end">
        <div className="alert alert-info">
          <span>Click Continue to singIn as {msg}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
