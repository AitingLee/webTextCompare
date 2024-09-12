import {FC} from 'react';
import { useDropzone } from 'react-dropzone';
import { Flex, Text} from '@chakra-ui/react';

interface FileDropUploaderProps {
    onFileLoaded: (files: File[]) => void;
}

const FileDropUploader:FC<FileDropUploaderProps> = ({onFileLoaded}) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileLoaded,
        accept: {
            'text/plain': ['.txt'],
            'text/csv': ['.csv']
        },
        maxFiles: 1
    });

    return (
        <Flex
            p={4} w="100%" h="5rem" align="center" justify="center"
            border="2px dashed" borderColor={isDragActive ? 'blue.500' : 'gray.300'} borderRadius="md"
            textAlign="center" _hover={{borderColor:"gray.500",  cursor: "pointer"}}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <Text>Drop it !!</Text>
            ) : (
                <Text>Drag and Drop file here, or click to select file</Text>
            )}
        </Flex>
    );
};

export default FileDropUploader;
