import './App.css';
import FileMenedger from './components/FileMenedger/FileMenedger';
import Container from '@mui/material/Container';

function App() {
  return (
      <Container className="App" maxWidth="lg">
        <FileMenedger />
      </Container>
  );
}

export default App;
