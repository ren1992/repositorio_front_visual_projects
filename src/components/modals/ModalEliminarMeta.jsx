import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import {
  modalDeletelGoal,
} from "../../actions/events";
import "../../css/index.css";
import { MdOutlineWarning } from "react-icons/md";
import {
  eliminarMeta,
  consultarMetasProyecto
} from "../../actions/apis";
export const ModalEliminarMeta = (props) => {
  const dispatch = useDispatch();
  const {
    idMeta,
    projectLeader,
    deleteModalGoal,
  } = useSelector((state) => state);

  const handleCerrar = () => {
    dispatch(modalDeletelGoal(false));
  };

  async function handleDeleteRecurso() {
    await dispatch(eliminarMeta(idMeta));
    await dispatch(
      consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma)
    );
    dispatch(modalDeletelGoal(false));
  }
  return (
    <Modal
      className="modalAddLider"
      isOpen={deleteModalGoal}
      
      style={{ marginTop: "15%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <MdOutlineWarning size={30} style={{ marginLeft: "-4rem" }} />
            <div
              className="title-create-leader "
              style={{ marginTop: "-1.8rem", marginLeft: "8rem" }}
            >
              Eliminar Meta
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "4rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className=" container mt-1" style={{ marginLeft: "1.5rem" }}>
          {"¿Esta seguro que desea eliminar esta meta?"}
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
          onClick={handleDeleteRecurso}
        >
          Eliminar meta{" "}
        </button>
      </div>
    </Modal>
  );
};
