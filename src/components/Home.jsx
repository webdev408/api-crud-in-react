import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Home = () => {
	const [vegetables, setVegetables] = useState([])
	const [render, setRender] = useState(false)
	const [input, setInput] = useState({
		name: "",
    image: "",
    price: ""
		})
		const navigate = useNavigate()

	useEffect(() => {
    try {
			const getData = async () => {
				const response = await axios.get('http://localhost:3000/products')
        setVegetables(response.data)
      }
			getData()
		} catch (error) {
			console.log(error)
		}
  }, [render]);

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('http://localhost:3000/products', input)
			setRender(true)
      setInput({
        name:"",
				image:"",
        price:""
      })
		} catch (error) {
			console.log(error)
		}
  }

	const handleEdit = async (e) => {
		e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/products/${e.target.id}`, input)
      setRender(true)
      setInput({
        name:"",
        image:"",
        price:""
      })
    } catch (error) {
      console.log(error)
    }
  }

	const handleDelete = async (id) => {
		try {
      await axios.delete(`http://localhost:3000/products/${id}`)
			const newVegetable = vegetables.filter((v) => v.id!== id)
			setVegetables(newVegetable)
			navigate('/edit/:id')
    } catch (error) {
      console.log(error)
    }
  }

	return (
    <div className="container">
      <h1 className="my-4 text-center">Fresh Vegetables on Sale</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary form-control">
          Submit
        </button>
      </form>
      <hr />
      <table className="table table-stripped">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((vegetable) => (
            <tr key={vegetable.id}>
              <td>{vegetable.id}</td>
              <td>{vegetable.name}</td>
              <td><img src={vegetable.image} alt={vegetable.name} /></td>
              <td>{vegetable.price}</td>
              <td>
                <Link className="btn btn-warning" to={`/edit/${vegetable.id}`}
								onClick={()=>handleEdit(vegetable.id)}>Edit</Link>
                <Link className="btn btn-danger ms-2" to={`/delete/${vegetable.id}`}
								onClick={()=>handleDelete(vegetable.id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;