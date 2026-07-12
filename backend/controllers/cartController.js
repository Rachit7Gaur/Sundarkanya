import Cart from "../models/Cart.js";

export const addToCart = async(req,res)=>{
  try{
    const {productId , quantity} = req.body;

    //check kr rhe hai ki cart hai ya nahi koi phle se us user ka
    let cart = await Cart.findOne({user : req.user.id});

    //agar cart nahi h koi toh new cart create kr denge empty item ke saath
    if(!cart){
      cart = new Cart({user: req.user.id, items: []})
    }

    //check kr rhe h vo prodcut phle se toh add nhi h cart mein
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if(itemIndex > -1){
      cart.items[itemIndex].quantity += quantity;
    }else{
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();
    res.json({
      message: "Item added to cart",
      cart
    })
  }catch(error){
    res.status(500).json({
      message: "Server Error",
      error : error.message
    })
  }
}

export const getCart = async(req,res)=>{
  try{
    const cart = await Cart.findOne({user : req.user.id}).populate("items.product");

    if(!cart){
      return res.json({
        item:[]
      });
    }

    res.json(cart);
  }catch(error){
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
}

export const removeFromCart = async(req,res)=>{
  try{
    const {productId} = req.params;

    const cart = await Cart.findOne({user : req.user.id});

    if(!cart){
      return res.status(404).json({
        message : "Cart not found"
      });
    }

    cart.items = cart.items.filter(item => item.product.toString() != productId);

    await cart.save();
    res.json({ message: "Item removed", cart });
  }catch(error){
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
}

export const clearCart = async(req,res)=>{
  try{
    const cart = await Cart.findOne({user : req.user.id});

    if(!cart){
      return res.status(404).json({
        message : "Cart not found"
      });
    };

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared", cart });
  }catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
}

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated",
      cart
    });

  } catch(error) {

    res.status(500).json({
      message:"Server error",
      error:error.message
    });

  }
};