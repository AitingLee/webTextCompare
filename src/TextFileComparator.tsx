import {Button, Flex} from "@chakra-ui/react";
import TextFileReader from "./TextFileReader.tsx";

const TextFileComparator = () => {
    return(
        <Flex justify="space-around" p={10}>
            <TextFileReader/>
            <Button> Go ! </Button>
            <TextFileReader/>
        </Flex>
    )
}

export default TextFileComparator