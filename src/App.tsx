import TextFileComparator from "./TextFileComparator.tsx";
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <TextFileComparator/>
    </ChakraProvider>
  )
}

export default App
