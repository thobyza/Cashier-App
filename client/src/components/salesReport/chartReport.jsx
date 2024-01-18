import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Line, LineChart } from 'recharts';
import { ChartLine } from './chartLine';

export const ChartReport = () => {
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2000/sales-report/aggregate-per-day');
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

    console.log(chartData);

    return (
        <Box mt="1.2rem">
            <Text fontSize="1.2rem" fontWeight="semibold">
                Sales Data Chart
            </Text>
            {/* Bar Chart */}
            {/* <Flex
                flexDirection="column"
                bg="white"
                pl={{ base: 0, lg: "3rem" }}
                pr={{ base: "0.8rem", lg: "3.2rem" }}
                pt="2.5rem"
                pb="2rem"
                mt="1.2rem"
                borderRadius="xl"
                border="1px"
                borderColor="#E2E8F0"
            >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'dd MMM')} tick={{ fontSize: 14, color: "#838EAF" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: "8px" }} // Tooltip background and border color
                            labelStyle={{ color: '#000', fontSize: '14px', fontWeight: 'medium' }} // Tooltip label styling
                        />
                        <Bar barSize={{ base: 10, md: 15, lg: 20 }} dataKey="totalOrders" fill="#3A67FA" />
                        <Bar barSize={{ base: 10, md: 15, lg: 30 }} dataKey="totalQuantity" fill="#11C9BE" />
                    </BarChart>
                </ResponsiveContainer>
                <Flex justifyContent="center" alignItems="center" gap="1.6rem">
                    <Flex alignItems="center" gap="0.5rem">
                        <Flex w="12px" h="12px" bg="#3A67FA" borderRadius="sm"></Flex>
                        <Text fontWeight="medium" textColor="#595959">Total Orders</Text>
                    </Flex>
                    <Flex alignItems="center" gap="0.5rem">
                        <Flex w="12px" h="12px" bg="#11C9BE" borderRadius="sm"></Flex>
                        <Text fontWeight="medium" textColor="#595959">Total Product Sold</Text>
                    </Flex>
                </Flex>
            </Flex> */}
            {/* Line Chart initial */}
            {/* <Flex
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
                        <Line type="monotone" dataKey="totalEarnings" stroke="#3A67FA" />
                    </LineChart>
                </ResponsiveContainer>
                <Flex justifyContent="center" alignItems="center" gap="1.6rem">
                    <Flex alignItems="center" gap="0.5rem">
                        <Flex w="12px" h="12px" bg="#3A67FA" borderRadius="sm"></Flex>
                        <Text fontWeight="medium" textColor="#595959">Total Earnings</Text>
                    </Flex>
                </Flex>
            </Flex> */}

            {/* Line Chart */}
            <ChartLine />
        </Box>
    );
}