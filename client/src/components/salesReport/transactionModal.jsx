import { Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { PiForkKnifeFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";


export const TransactionModal = ({ isOpen, onClose, getItem }) => {

    // convert date format
    function formatDate(inputDate) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const dateObj = new Date(inputDate);
        // Adjusting for the time zone offset
        const utcDateObj = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);

        const day = utcDateObj.getDate();
        const month = months[utcDateObj.getMonth()];
        const year = utcDateObj.getFullYear();
        const hours = String(utcDateObj.getHours()).padStart(2, '0');
        const minutes = String(utcDateObj.getMinutes()).padStart(2, '0');

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius="lg">
                    <ModalHeader bg="black" textColor="white">
                        Transaction Detail
                    </ModalHeader>
                    <ModalCloseButton textColor="white" pt="0.8rem" />
                    {/*  */}
                    <ModalBody>
                        <Flex flexDirection="column" gap="2rem" py="1rem" w="full">
                            <Flex flexDirection="row" gap="1rem">
                                <Flex bg="#E7F6FD" p="0.8rem" borderRadius="xl">
                                    <Icon
                                        as={PiForkKnifeFill}
                                        textColor="#22ABE8"
                                        h="2.2rem"
                                        w="2.2rem"
                                    ></Icon>
                                </Flex>
                                <Flex flexDirection="column" justifyContent="space-around">
                                    <Text fontWeight="semibold">ID: #{getItem?.id}</Text>
                                    <Text fontWeight="medium" textColor="#8c8c8c">
                                        {formatDate(getItem?.createdAt)}
                                    </Text>
                                </Flex>
                                <Flex justifyContent="end" flexGrow="1" alignItems="end">
                                    <Flex></Flex>
                                    <Flex gap="0.3rem">
                                        <Text fontWeight="semibold" textColor="#404040">
                                            Rp
                                        </Text>
                                        <Text fontWeight="bold" fontSize="1.5rem">
                                            {" "}
                                            {convertToIDR(getItem?.total_amount)}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            {/* Order Map */}
                            <Flex flexDirection="column">
                                <Text fontSize="1.2rem" fontWeight="semibold">
                                    Order
                                </Text>
                                <Flex
                                    flexDirection="column"
                                    gap="0.4rem"
                                    mt="0.8rem"
                                    borderY="1px"
                                    borderColor="gray.400"
                                    borderStyle="dashed"
                                    pt="0.8rem"
                                    pb="1rem"
                                >
                                    {getItem.Transaction_details?.map((item) => (
                                        <Flex gap="1rem" justifyContent="space-between">
                                            <Text fontWeight="medium" textColor="#8c8c8c">
                                                {item.Product?.name}
                                            </Text>
                                            <Text
                                                textColor="#8c8c8c"
                                                fontWeight="medium"
                                                flexGrow="1"
                                            >
                                                x{item.quantity}
                                            </Text>
                                            <Text textColor="#8c8c8c">
                                                {convertToIDR(item.subTotal)}
                                            </Text>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Flex>
                            {/* Bottom */}
                            <Flex justifyContent="space-between">
                                {/* status */}
                                <Flex alignItems="center" gap="0.7rem">
                                    <Flex bg="#d5f6e7" borderRadius="lg" p="0.4rem" border="2px" borderColor="#3DB26E" h="max-content">
                                        <Icon as={FaCheck} textColor="#3DB26E" h="1.2rem" w="1.2rem"></Icon>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <Text fontSize="0.85rem" fontWeight="medium">Status</Text>
                                        <Text fontSize="0.85rem">Completed</Text>
                                    </Flex>
                                </Flex>
                                {/* cashier */}
                                <Flex alignItems="center" gap="0.8rem">
                                    <Flex bg="#F0F0F3" borderRadius="lg" p="0.4rem" border="2px" borderColor="#bfbfbf" h="max-content">
                                        <Icon as={FiUser} textColor="	 #a6a6a6" h="1.2rem" w="1.2rem"></Icon>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <Text fontSize="0.85rem" fontWeight="medium">Cashier</Text>
                                        <Text fontSize="0.85rem">{getItem.User.fullname}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    {/*  */}
                    {/* <ModalFooter>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}