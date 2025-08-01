import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'

import Pins from './gpio/Pins';
import './App.scss'

function App() {
  

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Pins />
          
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
