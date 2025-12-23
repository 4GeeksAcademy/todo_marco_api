

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import React, { useState, useEffect } from "react";
//create your first component




const Home = () => {
	const API_URL = "https://playground.4geeks.com/todo";
	const USER = "marcocebrian";


	const [inputValue, setInputValue] = useState("")
	const [lista, setLista] = useState([])
	const [showAlert, setshowAlert]= useState(false)




	const obtenerTareas = async () => {

		const response = await fetch(`${API_URL}/users/${USER}`)
		console.log(response);

		if (!response.ok) {
			console.log("debo crear el usuario");
			crearUsuario()
			return
		}

		const data = await response.json();
		console.log(data);
		setLista(data.todos);






	}

	const crearUsuario = async () => {
		const response = await fetch(`${API_URL}/users/${USER}`, {
			method: "POST"
		});
		obtenerTareas();




		console.log(response);

		if (!response.ok) {
			console.log("debo crear el usuario");

		}
		const data = await response.json()
		console.log(data);

	}





	useEffect(() => {
		obtenerTareas()
	}, [])





	const handleBundle = async () => {
		if (inputValue.trim() === "") {
			setshowAlert(true)
			return ;

		}

		const nuevaTarea = {
			label: inputValue,
			is_done: false
		};

		const response = await fetch(`${API_URL}/todos/${USER}`, {
			method: "POST",
			body: JSON.stringify(nuevaTarea),
			headers : { "Content-Type" : "application/json"}
		});
		if (response.ok){
			setInputValue("");
			obtenerTareas();

		}
		else {
			console.error("La API no quiso guardar la tarea")
		}


		setLista([...lista, "-Tarea : " + inputValue])
		setInputValue("");







	}

	const eliminarTarea = async (id)=>{
		const response = await fetch(`${API_URL}/todos/${id}`, {
			method: "DELETE"
		});
		if (response.ok) {
			obtenerTareas();
			
		}
		else{
			console.log("No se pudo eliminar la tarea");
			
		}
		
		console.log(response);
		
	}





	return (
		<div className="Container-list">


			<h1 className="Titulo text-center ">Cosas por hacer </h1>
			{showAlert && (
				<div className="alert alert-warning" role="alert">
					Todos los campos son obligatorios
				</div>
			)}
			<div className="text-center">
				<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
				<ul>
					{lista.map((tarea, index) => (
						<li
							key={tarea.id} className="list-item">
							<span>
								{index + 1}  :  {tarea.label}
							</span>
							<button onClick={() => eliminarTarea(tarea.id) }>
								❌


							</button>



						</li>
					)
					)}
				</ul>
				<button className="button-añadir" type="button" onClick={handleBundle}>Añadir</button>
			</div>








		</div>
	);
};

export default Home;