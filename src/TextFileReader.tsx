import {FC, useEffect, useState} from "react";
import CSVTable from "./CSVTable.tsx";

interface TextFileReaderProps{
    handleSetFileContent: (content: string) => void;
}

const TextFileReader: FC<TextFileReaderProps> = ({handleSetFileContent}) => {
    const [fileContent, setFileContent] = useState<string>(''); // 定義檔案內容的狀態
    const [fileType, setFileType] = useState<string>('');

    useEffect(() => {
        handleSetFileContent(fileContent);
    }, [fileContent]);


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileType(file ? file.type : "");

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
        <>
            <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
            {fileType === "text/plain" && (
                <pre>{fileContent}</pre>
            )}
            {fileType === "text/csv" && (
                <CSVTable originalText={fileContent}/>
            )}
        </>
    )
}

export default TextFileReader;