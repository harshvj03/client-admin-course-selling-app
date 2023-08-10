import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ADMIN_URL } from "../../constant/constant";
import axios from "axios";

const AddCourse = () => {
  type INITIAL_COURSE_STATE = {
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: false;
  };

  let initial_state: INITIAL_COURSE_STATE = {
    title: "",
    description: "",
    price: 0,
    imageLink: "",
    published: false,
  };
  const [addCourse, setAddCourse] =
    useState<INITIAL_COURSE_STATE>(initial_state);

  const inputArray = [
    {
      id: 1,
      label: "Title",
      value: addCourse?.title,
      size: 12,
      name: "title",
      type: "input",
    },
    {
      id: 2,
      label: "Description",
      value: addCourse?.description,
      size: 12,
      name: "description",
      type: "input",
    },
    {
      id: 3,
      label: "Price",
      value: addCourse?.price,
      size: 12,
      name: "price",
      type: "number",
    },
    {
      id: 4,
      label: "Image Link",
      value: addCourse?.imageLink,
      size: 12,
      name: "imageLink",
      type: "input",
    },
    {
      id: 5,
      label: "Published",
      value: addCourse?.published,
      size: 12,
      name: "published",
      type: "bool",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "published") {
      setAddCourse({
        ...addCourse,
        [e.target.name]: e.target.checked,
      });
    } else {
      setAddCourse({
        ...addCourse,
        [e.target.name]: e.target.value,
      });
    }
    console.log(e.target.name);
    console.log(e.target.checked);
  };

  const postCourse = async () => {
    const body = addCourse;
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(token!);
    const res = await axios.post(
      ADMIN_URL + "/courses",
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${parsed}`,
        },
      }
    );
    // const res = await axios.post(ADMIN_URL + "/courses", {},body);
    const data = res.data;
    console.log(res);
    console.log(data);
  };
  return (
    <Paper elevation={10} sx={{ width: "40%", p: "1rem" }}>
      <Typography variant="h6">Add Course</Typography>
      <Grid container>
        {inputArray.map((x) => {
          return (
            <Grid key={x.id} item lg={x.size} p="1rem">
              {(x.type === "input" || x.type === "number") && (
                <TextField
                  // variant="standard"
                  fullWidth
                  placeholder={x.label}
                  value={x.value}
                  //   sx={{ m: "1rem" }}
                  name={x.name}
                  onChange={handleChange}
                  type={x.type}
                />
              )}

              {x.type === "bool" && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addCourse.published}
                      onChange={handleChange}
                      name="published"
                    />
                  }
                  label="Published"
                  sx={{ m: "1rem" }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ m: "1rem" }}>
        <Button variant="contained" onClick={postCourse}>
          Submit
        </Button>
        <Button onClick={() => setAddCourse(initial_state)}>Cancel</Button>
      </Box>
    </Paper>
  );
};

export default AddCourse;
