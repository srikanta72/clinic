
import './App.css';
import { ClinicsList } from './components/clinics/ClinicsList';
import ButtonAppBar from './components/header/ButtonAppBar';
import { ErrorBoundary } from './components/shared/error/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar />
      </header>
      <ErrorBoundary>
        <div className='container'>
          <ClinicsList />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
