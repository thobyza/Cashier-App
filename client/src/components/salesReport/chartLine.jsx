import { Flex, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from 'date-fns';

export const ChartLine = () => {
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2000/sales-report/stats-per-day');
                const salesData = response.data;

                if (Array.isArray(salesData) && salesData.length > 0) {
                    setChartData(salesData);
                }
            } catch (err) {
                console.log("Error fetching chart sales data", err);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Flex
                flexDirection="column"
                bg="white"
                pl={{ base: "0.2rem", lg: "3rem" }}
                pr={{ base: "0.8rem", lg: "3.2rem" }}
                pt="2.5rem"
                pb="2rem"
                mt="1.2rem"
                borderRadius="xl"
                border="1px"
                borderColor="#E2E8F0"
            >
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'dd MMM')} tick={{ fontSize: 14, color: "#838EAF" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: "8px" }} // Tooltip background and border color
                            labelStyle={{ color: '#000', fontSize: '14px', fontWeight: 'medium' }} // Tooltip label styling
                        />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#3A67FA" />
                    </LineChart>
                </ResponsiveContainer>
                {/* Legend for Line Chart */}
                <Flex justifyContent="center" alignItems="center" gap="1.6rem">
                    <Flex alignItems="center" gap="0.5rem">
                        <Flex w="12px" h="12px" bg="#3A67FA" borderRadius="sm"></Flex>
                        <Text fontWeight="medium" textColor="#595959">Total Earnings</Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}