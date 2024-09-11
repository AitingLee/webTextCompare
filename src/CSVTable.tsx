import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {FC, useEffect, useState} from "react";

interface CSVTableProps {
    originalText: string
}

interface ParsedRow {
    [key: string]: string;
}

const parseCSV = (csvText: string): ParsedRow[] => {
    const lines: string[] = csvText.split("\n");
    const headers: string[] = lines[0].split(",");
    const parsedData: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(",");

        if (currentLine.length === headers.length) {
            const row: ParsedRow = {};
            for (let j = 0; j < headers.length; j++) {
                row[headers[j].trim()] = currentLine[j].trim();
            }
            parsedData.push(row);
        }
    }
    return parsedData;
};

const CSVTable: FC<CSVTableProps> = ({ originalText }) => {
    const [csvData, setCsvData] = useState<ParsedRow[]>([]);

    useEffect(() => {
        setCsvData(parseCSV(originalText));
    }, [originalText]);


    const headers = csvData.length > 0 ? Object.keys(csvData[0]) : [];

    return(
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        {headers.map((header, index) => (
                            <Th key={index}>
                                {header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            {headers.map((header, columnIndex) => (
                                <td key={columnIndex}>
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default CSVTable;