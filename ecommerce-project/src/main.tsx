import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // This is for Lesson 7d. I make this note because it ask me to test the Strictmode
  // Strictmode will execute twice the code to checks the bugs and leaks of the code.
  // ex: if your code renders unexpectedly more than once, it will show you an error.

  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
