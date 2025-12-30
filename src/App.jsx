import React from "react";
import AppRoutes from "./routes";
import AIChatbot from "./components/ai/AIChatbot";

const App = () => {
  return (
    <>
      <AppRoutes />
      <AIChatbot />
    </>
  );
};

export default App;
