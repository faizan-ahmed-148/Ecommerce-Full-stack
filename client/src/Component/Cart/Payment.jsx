import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Home/MetaData/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  // CardNumberElement,
  // CardCvcElement,
  // CardExpiryElement,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

// import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../Actions/Order";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();
  // const stripe = useStripe();
  // const elements = useElements();
  // const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.users);
  const { error } = useSelector((state) => state.newOrder);

  // const paymentData = {
  //   amount: Math.round(orderInfo.totalPrice * 100),
  // };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   payBtn.current.disabled = true;

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/api/v1/payment/process",
  //       paymentData,
  //       config
  //     );

  //     const client_secret = data.client_secret;

  //     if (!stripe || !elements) return;

  //     const result = await stripe.confirmCardPayment(client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardNumberElement),
  //         billing_details: {
  //           name: user.name,
  //           email: user.email,
  //           address: {
  //             line1: shippingInfo.address,
  //             city: shippingInfo.city,
  //             state: shippingInfo.state,
  //             postal_code: shippingInfo.pinCode,
  //             country: shippingInfo.country,
  //           },
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       payBtn.current.disabled = false;

  //       alert.error(result.error.message);
  //     } else {
  //       if (result.paymentIntent.status === "succeeded") {
  //         order.paymentInfo = {
  //           id: result.paymentIntent.id,
  //           status: result.paymentIntent.status,
  //         };

  //         dispatch(createOrder(order));

  //         navigate("/success");
  //       } else {
  //         alert.error("There's some issue while processing payment ");
  //       }
  //     }
  //   } catch (error) {
  //     payBtn.current.disabled = false;
  //     alert.error(error.response.data.message);
  //   }
  // };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    navigate("/success");
  }
  useEffect(() => {
    if (error) {
        alert.error(error)
        dispatch({ type: "CLEAR_ERROR" })
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            {/* <CardNumberElement className="paymentInput" /> */}
            <input
            type="text"
            value={`(Available soon )- CardNumberElement}`}
            // ref={payBtn}
            className="paymentInput"
            disabled="disabled"
          />
          </div>
          <div>
            <EventIcon />
            {/* <CardExpiryElement className="paymentInput" /> */}
            <input
            type="text"
            value={`(Available soon )- CardExpiryElement}`}
            // ref={payBtn}
            className="paymentInput"
            disabled="disabled"
          />
          </div>
          <div>
            <VpnKeyIcon />
            {/* <CardCvcElement className="paymentInput" /> */}
            <input
            type="text"
            value={`(Available soon )- CardCvcElement}`}
            // ref={payBtn}
            className="paymentInput"
            disabled="disabled"
          />
          </div>

          <input
            type="submit"
            value={`(Available soon )Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn"
            disabled="disabled"
          />
           <input
            type="submit"
            value={`Pay-after delivery - ₹${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn-2"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;