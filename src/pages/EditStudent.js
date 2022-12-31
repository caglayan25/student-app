import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { studentId } = useParams();
  const [willEditStudent, setWillEditStudent] = useState(null);
  const navigate = useNavigate();
  const [studentNo, setStudentNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    axios
      .get(` http://localhost:3004/students/${studentId}`)
      .then((res) => {
        console.log(res.data);
        setWillEditStudent(res.data);
        setStudentNo(res.data.studentNo);
        setName(res.data.name);
        setSurname(res.data.surname);
        setStudentClass(res.data.studentClass);
        setSchoolName(res.data.schoolName);
      })
      .catch((err) => {
        console.log(err);
        alert("İlgili öğrenci bilgilerini çekerken hata oldu.");
        navigate("/");
      });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    //validation
    if (
      studentNo === "" ||
      name === "" ||
      surname === "" ||
      studentClass === "" ||
      schoolName === ""
    ) {
      alert("boş kaldı abi");
      return;
    }
    const updatedStudent = {
      id: willEditStudent.id,
      name: name,
      surname: surname,
      studentClass: studentClass,
      schoolName: schoolName,
      studentNo: studentNo
    }
    axios.put(`http://localhost:3004/students/${willEditStudent.id}`, updatedStudent)
    .then(res=>{
        console.log(res)
        navigate("/")
    })
    .catch(err=>{
        console.log(err)
        alert("hata oldu")
    })
  };
  if (willEditStudent === null) {
    return null;
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleEdit}>
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
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
