import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";

function UserButton({ handleApprove, handleReject, userData }) {
  const [isapproveLoading, setIsApproveLoading] = useState(false);
  const [isrejectLoading, setIsRejectLoading] = useState(false);

  const handleApproveClick = async () => {
    setIsApproveLoading(true);
    await handleApprove(userData);
    setIsApproveLoading(false);
  };
  const handleRejectClick = async () => {
    setIsRejectLoading(true);
    await handleReject(userData);
    setIsRejectLoading(false);
  };
  return (
    <Fragment>
      <Button
        onClick={handleApproveClick}
        disabled={isapproveLoading}
        className="px-4"
      >
        {isapproveLoading ? (
          <i className="fa fa-spinner fa-spin fa-1x fa-fw text-white" />
        ) : (
          <i class="tim-icons icon-check-2"></i>
        )}
      </Button>
      <Button
        onClick={handleRejectClick}
        disabled={isrejectLoading}
        className="px-4"
      >
        {" "}
        {isrejectLoading ? (
          <i className="fa fa-spinner fa-spin fa-1x fa-fw text-white" />
        ) : (
          <i class="tim-icons icon-simple-remove"></i>
        )}
      </Button>
    </Fragment>
  );
}

export default UserButton;
