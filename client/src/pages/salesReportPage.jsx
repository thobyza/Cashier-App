import { Flex, Image, Text } from "@chakra-ui/react"
import SimpleSidebar from "../components/sidebarLeft"
import avaDummy from "../assets/ava-dummy.png";

import { TransactionHistory } from "../components/salesReport/transactionHistory";
import { InsightReport } from "../components/salesReport/insightReport";
import { ChartReport } from "../components/salesReport/chartReport";

export const SalesReportPage = () => {

    return (
        <>
            <SimpleSidebar />
            <Flex w="full" >
                <Flex
                    bg="#F6FAFEFF"
                    w="full"
                    flexDirection="column"
                    pl={{ base: "3", md: "13vw", lg: "14vw" }}
                    pr={{ base: "3", md: "4vw", lg: "10vw" }}
                    py="7"
                    gap="1rem"
                >
                    {/* Page Title & User Info */}
                    <Flex justifyContent="space-between" alignItems="center" w="full">
                        <Text
                            fontSize={{ base: "1.3rem", md: "1.6rem", lg: "1.8rem" }}
                            fontWeight="bold"
                            textColor="#1C2537"
                        >
                            Sales Report
                        </Text>
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            gap="0.4rem"
                            bg="white"
                            pl="1rem"
                            pr="1.8rem"
                            py="0.6rem"
                            borderRadius="lg"
                        >
                            <Flex>
                                <Image
                                    src={avaDummy}
                                    h="2.4rem"
                                    w="2.4rem"
                                    rounded="lg"
                                ></Image>
                            </Flex>
                            <Flex
                                flexDirection="column"
                                justifyContent="start"
                                alignItems="start"
                                flexGrow="1"
                                ml={{ md: "0.5rem", lg: "1.4rem" }}
                            >
                                <Text fontSize="0.9rem" color="#717171">
                                    I'm Admin
                                </Text>
                                <Text fontSize="0.9rem" fontWeight="semibold">
                                    John Doe
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* Insight Report */}
                    <InsightReport />
                    {/* Chart Report */}
                    <ChartReport />
                    {/* Table Transaction History */}
                    <TransactionHistory />
                </Flex>
            </Flex>
        </>
    );
}