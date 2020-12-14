import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewProductForm from "./NewProductForm";

const AddProductModal = ({ productData, isOpen, onClose, backToMain }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Add Product</ModalHeader>
      <ModalBody>
        <NewProductForm backToMain={backToMain} />
      </ModalBody>
      <ModalFooter>
        <Button outline onClick={onClose}>
          Close
        </Button>
        {/* <Button color="primary" onClick={onConfirm}>Add User</Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default AddProductModal;
