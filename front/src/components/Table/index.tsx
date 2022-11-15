import { ReactElement } from "react";
import {
  Table as TableChakra,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  HStack,
  Button,
  IconButton,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";

interface TableProps {
  header: string[];
  children: ReactElement;
}

export function Table({ header, children }: TableProps) {
  return (
    <TableChakra>
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color="gray.300" w="8">
            <Checkbox colorScheme="blue" />
          </Th>
          {header.map((th) => {
            return <Th key="th">{th}</Th>;
          })}
        </Tr>
      </Thead>
      {children}
    </TableChakra>
  );
}