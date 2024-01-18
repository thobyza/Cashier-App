import { Box, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { TransactionDataMap } from "./transactionDataMap"


export const TransactionHistory = () => {
    // const token = localStorage.getItem("token")
    const [transactionData, setTransactionData] = useState([])

    const fetchTransactionData = async () => {
        try {
            await axios.get("http://localhost:2000/sales-report").then((response) => {
                setTransactionData(response.data.rows)
                console.log(response.data.rows);
            })
        } catch (err) {
            console.log("Error fetching transaction data", err);
        }
    }

    console.log(transactionData);


    useEffect(() => {
        fetchTransactionData()
    }, [])

    return (
        <Box mt="1.2rem">
            <Text fontSize="1.2rem" fontWeight="semibold" mb="1rem">
                Recent Order
            </Text>
            <TableContainer
                bg="white"
                px="2rem"
                py="0.8rem"
                borderRadius="xl"
                border="1px"
                borderColor="#E2E8F0"
            >
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Date</Th>
                            <Th>Total Products</Th>
                            <Th>Total Amount</Th>
                            <Th>Cashier</Th>
                            <Th isNumeric>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactionData.map((item) => (
                            <TransactionDataMap getItem={item} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}