import Head from "next/head";
import { FormAddProduct } from "../../components/product/FormAddProduct";

export default function Product() {
  return (
    <>
      <Head>
        <title>Produx - Create New Product</title>
      </Head>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <h2 className="text-center mb-4 font-weight-bold mt-4">
              Add New Product
            </h2>
            <FormAddProduct />
          </div>
        </div>
      </div>
    </>
  );
}
