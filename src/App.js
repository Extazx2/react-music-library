import './App.scss';
import Library from './components/library';
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretUp)
library.add(faCaretDown)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Library />
      </header>
    </div>
  );
}

export default App;
