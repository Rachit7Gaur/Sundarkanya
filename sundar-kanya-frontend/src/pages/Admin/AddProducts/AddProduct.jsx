import { useState , useRef } from "react";
import toast from "react-hot-toast";

import "./AddProduct.css";

import { createProduct } from "../../../services/productService";


const AddProduct = () => {


const [loading,setLoading] = useState(false);


const [product,setProduct] = useState({

name:"",
description:"",
price:"",
stock:"",
category:"",
images:[]

});

const [previews, setPreviews] = useState([]);

const fileInputRef = useRef(null);


const handleChange=(e)=>{

setProduct({

...product,

[e.target.name]:e.target.value

});

};

const handleImages = (e) => {

  const files = Array.from(e.target.files);

  setProduct({
    ...product,
    images: files,
  });

  const previewUrls = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviews(previewUrls);

};

const handleSubmit=async(e)=>{

e.preventDefault();

if(product.images.length === 0){
  toast.error("Please select at least one image");
  return;
}

try{

setLoading(true);



const formData = new FormData();

formData.append("name", product.name);
formData.append("description", product.description);
formData.append("price", product.price);
formData.append("stock", product.stock);
formData.append("category", product.category);

product.images.forEach((file) => {
  formData.append("images", file);
});

await createProduct(formData);



toast.success(
"Product added successfully"
);



setProduct({

name:"",
description:"",
price:"",
stock:"",
category:"",
images:[]

});

setPreviews([]);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}


}catch(error){

console.log(error);

toast.error(
error.response?.data?.message ||
"Failed to add product"
);


}finally{

setLoading(false);

}


};



return (

<div className="add-product-page">


<div className="add-product-card">


<h1>
Add Product
</h1>



<form onSubmit={handleSubmit}>


<input

name="name"

placeholder="Product Name"

value={product.name}

onChange={handleChange}

required

/>



<textarea

name="description"

placeholder="Description"

value={product.description}

onChange={handleChange}

/>



<input

type="number"

name="price"

placeholder="Price"

value={product.price}

onChange={handleChange}

required

/>



<input

type="number"

name="stock"

placeholder="Stock"

value={product.stock}

onChange={handleChange}

/>



<select

name="category"

value={product.category}

onChange={handleChange}

required

>


<option value="">
Select Category
</option>


<option value="earrings">
Earrings
</option>


<option value="pendant">
Pendant
</option>


<option value="bracelet">
Bracelet
</option>


</select>




<input
  ref={fileInputRef}
  type="file"
  multiple
  accept="image/*"
  onChange={handleImages}
/>

<div className="image-preview">

  {previews.map((img, index) => (

    <img
      key={index}
      src={img}
      alt="preview"
    />

  ))}

</div>



<button disabled={loading}>


{
loading
?
"Adding..."
:
"Add Product"
}


</button>



</form>


</div>


</div>

);


};


export default AddProduct;