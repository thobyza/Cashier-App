import { Flex, Icon, Td, Tr } from "@chakra-ui/react"
import { useState } from "react";
import { MdStickyNote2 } from "react-icons/md";
import { TransactionModal } from "./transactionModal";

export const TransactionDataMap = ({ getItem }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

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
            <Tr>
                <Td fontWeight="semibold" textColor="#8c8c8c">{getItem.id}</Td>
                <Td>{formatDate(getItem.createdAt)}</Td>
                <Td>{getItem.Transaction_details?.length}</Td>
                <Td fontWeight="semibold" textColor="#737373">Rp {convertToIDR(getItem.total_amount)}</Td>
                <Td>{getItem.User?.fullname}</Td>
                <Td isNumeric>
                    <Flex justifyContent="space-between">
                        <Flex></Flex>
                        <Flex
                            bg="#719BF4"
                            p="0.3rem"
                            borderRadius="md"
                            _hover={{
                                bg: "#4D81F1",
                                cursor: "pointer",
                                transitionDuration: "0.4s",
                                transitionTimingFunction: "ease-in-out",
                            }}
                            onClick={openModal}
                        >
                            <Icon
                                as={MdStickyNote2}
                                fontSize="1rem"
                                textColor="white"
                            ></Icon>
                        </Flex>
                    </Flex>
                </Td>
            </Tr>
            {/* ------- Modal Rendering ------- */}
            <TransactionModal isOpen={isModalOpen} onClose={closeModal} getItem={getItem} />
        </>
    )
}