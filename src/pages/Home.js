import axios from "axios";
import React,{useEffect, useState} from "react";
import Header from "../components/header";
import ListStudents from "../components/ListStudents";
import { useNavigate } from "react-router-dom";


const Home =()=>{
    const navigate=useNavigate()
    const [students,setStudents]=useState(null)
    useEffect(()=>{
        axios.get("http://localhost:3004/students")
        .then((response)=>{
            setStudents(response.data)
        })
        .catch((error)=>{});
    },[])

        if(students===null){
            return null
        }

    return(
        <div>
            
                <Header/>
                <div className="container mt-5 justify-content-end d-flex">
                    <button onClick={()=>navigate("/add-student")
                    }
                         className="btn btn-primary">Yeni Öğrenci Ekle</button>
                </div>
                <ListStudents students={students} setStudents={setStudents} />      
        </div>
    )
}

export default Home