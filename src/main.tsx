import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { inject } from "@vercel/analytics";

// Vercel Web Analytics — cookie-free page views, countries and referrers.
inject();

createRoot(document.getElementById("root")!).render(<App />);
