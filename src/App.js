import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Layout from "./component/layout";
import Home from "./Pages/Home";
import BitgertTx from "./Pages/bitgertTx";
import UsdcTx from "./Pages/usdcTx";
import UsdtTx from "./Pages/usdtTx";
import Usdt from "./Pages/Usdt";
import Usdc from "./Pages/Usdc";
// import Brise from "./Pages/Brise";

function App() {
  return (
    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       <>
    //         <Navbar />
    //         <Table/>
    //         {/* <Home /> */}
    //         <Footer />
    //       </>
    //     }
    //   />
    // </Routes>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/usdt" element={<Usdt />} />
        <Route path="/usdc" element={<Usdc />} />
        {/* <Route path="/brise" element={<Brise />} /> */}

        <Route path="/bitgertTx" element={<BitgertTx />} />
        <Route path="/usdtTx" element={<UsdtTx />} />
        <Route path="/usdcTx" element={<UsdcTx />} />
      </Route>
    </Routes>


  );
}

export default App;
