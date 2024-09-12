import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
    Text
} from '@chakra-ui/react';
import { FC, useEffect, useState } from "react";

interface CSVTableProps {
    originalText: string;
}

interface ParsedRow {
    [key: string]: string;
}

const parseTextWithColor = (text: string) => {
    const tagRegex = /<(\w+)>(.*?)<\/\1>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(text)) !== null) {
        const beforeMatch = text.substring(lastIndex, match.index);
        if (beforeMatch) {
            parts.push(beforeMatch);
        }

        const tagName = match[1];
        const innerText = match[2];

        if (tagName === 'added') {
            parts.push(
                <Text as="span" color="#90C2E7" key={match.index}>
                    {parseTextWithColor(innerText)}
                </Text>
            );
        } else if (tagName === 'removed') {
            parts.push(
                <Text as="span" color="#FF5657" key={match.index}>
                    {parseTextWithColor(innerText)}
                </Text>
            );
        } else if (tagName === 'highlight') {
            parts.push(
                <Text as="span" backgroundColor="#F2D9BB60" key={match.index}>
                    {parseTextWithColor(innerText)}
                </Text>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

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

    return (
        <TableContainer>
            <Table variant="simple">
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        {headers.map((header, index) => (
                            <Th key={index}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {csvData.map((row, index) => (
                        <Tr key={index}>
                            {headers.map((header, columnIndex) => (
                                <td key={columnIndex}>
                                    {parseTextWithColor(row[header])}
                                </td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default CSVTable;