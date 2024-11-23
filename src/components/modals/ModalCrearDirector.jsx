import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalCreateDirector
} from "../../actions/events";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { crearLider, crearDirector } from "../../actions/apis";
import {
  consutarLideres,
  consutarLideresSinProyecto,
} from "../../actions/apis";

export const ModalCrearDirector = () => {
  const dispatch = useDispatch();
  const initiEvent = {
    email: "",
    password: "",
    name: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { email, password, name } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const { modalLeader, createDirectors } = useSelector((state) => state);
  function handleCerrar() {
    dispatch(modalCreateDirector(false));
  }

  async function handleAceptar() {
    if ((email == "" || password == "" ||  name == "")) {
      Swal.fire("Error", "Ingrese los campos correctamente", "error");
    } else {
      let director = {
        data: {
          user: {
            email: email,
            password: password,
            name: name,
          },
        },
      };
      await dispatch(crearDirector(director));
      dispatch(modalCreateDirector(false));

      //Swal.fire("Listo", "Se han realizado los cambios", "success");
    }
  }

  return (
    <Modal
      className="modalCreateLeaders"
      isOpen={createDirectors}
      style={{ marginTop: "15%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">
              Crear un nuevo Director <AiOutlineUserAdd size={25} />
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "42px" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <BiRename
              style={{
                color: "#5254b1",
                marginLeft: "140%",
                marginTop: "55%",
              }}
              size={35}
            />
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="name"
              value={name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Ingresa el nombre de director"
              style={{
                marginTop: "2rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <MdOutlineEmail
              style={{
                color: "#5254b1",
                marginLeft: "140%",
                marginTop: "45%",
              }}
              size={35}
            />
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="email"
              value={email}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Ingresa correo del director"
              style={{
                marginTop: "2rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <RiLockPasswordLine
              style={{
                color: "#5254b1",
                marginLeft: "140%",
                marginTop: "20%",
              }}
              size={35}
            />
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="contraseña para cuenta de director"
              style={{
                marginTop: "1rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
        </div>
      </FormGroup>
      <div className="d-flex justify-content-center">
        <button
          className="btn"
          style={{
            background: "#5254b1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={handleAceptar}
        >
          Crear un nuevo director{" "}
        </button>
      </div>
    </Modal>
  );
};
