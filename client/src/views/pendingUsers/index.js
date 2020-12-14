import React from 'react';
import './table.css';
import ReactTable from 'react-table-6';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import {
  getPendingUsers,
  approveUsers,
  rejectUsers,
  editUsers,
} from '../../store/actions/User';
import UserModal from '../../components/user/UserModal.js';
import UserButton from '../../components/user/UserButton';

class PendingUsers extends React.Component {
  state = {
    userData: '',
    openModal: false,
    isapproveLoading: false,
    isrejectLoading: false,
  };

  async componentDidMount() {
    const { getPendingUsers, token } = this.props;
    await getPendingUsers(token);
  }

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };

  getTableProps = (state, rowInfo, col, instance) => ({
    onClick: (e, cb) => {
      if (rowInfo !== undefined) {
        console.log('rowData', rowInfo.original);
      }
    },
  });

  handleApprove = async (userData) => {
    const { token, approveUsers, getPendingUsers } = this.props;
    const result = await approveUsers(userData, token);
    result.success === true
      ? await getPendingUsers(token)
      : console.log(result.message);
  };
  handleRejection = async (userData) => {
    const { token, rejectUsers, getPendingUsers } = this.props;
    const result = await rejectUsers(userData, token);
    result.success === true
      ? await getPendingUsers(token)
      : console.log(result.message);
  };
  handleSave = async (userData) => {
    const { token, editUsers, getPendingUsers } = this.props;
    const result = await editUsers(userData, token);
    result.success === true
      ? await getPendingUsers(token)
      : console.log(result.message);
  };
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        style: { textAlign: 'center' },
      },
      {
        Header: 'Email',
        accessor: 'email',
        style: { textAlign: 'center' },
      },
      {
        Header: 'Type',
        accessor: 'type',
        style: { textAlign: 'center' },
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        style: { textAlign: 'center' },
        Cell: (props) => {
          return (
            <span style={{ display: 'flex' }}>{props.original.createdAt}</span>
          );
        },
      },
      {
        Header: 'Actions',
        sortable: false,
        filterable: false,
        resizable: false,
        Cell: (props) => {
          return (
            <center>
              <ButtonGroup>
                <UserButton
                  handleApprove={this.handleApprove}
                  handleReject={this.handleRejection}
                  userData={props.original}
                />
                <Button
                  className='px-4'
                  onClick={() => {
                    this.setState({
                      userData: props.original,
                      openModal: true,
                    });
                  }}
                >
                  <i class='tim-icons icon-badge'></i>
                </Button>
              </ButtonGroup>
            </center>
          );
        },
      },
    ];

    const { pendingUsers } = this.props;
    const { userData, openModal } = this.state;

    return (
      <div className='content'>
        <h3 style={{ padding: '1%', marginBottom: '0px' }}>
          Manage Pending Users
        </h3>
        <hr />
        <ReactTable
          data={pendingUsers}
          columns={columns}
          defaultFilterMethod={this.filterMethod}
          filterable
          style={{ backgroundColor: 'white' }}
          minRows={8}
          getTdProps={this.getTableProps}
        />
        <UserModal
          isOpen={openModal}
          onClose={() => this.setState({ openModal: false })}
          userData={userData}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //selector
  return {
    token: state.AppState.Auth.token,
    pendingUsers: state.AppState.User.pendingUsers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //dispatcher
  getPendingUsers: (data) => dispatch(getPendingUsers(data)),
  approveUsers: (data, token) => dispatch(approveUsers(data, token)),
  rejectUsers: (data, token) => dispatch(rejectUsers(data, token)),
  editUsers: (data, token) => dispatch(editUsers(data, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingUsers);
