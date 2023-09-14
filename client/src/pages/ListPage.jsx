import { useEffect, useState } from "react";
import "../assets/css/table.css";
import { Delete, Read } from "../apiServices/CRUDServices";
import Loader from "../helpers/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [data, setData] = useState([]);
  const [id, setID] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Read()
      .then((res) => {
        setData(res);
        setLoading(true);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const onDelete = (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Delete(id).then((res) => {
              setID(id);
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Cancelled", "Your file is safe :)", "error");
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const centerScreen = { display: "flex", alignItems: "center", justifyContent: "center" };

  return (
    <div className="container py-5">
      {loading ? (
        data.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {/* <img src={item["emp_img"]} width={50} height={50} /> */}
                    {item["emp_img"]}
                  </td>
                  <td>{item["emp_name"]}</td>
                  <td>{item["emp_email"]}</td>
                  <td>{item["emp_gender"]}</td>
                  <td>{item["emp_designation"]}</td>
                  <td width={"20%"}>
                    <Link to={"/update/" + item["_id"]}>
                      <button type="button" className="btn btn-primary mx-1">
                        Update
                      </button>
                    </Link>
                    <button type="button" className="btn btn-danger mx-1" onClick={async () => await onDelete(item["_id"])}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={centerScreen}>
            <h2>No Data</h2>
          </div>
        )
      ) : (
        <div style={centerScreen}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ListPage;
