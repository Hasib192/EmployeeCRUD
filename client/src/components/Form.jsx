import { useRef, useState } from "react";
import { Create } from "../apiServices/CRUDServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

const Form = () => {
  let eidRef = useRef();
  let nameRef = useRef();
  let imgRef = useRef();
  let phn_numRef = useRef();
  let emailRef = useRef();
  let dobRef = useRef();
  let designationRef = useRef();
  let join_dateRef = useRef();
  let [gender, setGender] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const saveData = (e) => {
    e.preventDefault();

    let emp_eid = eidRef.current.value;
    let emp_name = nameRef.current.value;
    let emp_img = imgRef.current.value;
    let emp_gender = gender;
    let emp_phn_num = phn_numRef.current.value;
    let emp_email = emailRef.current.value;
    let emp_DOB = dobRef.current.value;
    let emp_designation = designationRef.current.value;
    let emp_joining_date = join_dateRef.current.value;

    if (!emp_eid || !validator.isInt(emp_eid)) {
      toast.error("Invalid Eid");
    } else if (!emp_name.trim() || !validator.isAlpha(emp_name.trim(), ["en-US"], { ignore: " " })) {
      toast.error("Invalid Name");
    } else if (!emp_img.trim()) {
      toast.error("Invalid Image");
    } else if (!emp_gender.trim()) {
      toast.error("Invalid Gender");
    } else if (!emp_phn_num.trim() || !validator.isMobilePhone(emp_phn_num, ["bn-BD"])) {
      toast.error("Invalid Phone Number");
    } else if (!emp_email.trim() || !validator.isEmail(emp_email)) {
      toast.error("Invalid Email");
    } else if (!emp_DOB || !validator.isDate(emp_DOB)) {
      toast.error("Invalid Date");
    } else if (!emp_designation.trim() || !validator.isAlpha(emp_designation, ["en-US"], { ignore: " " })) {
      toast.error("Invalid Designation");
    } else if (!emp_joining_date || !validator.isDate(emp_joining_date)) {
      toast.error("Invalid Date");
    } else {
      setIsLoading(true);
      Create(emp_eid, emp_name, emp_img, emp_gender, emp_phn_num, emp_email, emp_DOB, emp_designation, emp_joining_date).then((result) => {
        if (result === true) {
          toast.success("Data saved!");

          // Reset form fields and state here
          eidRef.current.value = "";
          nameRef.current.value = "";
          imgRef.current.value = "";
          setGender("");
          phn_numRef.current.value = "";
          emailRef.current.value = "";
          dobRef.current.value = "";
          designationRef.current.value = "";
          join_dateRef.current.value = "";

          setIsLoading(false);
        } else {
          toast.error("An error occured");
        }
      });
    }
  };

  return (
    <form className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Employee Id</label>
        <input ref={eidRef} type="number" className="form-control" placeholder="EID" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input ref={nameRef} type="text" className="form-control" placeholder="Name" />
      </div>
      <div className="col-md-3">
        <label className="form-label">Image</label>
        <input ref={imgRef} type="text" className="form-control" placeholder="Put URL here" />
      </div>
      <div className="col-2">
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-12 pt-0">Gender</legend>
          <div className="col-sm-12">
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(gender);
                }}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(gender);
                }}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="col-5">
        <label className="form-label">Phone Number</label>
        <input ref={phn_numRef} type="text" className="form-control" placeholder="Phone Number" />
      </div>
      <div className="col-md-5">
        <label className="form-label">Email address</label>
        <input ref={emailRef} type="email" className="form-control" placeholder="name@example.com" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Date of Birth</label>
        <input ref={dobRef} type="date" className="form-control" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Designation</label>
        <input ref={designationRef} type="text" className="form-control" placeholder="Position" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Joining Date</label>
        <input ref={join_dateRef} type="date" className="form-control" />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary" onClick={saveData} disabled={isLoading}>
          {isLoading ? "Saving" : "Save"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Form;
