import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store";

// * easy-peasy não funciona com React 18
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <StoreProvider store={store}>
//       <Router>
//         <Routes>
//           <Route path="*" element={<App />} />
//         </Routes>
//       </Router>
//     </StoreProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
