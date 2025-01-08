import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LT_Login from './LT_Login';
import LT_Pda_Ship from './LT_Pda_Ship';
import LT_Pda_Ship_Insert from './LT_Pda_Ship_Insert';
import LT_Pda_Ship_RFID from './LT_Pda_Ship_RFID';
import LT_Pda_Ship_RFID_Scan from './LT_Pda_Ship_RFID_Scan';
import LT_Pda_Ship_AN from './LT_Pda_Ship_AN';
import LT_Pda_Ship_AN_WorkTicket from './LT_Pda_Ship_AN_WorkTicket';
import LT_Pda_Ship_AN_WorkTicket_Detail from './LT_Pda_Ship_AN_WorkTicket_Detail';
import LT_Pda_Ship_AN_Borbin from './LT_Pda_Ship_AN_Borbin';

export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LT_Login/>} />
        <Route path="/LT_Pda_Ship" element={<LT_Pda_Ship/>} />
        <Route path="/LT_Pda_Ship_Insert" element={<LT_Pda_Ship_Insert/>} />
        <Route path="/LT_Pda_Ship_RFID" element={<LT_Pda_Ship_RFID/>} />
        <Route path="/LT_Pda_Ship_RFID_Scan" element={<LT_Pda_Ship_RFID_Scan/>} />
        <Route path="/LT_Pda_Ship_AN" element={<LT_Pda_Ship_AN/>} />
        <Route path="/LT_Pda_Ship_AN_WorkTicket" element={<LT_Pda_Ship_AN_WorkTicket/>} />
        <Route path="/LT_Pda_Ship_AN_WorkTicket_Detail" element={<LT_Pda_Ship_AN_WorkTicket_Detail/>} />
        <Route path="/LT_Pda_Ship_AN_Borbin" element={<LT_Pda_Ship_AN_Borbin/>} />
      </Routes>
    </Router>
  );
}

export default App
