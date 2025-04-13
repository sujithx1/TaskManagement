import { Routes, Route } from "react-router-dom";

import NotFound from "./components/404";

import Userroutes from "./routes/userroutes";
import AdminRoutes from "./routes/adminroutes";

const App = () => {
  return (
    <>
      <Routes>
      

      
      <Route path="/*" element={<Userroutes />} />
      <Route path="/admin/*" element={<AdminRoutes/>} />

        
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </>
  );
};

export default App;
