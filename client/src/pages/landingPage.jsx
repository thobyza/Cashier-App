import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react"
import WithSubnavigation from "../components/navbarLanding"
import banner1 from "../assets/landingPage/bannerr.png"

export const LandingPage = () => {
    return (
        <Box bg="#2C2939">
            <WithSubnavigation />
            <Stack px="10rem" h="100vh">
                <Flex mt="4rem">
                    {/* Banner section */}
                    <Flex mt="6vh">
                        <Flex flex="1" flexDirection="column" justifyContent="space-between" py="1.2rem">
                            <Flex>
                                <Text fontSize="4.2rem" fontWeight="semibold" textColor="white" lineHeight="5rem">
                                    A Point of Sale You Can{" "}
                                    <Text as="span" bgGradient='linear(to-r, #98C5E5, #4C87ED)'
                                        bgClip='text'>
                                        Depend On
                                    </Text>
                                </Text>
                            </Flex>
                            <Flex>
                                <Text textColor="white" w="80%">
                                    TASmart is the most comprehensive, integrated Point of Sales (POS) systems that offers a wide range of options to meet all your business needs. Set it up in minutes, start selling in seconds.
                                </Text>
                            </Flex>
                            {/* Button Group */}
                            <Flex gap="1.2rem">
                                <Button
                                    as={"a"}
                                    display={{ base: "none", md: "inline-flex" }}
                                    fontSize="1rem"
                                    fontWeight="medium"
                                    bgGradient='linear(to-r, #98C5E5, #4C87ED)'
                                    href={"#"}
                                    borderRadius="full"
                                    py="1.4rem"
                                    px="1.8rem"
                                    sx={{
                                        transition: "ease-out 0.5s",
                                        boxShadow: "inset 0 0 0 0 #ffff"

                                    }}
                                    _hover={{
                                        bg: "transparent",
                                        cursor: "pointer",
                                        boxShadow: "inset 0 -100px 0 0 #98C5E5",
                                        textColor: "#2C2939"
                                    }}
                                    _active={{
                                        transform: "scale(0.9)"
                                    }}
                                >
                                    BOOK A DEMO
                                </Button>
                                <Button
                                    as={"a"}
                                    display={{ base: "none", md: "inline-flex" }}
                                    fontSize="1rem"
                                    fontWeight="medium"
                                    bg="transparent"
                                    textColor="white"
                                    borderRadius="full"
                                    border="1px"
                                    borderColor="white"
                                    py="1.4rem"
                                    px="1.8rem"
                                    sx={{
                                        transition: "ease-out 0.5s",
                                        boxShadow: "inset 0 0 0 0 #ffff"

                                    }}
                                    _hover={{
                                        cursor: "pointer",
                                        boxShadow: "inset 0 -100px 0 0 #ffff",
                                        textColor: "#2C2939"
                                    }}
                                    _active={{
                                        transform: "scale(0.9)"
                                    }}
                                >
                                    GET IN CONTACT
                                </Button>
                            </Flex>
                        </Flex>
                        {/* Banner */}
                        <Flex justifyContent="space-between">
                            <Image
                                src={banner1}
                                h="25rem"
                                w="max-content"
                                objectFit="cover"
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </Stack>
        </Box >
    );
}