import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
interface filterProps {
  roles: string;
  noOfEmployees: string;
  experience: string;
  remote: boolean;
  minBaseSalary: string;
  companyName: string;
}
interface jobProps {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: null;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}
const getJobs = ({
  filters,
  offset,
}: {
  filters: filterProps;
  offset: number;
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 10,
    offset: offset,
    ...filters,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  return fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
};
function App() {
  const [jobs, setJobs] = useState<Array<jobProps>>([]);
  const [filters, setFilters] = useState({
    roles: "",
    noOfEmployees: "",
    experience: "",
    remote: true,
    minBaseSalary: "",
    companyName: "",
  });

  useEffect(() => {
    getJobs({ filters, offset: jobs?.length + 20 }).then((data) =>
      setJobs(data?.jdList)
    );
  }, []);
  console.log(jobs);

  return (
    <div>
      {filters.roles}
      <div className="filterContainer">
        <FormControl fullWidth>
          <InputLabel id="selectRoles">Role</InputLabel>
          <Select
            labelId="selectRoles"
            id="demo-simple-select"
            value={filters.roles}
            label="Age"
            onChange={(e) => {
              setFilters((prevState) => ({
                ...prevState,
                roles: e.target.value,
              }));
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="container">
        {jobs?.map((each) => (
          <div className="jobCard" key={each.jdUid}>
            <h3>{each.companyName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
