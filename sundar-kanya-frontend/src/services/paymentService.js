import api from "./api";

// Create Razorpay order



export const createPaymentOrder = async(data)=>{

const res = await api.post(
"/payments/create-order",
data
);

return res.data;

};



export const verifyPayment = async(data)=>{

const res = await api.post(
"/payments/verify",
data
);


return res.data;

};