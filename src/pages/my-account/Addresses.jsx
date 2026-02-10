import { Link } from "react-router-dom";

export default function Addresses() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      
      <div className="border border-[#FFCDD2] p-6">
        <h3 className="text-3xl mb-4">Billing Address</h3>
        <Link to="edit-address/billing" className="text-red-500 float-right">
          Edit Billing address
        </Link>
        <p className="mt-8">
          aMANNNNNNN BHAI Tripathi<br/>
          30 West Rocky Oak Lane<br/>
          Maharashtra 400058
        </p>
      </div>

      <div className="border border-[#FFCDD2] p-6">
        <h3 className="text-3xl mb-4">Shipping Address</h3>
        <Link to="edit-address/shipping" className="text-red-500 float-right">
          Edit Shipping address
        </Link>
        <p className="mt-8">
          aMANNNNNNN BHAI Tripathi<br/>
          30 West Rocky Oak Lane<br/>
          Maharashtra 400058
        </p>
      </div>

    </div>
  );
}
