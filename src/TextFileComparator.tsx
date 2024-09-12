import {Button, Divider, Flex, IconButton, Text} from "@chakra-ui/react";
import TextFileReader from "./TextFileReader.tsx";
import {useState} from "react";
import {Change, diffWords} from "diff";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

const TextFileComparator = () => {
    const [firstFileText, setFirstFileText] = useState<string>("");
    const [secondFileText, setSecondFileText] = useState<string>("");
    const [diffOutput, setDiffOutput] = useState<Change[]>([]);
    const [diffIndexArray, setDiffIndexArray] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    function handleGoCompareClick() {
        const result = diffWords(firstFileText, secondFileText);
        setDiffOutput(result);

        const indices = result
            .map((change, index) => (change.added || change.removed) ? index : -1)
            .filter(index => index !== -1);
        setDiffIndexArray(indices);

        setCurrentIndex(-1);
    }

    function handlePrevDiffClick() {
        setCurrentIndex(prevIndex => {
            return Math.max(prevIndex - 1, -1);
        });
    }

    function handleNextDiffClick() {
        setCurrentIndex(prevIndex => {
            return prevIndex + 1 < diffIndexArray.length ? prevIndex + 1 : -1;
        });
    }

    return (
        <Flex direction="column" align="center" p={10} gap={5}>
            <Button onClick={handleGoCompareClick}>Go Compare!</Button>
            <Flex gap={4} w="100%" wrap="wrap"
                  direction={["column", "row"]}
                  justifyContent="space-between"
            >
                <TextFileReader handleSetFileContent={setFirstFileText} />
                <TextFileReader handleSetFileContent={setSecondFileText} />
            </Flex>
            <Divider/>
            {diffOutput.length > 0 && (
                <>
                    <Flex gap={4} align="center">
                        <Text>{currentIndex === -1 ? "-" : currentIndex + 1} / {diffIndexArray.length}</Text>
                        <IconButton aria-label="prev-index" icon={<ChevronLeftIcon />} onClick={handlePrevDiffClick} />
                        <IconButton aria-label="next-index" icon={<ChevronRightIcon />} onClick={handleNextDiffClick} />
                    </Flex>
                    <Flex>
                        <pre id="display">
                            {diffOutput.map((change: Change, index: number) => {
                                const color = change.added ? '#90C2E7' : change.removed ? '#FF5657' : '#EAEAEA';
                                const isHighlighted = index === (currentIndex === -1 ? -1 : diffIndexArray[currentIndex]);

                                return (
                                    <span
                                        key={index}
                                        style={{ color: color, backgroundColor: isHighlighted ? "#F2D9BB60" : "transparent" }}
                                    >
                                        {change.value}
                                    </span>
                                );
                            })}
                        </pre>
                    </Flex>
                </>
                )
            }
        </Flex>
    );
}

export default TextFileComparator;
