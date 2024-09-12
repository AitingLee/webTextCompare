import {FC, useEffect, useState} from "react";
import CSVTable from "./CSVTable.tsx";
import {VStack, Text} from "@chakra-ui/react";
import FileDropUploader from "./FileDropUploader.tsx";

interface TextFileReaderProps{
    title: string;
    handleSetFileContent: (content: string) => void;
    handleSetFileType: (type: string) => void;
    clearSignal: boolean;
}

const TextFileReader: FC<TextFileReaderProps> = ({handleSetFileContent, title, handleSetFileType, clearSignal}) => {
    const [fileContent, setFileContent] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        handleSetFileContent(fileContent);
        handleSetFileType(fileType);
    }, [fileContent]);

    useEffect(() => {
        if (clearSignal) {
            setFileContent("");
            setFileType("");
            setFileName("");
            setErrorMsg("");
        }
    }, [clearSignal]);

    const handleFileUpload = (files: File[]) => {
        const file = files[0];
        setFileContent("");
        setErrorMsg("");
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
        else {
            setErrorMsg("Please upload only 1 text file (.txt or .csv)")
        }
    };

    return(
        <VStack w={["100%","100%", "48%"]} p={4} borderColor="white" borderWidth="1px">
            <Text fontSize="1.25rem" fontWeight={800}>{title}</Text>
            <FileDropUploader onFileLoaded={handleFileUpload}/>
            {fileContent != "" && (
                <Text>{fileName}</Text>
            ) }
            {fileType === "text/plain" && (
                <pre>{fileContent}</pre>
            )}
            {fileType === "text/csv" && (
                <CSVTable originalText={fileContent}/>
            )}
            {errorMsg !== "" && (
                <Text color="#FF5657">{errorMsg}</Text>
            )}
        </VStack>
    )
}

export default TextFileReader;