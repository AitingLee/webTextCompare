import {Button, Flex} from "@chakra-ui/react";
import TextFileReader from "./TextFileReader.tsx";
import {useState} from "react";
import {Change, diffChars} from "diff";


const TextFileComparator = () => {
    const [firstFileText, setFirstFileText] = useState<string>("");
    const [secondFileText, setSecondFileText] = useState<string>("");
    const [diffOutput, setDiffOutput] = useState<Change[]>([]);

    function handleGoCompareClick(){
        const result = diffChars(firstFileText, secondFileText); // 使用 diffString 來進行比對
        setDiffOutput(result); // 設定比對結果
    }

    return(
        <Flex direction="column">
            <Flex justify="space-around" p={10}>
                <TextFileReader handleSetFileContent={setFirstFileText}/>
                <Button onClick={handleGoCompareClick}> Go ! </Button>
                <TextFileReader handleSetFileContent={setSecondFileText}/>
            </Flex>
            <Flex>
                <pre id="display">
                    {diffOutput.map((change: Change, index: number) => {
                        // 根據 change 中的 added 和 removed 屬性決定顏色
                        const color = change.added ? 'green' : change.removed ? 'red' : 'black';

                        return (
                            <span key={index} style={{color: color}}>
                                {change.value}
                            </span>
                        );
                    })}
                </pre>
            </Flex>
        </Flex>
    )
}

export default TextFileComparator