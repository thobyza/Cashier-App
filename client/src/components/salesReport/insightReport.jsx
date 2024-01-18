import { Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from 'react-toastify';


import { IoIosSearch } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdShoppingCart } from "react-icons/md";
import { useState } from "react";

export const InsightReport = () => {
    // react date picker
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;


    // sales by date range
    const [salesReport, setSalesReport] = useState(null)

    const fetchSalesByDate = async () => {
        try {

            const response = await axios.get('http://localhost:2000/sales-report/by-date', {
                params: {
                    startDate: startDate, // Convert to appropriate format if needed
                    endDate: endDate,
                },
            })
            console.log(startDate);
            console.log(endDate);
            setSalesReport(response.data)

            if (salesReport.totalEarnings === 0) {
                toast.error('No Sales Report data between those dates!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
            }

        } catch (err) {
            console.log("Error fetching data", err);
        }
    }

    const gridReport = [
        { icon: RiMoneyDollarCircleFill, title: "Total Earnings", bg: "#3D05DE", bills: `${salesReport?.totalEarnings}`, note: "Rp" },
        { icon: BsFillBoxSeamFill, title: "Total Product Sold", bg: "#FF6A6A", bills: `${salesReport?.totalQuantity}`, note: "" },
        { icon: MdShoppingCart, title: "Total Orders", bg: "#FF8759", bills: `${salesReport?.totalOrders}`, note: "" },
    ]


    console.log(salesReport);

    // convert price format
    const convertToIDR = (price) => {
        const priceStr = price.toString().split('');

        for (let i = priceStr.length - 3; i > 0; i -= 3) {
            priceStr.splice(i, 0, '.');
        }
        const formattedPrice = priceStr.join('');
        return formattedPrice;
    }

    return (
        <>
            {/* Insight & Datepicker */}
            <Flex flexDirection={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={{ bae: "start", lg: "center" }} mt={{ base: 0, lg: "1rem" }}>
                <Text fontSize="1.2rem" fontWeight="semibold" mb={{ base: "0.8rem", lg: 0 }}>
                    Insight
                </Text>
                {/* Datepicker */}
                <Flex>
                    <Flex
                        alignItems="center"
                        gap="0.8rem"
                        bg="white"
                        pl="1rem"
                        pr="0.5rem"
                        py="0.4rem"
                        borderRadius="lg"
                        border="1px"
                        borderColor="#E2E8F0"
                    >
                        <Text
                            fontSize="0.9rem"
                            fontWeight="medium"
                            textColor="#757575"
                        >
                            Date range :
                        </Text>
                        <Flex>
                            {/* react datepicker */}
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                withPortal
                            />
                        </Flex>
                    </Flex>
                    {/* Test */}
                    <Flex
                        onClick={fetchSalesByDate}
                        alignItems="center"
                        px="0.5rem"
                        bg="#E2E8F0"
                        borderRadius="lg"
                        ml="0.5rem"
                        my="0.1rem"
                        _hover={{
                            bg: "#DBEAFE",
                            cursor: "pointer"
                        }}
                    >
                        <Icon as={IoIosSearch} fontSize="1.3rem" textColor="#6c757a"></Icon>
                    </Flex>
                </Flex>
            </Flex>
            {/* Sales Report by Date Range Block */}
            <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
                {gridReport.map((item) => (
                    <GridItem
                        colSpan={{ base: 3, lg: 1 }}
                        bg="white"
                        borderRadius="xl"
                        py="6"
                        px="2rem"
                        border="1px"
                        borderColor="#E2E8F0"
                        role="group"
                        _hover={{
                            border: "1px",
                            borderColor: "#4D81F1",
                            bg: "#E7EEFD9E",
                            transitionDuration: "0.4s",
                            transitionTimingFunction: "ease-in-out",
                            cursor: "pointer",
                        }}
                    >
                        <Flex flexDirection="row" alignItems="center" gap="1.4rem">
                            <Flex borderRadius="full" bg={item.bg} p="0.9rem">
                                <Icon
                                    as={item.icon}
                                    textColor="white"
                                    h="1.6rem"
                                    w="1.6rem"
                                ></Icon>
                            </Flex>
                            <Flex flexDirection="column" pl="0.2rem">
                                <Flex>{/* {startDate} */}</Flex>
                                <Text
                                    fontWeight="semibold"
                                    fontSize="1.4rem"
                                    textColor="#040206"
                                >
                                    {salesReport
                                        ? `${item.note} ${convertToIDR(item.bills)}`
                                        : `${item.note} 0`}
                                </Text>
                                <Text fontWeight="medium" textColor="#838eaf">
                                    {item.title}
                                </Text>
                            </Flex>
                        </Flex>
                    </GridItem>
                ))}
            </Grid>

        </>
    )
}