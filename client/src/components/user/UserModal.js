import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UserDetailForm from "./UserDetailForm";
import { editUsers } from "../../store/actions/User";

const UserModal = ({ userData, isOpen, onClose, handleSave }) => {
  const token = useSelector((state) => state.AppState.Auth.token);

  const dispatch = useDispatch();
  const [editModal, setEdit] = useState(false);
  const [newdata, setUsersData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleEdit = () => {
    setEdit(!editModal);
  };

  const handleUser = (usernewdata) => {
    setUsersData(usernewdata);
  };

  const handleSaveClick = async () => {
    setIsDisabled(true);
    await handleSave(newdata);
    setEdit(!editModal);
    onClose();
    setIsDisabled(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader style={{ flex: "1", alignItems: "center" }}>
        User Detail{" "}
        {/* <Button onClick={handleEdit} className="btn-sm p-2" size="sm">
          {editModal === false ? "Edit" : "View"}
        </Button> */}
      </ModalHeader>
      <ModalBody>
        <UserDetailForm
          editModal={editModal}
          returnUser={handleUser}
          userData={userData}
        />
      </ModalBody>
      <ModalFooter>
        <Button outline onClick={onClose}>
          Close
        </Button>

        {/* <Button disabled={!editModal || isDisabled} onClick={handleSaveClick}>
          {!isDisabled ? (
            "Save"
          ) : (
            <span className="text-white">
              Saving &nbsp;
              <i className="fa fa-spinner fa-spin fa-1x fa-fw text-white" />
            </span>
          )}
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
