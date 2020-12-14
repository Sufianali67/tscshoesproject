import React from "react";
import "./table.css";
import ReactTable from "react-table-6";
import { Button, Modal } from "reactstrap";
import { connect } from "react-redux";
import { getAllProducts, deleteProduct } from "../../store/actions/Product";
import ProductModal from "../../components/products/ProductModal.js";
import AddProductModal from "../../components/products/AddProductModal.js";

class AllProducts extends React.Component {
  state = {
    productData: "",
    openModal: false,
    openNewProductModal: false,
  };

  async componentDidMount() {
    const { getAllProducts, token } = this.props;
    await getAllProducts(token);
  }

  backToMain = () => {
    this.setState({
      productData: "",
      openModal: false,
      openNewProductModal: false,
    });
  };

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

  deleteProduct = async (e) => {
    const { deleteProduct, getAllProducts, token } = this.props;
    const res = await deleteProduct(token, e);
    if (res) {
      getAllProducts(token);
    }
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        style: { textAlign: "center" },
      },
      {
        Header: "Name",
        accessor: "name",
        style: { textAlign: "center" },
      },
      {
        Header: "Price (USD)",
        accessor: "price",
        style: { textAlign: "center" },
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        style: { textAlign: "center" },
      },
      {
        Header: "Actions",
        // width: 180,
        // minWidth: 120,
        // maxWidth: 250,
        sortable: false,
        filterable: false,
        resizable: false,
        Cell: (props) => {
          return (
            <span>
              <Button
                onClick={() => {
                  this.setState({
                    productData: props.original,
                    openModal: true,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                color="danger"
                onClick={() => this.deleteProduct(props.original._id)}
              >
                Delete
              </Button>
            </span>
          );
        },
      },
    ];

    const { allProducts } = this.props;
    const { productData, openModal, openNewProductModal } = this.state;

    return (
      <div className="content">
        <h3>Products</h3>
        <Button onClick={() => this.setState({ openNewProductModal: true })}>
          Add Product
        </Button>
        <ReactTable
          data={allProducts}
          columns={columns}
          defaultFilterMethod={this.filterMethod}
          filterable
          style={{ backgroundColor: "white" }}
          minRows={8}
          getTdProps={this.getTableProps}
        />
        <ProductModal
          backToMain={this.backToMain}
          isOpen={openModal}
          onClose={() => this.setState({ openModal: false })}
          productData={productData}
        />
        <AddProductModal
          backToMain={this.backToMain}
          isOpen={openNewProductModal}
          onClose={() => this.setState({ openNewProductModal: false })}
          productData={productData}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.AppState.Auth.token,
    allProducts: state.AppState.Product.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (token) => dispatch(getAllProducts(token)),
  deleteProduct: (token, id) => dispatch(deleteProduct(token, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProducts);
