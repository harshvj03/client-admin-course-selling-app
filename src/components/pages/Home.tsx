import useFetch from "../hooks/useFetch";
import { ADMIN_URL } from "../../constant/constant";
import CommonCard from "../common/CommonCard";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import EditCourse from "./EditCourse";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Course = {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  price: string;
  published: boolean;
};

const Home = () => {
  const url = ADMIN_URL + "/courses";
  const { loading, data, error } = useFetch(url);
  const [courses, setCourses] = useState<Course[]>([] as Course[]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Course>();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setCourses(data);
    }
    console.log(data);
  }, [data]);

  const deleteItem = async  (id: string) => {
    console.log("delete", id);
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(token!);
    const res =  await axios.delete(ADMIN_URL + '/courses/' + id, {
      headers: {
        Authorization: `Bearer ${parsed}`,
      },
    });
    console.log(res);
    const filteredData = courses.filter((x) => x._id !== id);
    setCourses(filteredData);
  };

  const editItem = (id: string) => {
    console.log("edit", id);
    // setOpen(true);
    // setSelectedRow(courses.find((x) => x._id === id));
    navigate('/home/' + id);
  };

  if (!data) {
    console.log(error);
  }

  console.log(selectedRow);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>Loading</>
      ) : courses.length === 0 ? (
        <>No courses to display, Please add courses!!</>
      ) : (
        <>
          {courses.map((x, i: number) => (
            <CommonCard
              key={i}
              title={x?.title}
              description={x?.description}
              imageLink={x?.imageLink}
              price={x?.price}
              published={x?.published}
              deleteItem={() => deleteItem(x._id)}
              editItem={() => editItem(x._id)}
            />
          ))}
          <EditCourse
            open={open}
            setOpen={setOpen}
            selectedRow={selectedRow!}
          />
        </>
      )}{" "}
    </Box>
  );
};

export default Home;
