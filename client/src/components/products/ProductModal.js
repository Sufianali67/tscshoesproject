import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditProductForm from "./EditProductForm";

const ProductModal = ({ productData, isOpen, onClose, backToMain }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Product Detail</ModalHeader>
      <ModalBody>
        <EditProductForm backToMain={backToMain} productData={productData} />
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

export default ProductModal;
