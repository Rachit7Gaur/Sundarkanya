import {Link} from "react-router-dom";
import "./AdminDashboard.css";


const AdminDashboard =()=>{


return(

<div className="admin-dashboard">


<h1>
Admin Dashboard
</h1>


<div className="admin-cards">


<Link to="/admin/products">

Manage Products

</Link>


<Link to="/admin/products/add">

Add Product

</Link>


<Link to="/admin/orders">

Manage Orders

</Link>


</div>


</div>

)

}


export default AdminDashboard;