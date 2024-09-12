import {FC, useEffect, useRef, useState} from "react";
import CSVTable from "./CSVTable.tsx";
import {Button, VStack, Text} from "@chakra-ui/react";

interface TextFileReaderProps{
    handleSetFileContent: (content: string) => void;
}

const TextFileReader: FC<TextFileReaderProps> = ({handleSetFileContent}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileContent, setFileContent] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    useEffect(() => {
        handleSetFileContent(fileContent);
    }, [fileContent]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileType(file ? file.type : "");
        setFileName(file ? file.name : "");

        if (file && (file.type === "text/plain" || file.type === "text/csv")) {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result as string;
                setFileContent(result);
            };
            reader.readAsText(file);
        }
    };

    return(
        <VStack w={["100%","100%", "48%"]} borderColor="white" borderWidth="1px">
            <input type="file" accept=".txt,.csv" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }}/>
            <Button onClick={() => fileInputRef.current?.click()}>
                Upload File
            </Button>
            {fileContent != "" && (
                <Text>{fileName}</Text>
            ) }
            {fileType === "text/plain" && (
                <pre>{fileContent}</pre>
            )}
            {fileType === "text/csv" && (
                <CSVTable originalText={fileContent}/>
            )}
        </VStack>
    )
}

export default TextFileReader;