import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		name: "",
    image: "",
    price: ""
		})

	useEffect(() => {
		const getSingleRecord = async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setInput(response.data);
    };
    getSingleRecord();
	}, [id]);

	const handleEditData = async (e) => {
		e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${id}`,
        input
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

	return (
		<div className="container">
		<h1 className="my-4 text-center">Update Records</h1>
		<form onSubmit={handleEditData}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
						value = {input.name}
						onChange = {(e) => setInput({...input, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Photo</label>
          <input
            type="text"
            className="form-control"
            name="image"
						value = {input.image}
            placeholder="Enter a photo"
						onChange = {(e) => setInput({...input, image: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control mb-3"
            name="price"
            placeholder="Enter a price"
						value = {input.price}
						onChange = {(e) => setInput({...input, price: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Update
        </button>
        <button type="submit" className="btn btn-info" onClick={()=>navigate("/")}>
          Go Back home
        </button>
      </form>
		</div>
	)
}
export default Edit;