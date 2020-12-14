import React from "react";
import "./table.css";
import ReactTable from "react-table-6";
import { connect } from "react-redux";
import { getOrders } from "../../store/actions/Product";

class Orders extends React.Component {
  state = {
    productData: "",
    openModal: false,
    openNewProductModal: false,
    allOrders: [],
  };

  async componentDidMount() {
    const { getOrders, token } = this.props;
    const res = await getOrders(token);
    if (res) {
      this.setState({ allOrders: res.result });
    }
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
        console.log("rowData", rowInfo.original);
      }
    },
  });

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: { textAlign: "center" },
      },
      {
        Header: "Address",
        accessor: "address",
        style: { textAlign: "center" },
      },
      {
        Header: "Products",
        Cell: (props) => {
          return props.original.products.map((item, idx) => {
            return (
              <>
                <p>
                  {item._id} <br />
                </p>
              </>
            );
          });
        },
      },
      {
        Header: "Total (USD)",
        accessor: "bill",
        style: { textAlign: "center" },
      },
    ];

    const { allOrders } = this.state;

    return (
      <div className="content">
        <h3>Orders</h3>
        <ReactTable
          data={allOrders}
          columns={columns}
          defaultFilterMethod={this.filterMethod}
          filterable
          style={{ backgroundColor: "white" }}
          minRows={8}
          getTdProps={this.getTableProps}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.AppState.Auth.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrders: (token) => dispatch(getOrders(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
