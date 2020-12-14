import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";

function UserDeleteButton({ handleDelete, userData }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsDeleteLoading(true);
    await handleDelete(userData);
    setIsDeleteLoading(false);
  };
  return (
    <Button
      className="px-4"
      disabled={isDeleteLoading}
      onClick={handleDeleteClick}
    >
      {isDeleteLoading ? (
        <i className="fa fa-spinner fa-spin fa-1x fa-fw text-white" />
      ) : (
        <i class="tim-icons icon-trash-simple" />
      )}
    </Button>
  );
}

export default UserDeleteButton;
