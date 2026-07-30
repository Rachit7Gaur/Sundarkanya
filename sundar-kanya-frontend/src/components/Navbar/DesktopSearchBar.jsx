import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import "./desktop-search.css";

import { searchProducts } from "../../services/productService";

function DesktopSearchBar() {

    const navigate = useNavigate();

    const searchRef = useRef(null);

    const [search, setSearch] = useState("");

    const [results, setResults] = useState([]);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        },300);

        return () => clearTimeout(timer);

    },[search]);

    useEffect(() => {

        const fetchProducts = async () => {

            if(!debouncedSearch.trim()){

                setResults([]);

                return;

            }

            try{

                const data = await searchProducts(debouncedSearch);

                setResults(data);

            }

            catch(error){

                console.log(error);

            }

        };

        fetchProducts();

    },[debouncedSearch]);

    useEffect(() => {

        const handleClickOutside = (e) => {

            if(searchRef.current && !searchRef.current.contains(e.target)){

                setResults([]);

                setSelectedIndex(-1);

            }

        };

        document.addEventListener("mousedown",handleClickOutside);

        return () => document.removeEventListener("mousedown",handleClickOutside);

    },[]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!search.trim()) return;

        navigate(`/products?search=${encodeURIComponent(search)}`);

    };

    const handleKeyDown = (e) => {

        if(!results.length) return;

        if(e.key==="ArrowDown"){

            e.preventDefault();

            setSelectedIndex(prev=>prev<results.length-1 ? prev+1 : 0);

        }

        if(e.key==="ArrowUp"){

            e.preventDefault();

            setSelectedIndex(prev=>prev>0 ? prev-1 : results.length-1);

        }

        if(e.key==="Enter" && selectedIndex>=0){

            e.preventDefault();

            navigate(`/products/${results[selectedIndex]._id}`);

            setSearch("");

            setResults([]);

        }

        if(e.key==="Escape"){

            setResults([]);

        }

    };

    return(

        <div
            className="desktop-search-wrapper"
            ref={searchRef}
        >

            <form

                className="desktop-search-form"

                onSubmit={handleSubmit}

            >

                <FiSearch className="desktop-search-icon"/>

                <input

                    type="text"

                    placeholder="Search jewellery..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    onKeyDown={handleKeyDown}

                />

            </form>

            {search.trim() && (

                <div className="desktop-search-dropdown">

                    {

                        results.length>0 ?

                        results.map((product,index)=>(

                            <div

                                key={product._id}

                                className={`desktop-search-item ${selectedIndex===index ? "active" : ""}`}

                                onClick={()=>{

                                    navigate(`/products/${product._id}`);

                                    setSearch("");

                                    setResults([]);

                                }}

                            >

                                <img

                                    src={product.images[0]}

                                    alt={product.name}

                                />

                                <div className="desktop-search-info">

                                    <h4>{product.name}</h4>

                                    <p>₹{product.price}</p>

                                </div>

                            </div>

                        ))

                        :

                        <div className="desktop-no-result">

                            No products found 😔

                        </div>

                    }

                </div>

            )}

        </div>

    );

}

export default DesktopSearchBar;