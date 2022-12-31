import Header from "../components/header";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const navigate=useNavigate()
  const [studentNo, setStudentNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const handleSave=(event)=>{
    event.preventDefault()
    //validation
    if(studentNo==="" || name ==="" || surname==="" || studentClass==="" || schoolName===""){
        return(
            alert("boş kaldı abi")
        )
    }
    const newStudent={
        id:String(new Date().getTime()),
        name:name,
        surname:surname,
        studentNo:studentNo,
        studentClass:studentClass,
        schoolName:schoolName
    }
    axios.post("http://localhost:3004/students",newStudent)
    .then(res=>{
      navigate("/")  
    })
    .catch(error=>{
      console.log(error);
      alert("kayıt işleminde hata oluştu.")
    })
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label htmlFor="studentNo" className="form-label">
              Öğrenci Numarası
            </label>
            <input
              type="number"
              className="form-control"
              id="studentNo"
              placeholder="Ör:100"
              value={studentNo}
              onChange={(event) => setStudentNo(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Öğrenci Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Ör:Ahmet"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Öğrenci Soyadı
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Ör:Kılıç"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">
              Öğrenci Sınıfı
            </label>
            <input
              type="text"
              className="form-control"
              id="studentClass"
              placeholder="Ör:7/B"
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              Okul Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              placeholder="Ör:Fatih İ.Ö.O"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-outline-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
