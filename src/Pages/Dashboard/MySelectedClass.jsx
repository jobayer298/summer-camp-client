import Loader from "../../Components/Loader";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const MySelectedClass = () => {
  const [cart, isLoading, refetch] = useCart();

  const handleDelete = (id) =>{
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     }).then((result) => {
       if (result.isConfirmed) {
         fetch(`http://localhost:5000/selectedClasses/${id}`, {
           method: "DELETE",
         })
           .then((res) => res.json())
           .then((data) => {
             refetch();
             if (data.deletedCount > 0) {
               Swal.fire("Deleted!", "Your file has been deleted.", "success");
             }
           });
       }
     });
  }

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className="text-center mb-7 border-b-2 ">
        <h2 className="text-center font-medium text-5xl my-6">
          Selected <span className="text-[#e2554a]">Classes</span>
        </h2>
        <div>
          {/* <Link to="/dashboard/payment">
            <button className="btn btn-sm btn-warning my-3">Pay</button>
          </Link> */}
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table text-[16px]">
          {/* head */}
          <thead>
            <tr className="text-[18px] font-medium">
              <th>#</th>
              <th>class</th>
              <th>Instructor name</th>
              <th>Available seats</th>
              <th>price</th>
              <th>Action</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={c.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{c.className}</div>
                    </div>
                  </div>
                </td>
                <td>{c.instructorName}</td>
                <td>{c.seat}</td>
                <td>${c.price}</td>

                <td>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm bg-white text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/payment/${c._id}`}>
                    <button className="btn btn-sm btn-warning my-3">Pay</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
