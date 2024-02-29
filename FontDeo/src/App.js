import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Prijava from './Prijava/Prijava';
import Registracija from './Prijava/Registracija';
import Glavna from './GlavnaStranica/Glavna';
import Tabela from './KoloTabela/Tabela';
import Prikaz from './StatistikaCet/Prikaz';
import Igraci from './KoloTabela/Igraci';
import DodajUtakmicu from './Admin/DodajUtakmicu';
import AzurirajTrMinUtak from './Admin/AzurirajTrMinUtak';
import AzurirajRezultat from './Admin/AzurirajRezultat';
import AzurirajStatistiku from './Admin/AzurirajStatistiku';
import Stadion from './Admin/Stadion';
import DodajIgraca from './Admin/DodajIgraca';
import DodajTim from './Admin/DodajTim';
function App() {
  return(
    <main className="App">
      <Router>
        <Routes>
          <Route path='/Prijava' element={<Prijava/>} />
          <Route path='/Registracija' element={<> <Registracija />  </>} />
          <Route path='/' element={<><Glavna/></>}/>
          <Route path='/Tabela' element={<Tabela/>} />
          <Route path='/PrikazMeca' element={<Prikaz/>} />
          <Route path='/Igraci' element={<Igraci/>} />
          <Route path='/DodajUtakmicu' element={<DodajUtakmicu/>}/>
          <Route path='/AzurirajUtakmicu' element={<AzurirajTrMinUtak/>}/>
          <Route path='/DodajTim'element={<DodajTim/>}/>
          <Route path='/DodajStadion'element={<Stadion/>}/>
          <Route path='/DodajIgraca'element={<DodajIgraca/>}/>

        </Routes>
      </Router>
    </main>
  );
}

export default App;
