import axios from "axios";

export function Create(emp_eid, emp_name, emp_img, emp_gender, emp_phn_num, emp_email, emp_DOB, emp_designation, emp_joining_date) {
  let URL = "http://localhost:5000/api/v1/employee/create";
  const postData = {
    emp_eid,
    emp_name,
    emp_img,
    emp_gender,
    emp_phn_num,
    emp_email,
    emp_DOB,
    emp_designation,
    emp_joining_date,
  };
  return axios
    .post(URL, postData)
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export function Read() {
  let URL = "http://localhost:5000/api/v1/employee/list";
  return axios
    .get(URL)
    .then(function (response) {
      return response.data["msg"];
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export function Delete(id) {
  let URL = "http://localhost:5000/api/v1/employee/remove/" + id;
  return axios
    .get(URL)
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}
