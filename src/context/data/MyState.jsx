import { useEffect, useState } from 'react'
// *1. Import Context
import MyContext from "./MyContext.jsx";
import { addDoc, collection, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/firebaseConfig.jsx';

// *3. Define Props
const MyState = (props) => {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if(mode === "light"){
      setMode(prev => "dark");
      document.style.backgroundColor = 'rgba(17, 24, 39)';
    }else {
      setMode(prev => "light");
      document.style.backgroundColor = 'white';
    }
  }

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  });

  const addProduct = async () => {
    if(products.title === null || products.price === null || products.imageUrl === null || products.category === null || products.description === null){
      return toast.error("All fields are requiref");
    }

    try {
      
      const productRef = collection(fireDB, "products");

      await addDoc(productRef, products);
      toast.success("Add Product successfully");
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [product, setProduct] = useState([]);

  const getProductData = async () => {

    setLoading(true);
    try {

      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = await onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) =>{
          productArray.push({...doc.data, id: doc.id});
        })
        setProduct(productArray)
      });

      setLoading(false);

      return () => data

      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Products Updated successfully");
      getProductData();
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (item) => {
    try {
      setloading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted Successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      setLoading(false);
    }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDb, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductData();
    getOrderData();
  }, []);


  const [user, setUser ] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const userArray = [];
      result.forEach((doc) => {
        userArray.push(doc.data());
        setLoading(false);
      });
      setUser(userArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  const [ searchKey, setSearchKey] = useState('');
  const [ filterType, setFilterType] = useState('');
  const [ filterPrice, setFilterPrice] = useState('');

  // *5. Create data that is to be shared with children
  const state = {
      name: "Kamal Nayan Upadhyay",
      rollno: 15
  }

  const colours = {
      black: "#000000",
      white: "#ffffff"
  }

  return (
    // *2. Wrap with MyContext, Use Provider to provide Context to children
    // *6. Now pass the state in value attribute
    // *4. Pass Props as children
    <MyContext.Provider value={{state, colours, mode, toggleMode, loading, setLoading, products, setProducts, product, addProduct, editHandle, updateProduct, deleteProduct, order, user, searchKey, setSearchKey, filterType, setFilterType, filterPrice, setFilterPrice }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState