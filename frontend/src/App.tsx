import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'
import { Select, Option, Sheet, useColorScheme } from '@mui/joy';

import Pins from './gpio/Pins';

function App() {

  const { mode, systemMode } = useColorScheme()
  console.log({ mode, systemMode })
  

  return (
    <ApolloProvider client={client}>
        <ModeToggle />
        <Pins />
    </ApolloProvider>
  );
}

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme()

  return (
    <Select
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode)
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  )
}

export default App;
