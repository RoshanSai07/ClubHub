import React from "react";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes";
import AIChatbot from "./components/chatbot/AIChatbot";

const App = () => {
  return (
    <div className="">
      <AppRoutes />
      <AIChatbot />
      <Analytics />
    </div>
  );
};

export default App;
