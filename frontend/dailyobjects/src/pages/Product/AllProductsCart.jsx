import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { useState } from "react";
import HoverImage from "react-hover-image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartData } from "../../redux/usercart/action";
import axios from "axios";
const AllProductsCart = ({
  Image1,
  Image2,
  Title,
  Brand,
  Discount_price,
  Original_price,
  _id,
}) => {
  const [wishlist, setwishlist] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const [isButLoading, setIsButLoading] = useState(false);
  const dispatch = useDispatch()
  const { cart } = useSelector((store) => store.cartReducer);
  let token = localStorage.getItem("token");

  const handleIdcheck=(Title)=>{
  	console.log("BTN clicked");
  	if(token===null){
  		toast({
  			title: "Please login first",
  			description: "",
  			status: "error",
  			duration: 2500,
  			isClosable: true,
  			position: "top",
  		});
  	   }else{
  	       fetch("https://gadgetgalaxy.cyclic.app/cart", {
  						headers: {
  							Authorization: `Bearer ${token}`,
  						},
  					})
  						.then((res) => res.json())
  						.then((res) => {
  							let datacheck = res;

  							const alreadyAdded = datacheck.filter((el) => el.Title === Title);

  							if (alreadyAdded.length >= 1) {
  								toast({
  									title: "Product Alreacy  Added In Cart",
  									description: "",
  									status: "error",
  									duration: 2500,
  									isClosable: true,
  									position: "top",
  								});
  							} else {
  								handlesumit();
  							}
  						})
  						.catch((err) => console.log(err));
  	}
       }

  const handlesumit=()=>{

  		let payload={
  			Image1: Image1,
  			Title: Title,
  			Brand: Brand,
  			Discount_price: Discount_price,
  			Quantity:1
  		}
  		fetch("https://gadgetgalaxy.cyclic.app/cart/add", {
  			method: "POST",
  			headers: {
  				Authorization: `Bearer ${token}`,
  				"Content-type": "application/json",
  			},
  			body: JSON.stringify(payload),
  		})
  			.then((res) => res.json())
  			.then((res) => {
  				setIsButLoading(true);
  				setTimeout(() => {
  					setIsButLoading(false);
  					toast({
  						title: `${res.msg}`,
  						description: "",
  						status: "success",
  						duration: 2500,
  						isClosable: true,
  						position: "top",
  					});
  				}, 2000);
  			}).catch((err) => {
  				alert(err.message);
  				console.log(err);
  			});

   }

//   const handleAddCart = () => {
//     let payload = {
//       Image1: Image1,
//       Title: Title,
//       Brand: Brand,
//       Discount_price: Discount_price,
//       Quantity: 1,
//     };
// 	addData(payload)
// 	// dispatch(addCartData(payload))
// 	// console.log(cart);

//   };

//   const addData=async(dataToAdd)=>{
// 	// fetch("https://gadget-hunt.onrender.com/cart/add",{
// 	// 	method:"POST",
// 	// 	headers:{
// 	// 		Authorization: `Bearer ${token}`,
// 	// 		"Content-Type":"application/json"
// 	// 	},
// 	// 	body:JSON.stringify(dataToAdd)
// 	// }).then((res)=> res.json()).then((res)=>{
// 	// 	console.log(res);
// 	// }).catch((err)=>{
// 	// 	console.log(err);
// 	// })
// 	let payload={
// 		Image1: Image1,
// 		Title: Title,
// 		Brand: Brand,
// 		Discount_price: Discount_price,
// 		Quantity:1
// 	}
// 	fetch("https://gadgetgalaxy.cyclic.app/cart/add", {
// 		method: "POST",
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 			"Content-type": "application/json",
// 		},
// 		body: JSON.stringify(payload),
// 	})
// 		.then((res) => res.json())
// 		.then((res) => {
// 			// setIsButLoading(true);
// 			// setTimeout(() => {
// 			// 	setIsButLoading(false);
// 			// 	toast({
// 			// 		title: `${res.msg}`,
// 			// 		description: "",
// 			// 		status: "success",
// 			// 		duration: 2500,
// 			// 		isClosable: true,
// 			// 		position: "top",
// 			// 	});
// 			// }, 2000);
// 			console.log(res);
// 		})
// 		.catch((err) => {
// 			alert(err.message);
// 			console.log(err);
// 		});
//   }
  return (
    <>
      <Box>
        <Flex alignItems="center" justifyContent="center">
          <Box
            backgroundColor={"#fafafa"}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
            // h={{lg:"573px",md:"400px",sm:"350px"}}
          >
            {wishlist ? (
              <Image
                src="https://icon-library.com/images/wishlist-icon/wishlist-icon-19.jpg"
                size="10px"
                position="absolute"
                top={2}
                right={2}
                w="10%"
                onClick={() => setwishlist(!wishlist)}
              />
            ) : (
              <Image
                src="https://pngimg.com/d/heart_PNG51349.png"
                size="10px"
                position="absolute"
                top={2}
                right={2}
                w="9%"
                onClick={() => setwishlist(!wishlist)}
              />
            )}

            <HoverImage
              src={Image1}
              hoverSrc={Image2}
              alt={`Picture of `}
              roundedTop="xl"
              onClick={() => navigate(`/productdetails/${_id}`)}
            />

            <Box backgroundColor={"white"} p="6">
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                ></Box>
              </Flex>
              <Text
                h="80px"
                fontSize={{ md: "10px", lg: "15px" }}
                textAlign={"center"}
              >
                {Title}
              </Text>
              <Flex mt="1px" justifyContent={"space-evenly"}>
                <Text fontSize={{ md: "17px", lg: "15px" }} fontWeight={"bold"}>
                  Rs.{Discount_price}
                </Text>
                <Box color={"gray.800"}>
                  <Text
                    fontSize={{ md: "17px", lg: "15px" }}
                    color={"rgb(164, 161, 161)"}
                    fontWeight={"bold"}
                  >
                    <s>{Original_price}</s>
                  </Text>
                </Box>
              </Flex>
              <Flex mt="5%">
                <Button
                  bg="#20a87e"
                  color={"white"}
                  w="85%"
                  m="auto"
                  colorScheme="green"
                  onClick={()=> handleIdcheck(Title)}
                >
                  {!isButLoading && `ADD TO CART`}
                  {isButLoading && (
                    <Spinner
                      thickness="2px"
                      speed="0.50s"
                      emptyColor="gray.200"
                      color="black"
                      size="md"
                    />
                  )}

                  <Image
                    ml="5%"
                    src="https://images.dailyobjects.com/marche/icons/Bag.png?tr=cm-pad_resize,v-2,w-16,h-16,dpr-1"
                  />
                </Button>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AllProductsCart;
