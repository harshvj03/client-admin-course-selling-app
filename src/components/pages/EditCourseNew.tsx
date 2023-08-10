import * as React from "react";
import Button from "@mui/material/Button";
import { Course } from "../../types/types";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import axios from "axios";
import { ADMIN_URL } from "../../constant/constant";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function EditCourse() {
  const { id } = useParams();
  const url = ADMIN_URL + "/courses";
  const { loading, data, error } = useFetch(url);
  console.log(loading);
  console.log(data);
  console.log(error);
  const obj = data?.find((x: any) => x._id === id);
  const [editedValues, setEditedValues] = React.useState<Course>({
    _id: obj?._id,
    title: obj?.title,
    description: obj?.description,
    imageLink: obj?.imageLink,
    price: obj?.price,
    published: obj?.published,
  });
  // console.log(data.filter((x: any) => x._id === id));

  const handleSubmit = async () => {
    const body = { ...editedValues };
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(token!);
    const res = await axios.put(
      ADMIN_URL + "/courses/" + id,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${parsed}`,
        },
      }
    );

    console.log(res);
    alert(res.data.message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "published") {
      setEditedValues({
        ...editedValues,
        [e.target.name]: e.target.checked,
      });
    } else {
      setEditedValues({
        ...editedValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  // console.log(editedValues);

  if (loading) return <>Loading</>;

  return (
    <div>
      <Grid mt="2rem" container rowGap={2}>
        <Grid lg={12} item>
          <TextField
            defaultValue={obj?.title!}
            fullWidth
            label="Title"
            value={editedValues.title}
            name="title"
            onChange={handleChange}
          />
        </Grid>
        <Grid lg={12} item>
          <TextField
            defaultValue={obj?.imageLink!}
            fullWidth
            label="Image Link"
            value={editedValues.imageLink}
            name="imageLink"
            onChange={handleChange}
          />
        </Grid>
        <Grid lg={12} item>
          <TextField
            defaultValue={obj?.description!}
            fullWidth
            label="Description"
            value={editedValues.description}
            name="description"
            onChange={handleChange}
          />
        </Grid>
        <Grid lg={12} item>
          <TextField
            defaultValue={obj?.price!}
            fullWidth
            label="Price"
            value={editedValues.price}
            name="price"
            onChange={handleChange}
          />
        </Grid>
        <Grid lg={12} item>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedValues?.published}
                onChange={handleChange}
                name="published"
              />
            }
            label="Published"
          />
        </Grid>
      </Grid>
      {/* <Button onClick={handleClose}>Cancel</Button> */}
      <Button variant="contained" onClick={handleSubmit} autoFocus>
        Submit
      </Button>
    </div>
  );
}
