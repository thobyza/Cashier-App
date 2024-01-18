import React, { useState } from "react";
import {
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCart, updateQuantity } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import avaDummy from "../assets/ava-dummy.png"

export const BillsBar = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartItems = cart?.items ?? [];
  const [payment, setPayment] = useState();
  const [change, setChange] = useState(0);

  const user = useSelector((state) => state.user.value);
  console.log(user);
  console.log(cartItems);
  const profilePicture = user.profile_picture;

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePaymentChange = (event) => {
    const value = parseFloat(event.target.value);
    setPayment(value);
    calculateChange(value);
  };

  const calculateChange = (cashValue) => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const changeValue = cashValue - totalAmount;
    setChange(changeValue >= 0 ? changeValue : 0);
  };

  const handleCheckout = async () => {
    let totalPrice;
    try {
      totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const data = {
        total_amount: totalPrice,
        customer_amount: payment,
        change: change,
        cartItems: cartItems,
      };

      console.log(data);
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:2000/transactions", data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      // success toast
      toast.success('Transaction Success!', {
        position: toast.POSITION.TOP_CENTER,
        // onClose: onClose, // Close modal on toast close
        autoClose: 3000
      });
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

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
    <Flex
      flexDirection="column"
      pos={{ base: "none", lg: "fixed" }}
      pl="1.4rem"
      pr="1rem"
      py="7"
      gap="0.5rem"
      bg="white"
      borderLeft="1px"
      borderLeftColor="#E2E8F0"
    >
      <Flex flexDirection={"column"} w="19vw">
        {/* User Info */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="full"
          bg="#E7EEFD9E"
          borderRadius="lg"
          py="0.5rem"
          px="0.7rem"
          gap={5}
        >
          {/* avaDummy */}
          <Image
            src={
              user.profile_picture
                ? `http://localhost:2000/${profilePicture}`
                : avaDummy
            }
            h="3rem"
            w="3rem"
            rounded="lg"
          ></Image>
          <Flex
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Text color="#717171" fontSize="0.9rem">
              {user.role}
            </Text>
            <Text fontWeight="semibold">{user.fullname}</Text>
          </Flex>
          <Flex flexGrow="1" justifyContent="end">
            <Flex bg="#4D81F1" borderRadius="lg" alignItems="center">
              <Menu>
                <MenuButton>
                  <Flex>
                    <Icon
                      as={CiSettings}
                      h="3rem"
                      w="3rem"
                      p="0.4rem"
                      textColor="#f0f0f0"
                      rounded="lg"
                    />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <Link to="/profile">
                    <MenuItem>Your Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Bills */}
      <Text fontSize="1.3rem" fontWeight="semibold" mt="0.8rem">
        Bills
      </Text>
      {/* Product map */}
      <Flex
        flexDirection="column"
        gap="4"
        overflowY="auto"
        // flexWrap="nowrap"
        pr="0.7rem"
        h="53vh"
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
            bg: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            bg: "#bfbfbf",
          },
        }}
      >
        {cartItems.map((item) => (
          <Flex
            key={item.id}
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Flex alignItems="center">
              <Image
                src={`http://localhost:2000/${item.img}`}
                h="4.4rem"
                w="4rem"
                objectFit="cover"
                borderRadius="xl"
              ></Image>
            </Flex>
            <Flex
              flexDirection="column"
              flexGrow="1"
              ml="4"
              justifyContent="space-between"
              py="0.2rem"
              gap="0.2rem"
            >
              <Text fontWeight="semibold" fontSize="0.9rem">
                {item.name}
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex>
                  <Text
                    mr="1"
                    fontWeight="medium"
                    textColor="#8A8A89"
                    fontSize="0.9rem"
                  >
                    {convertToIDR(item.price)}
                  </Text>
                  <Text fontWeight="medium" fontSize="0.9rem" textColor="gray.600" ml="0.2rem">
                    x {item.quantity}
                  </Text>
                </Flex>
                <Text fontWeight="medium" textColor="#8A8A89" fontSize="0.9rem">
                  Rp {convertToIDR(`${item.price * item.quantity}`)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Flex gap="0.4rem">
                  {/* Button - */}
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    w="1.8rem"
                    h="1.8rem"
                    borderRadius="md"
                    bg="#F2F2F2"
                    textColor="#808080"
                    fontSize="1.5rem"
                    fontWeight="light"
                    _hover={{
                      cursor: "pointer",
                      bg: "#e6e6e6",
                    }}
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Text textAlign="center">-</Text>
                  </Flex>
                  {/* Button + */}
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    w="1.8rem"
                    h="1.8rem"
                    borderRadius="md"
                    bg="#F2F2F2"
                    textColor="#808080"
                    fontSize="1.5rem"
                    fontWeight="light"
                    _hover={{
                      cursor: "pointer",
                      bg: "#e6e6e6",
                    }}
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Text textAlign="center">+</Text>
                  </Flex>
                </Flex>
                {/* Remove button */}
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  px="0.4rem"
                  h="1.8rem"
                  borderRadius="md"
                  bg="#fbe9e9"
                  textColor="#808080"
                  fontSize="1.5rem"
                  fontWeight="light"
                  _hover={{
                    cursor: "pointer",
                    bg: "#f8d3d3",
                  }}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <Text
                    textAlign="center"
                    fontSize="0.9rem"
                    fontWeight="medium"
                    textColor="#ed9191"
                  >
                    Remove
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {/* Total & Checkout*/}
      <Flex
        flexDirection="column"
        flexGrow="1"
        mt="1rem"
        gap="2"
        borderTop="1px"
        borderTopStyle="dashed"
        borderTopColor="#b3b3b3"
        pt="3"
      >
        {/* Amount */}
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">Total</Text>
          <Text fontWeight="semibold">
            Rp{" "}
            {convertToIDR(
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
            )}
          </Text>
        </Flex>
        {/* Cash */}
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold" fontSize="0.9rem" textColor="#595959">
            Cash
          </Text>
          <input
            type="number"
            value={payment}
            onChange={handlePaymentChange}
            style={{
              fontWeight: "semibold",
              width: "4rem",
              textAlign: "right",
              fontSize: "0.9rem",
              textColor: "#595959",
            }}
          />
        </Flex>
        {/* Change */}
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="0.9rem" textColor="#595959">
            Change
          </Text>
          <Text fontWeight="semibold" fontSize="0.9rem" textColor="#595959">
            Rp {convertToIDR(change)}
          </Text>
        </Flex>
        <Button
          bg="#4D81F1"
          w="full"
          mt={2}
          textColor="white"
          fontSize="0.9rem"
          onClick={handleCheckout} // Add this onClick handler
          _hover={{
            bg: "#4675DB",
          }}
        >
          Checkout
        </Button>
      </Flex>
    </Flex>
  );
};
