import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Course } from "../../types/types";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import axios from "axios";
import { ADMIN_URL } from "../../constant/constant";
import { useRecoilState } from "recoil";
import { coursesDataState, fakeReloadState } from "../../feature/atom";
import { useNavigate } from "react-router-dom";

type EditProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow: Course;
};

export default function EditCourse(props: EditProps) {
    const navigate = useNavigate();
  const handleClose = () => {
    props.setOpen(false);
  };

  const [editedValues, setEditedValues] = React.useState<Course>({
    _id: props.selectedRow?._id,
    title: props.selectedRow?.title,
    description: props.selectedRow?.description,
    imageLink: props.selectedRow?.imageLink,
    price: props.selectedRow?.price,
    published: props.selectedRow?.published,
  });

  const getData = async () => {
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(token!);
    const res = await axios.get(ADMIN_URL + "/courses", {
      headers: {
        Authorization: `Bearer ${parsed}`,
      },
    });

  };

  const handleSubmit = async () => {
    const body = { ...editedValues };
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(token!);
    const res = await axios.put(
      ADMIN_URL + "/courses/" + props.selectedRow._id,
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
    navigate('/')
    // getData();
    handleClose();

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

  console.log(editedValues);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Course</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid mt="2rem" container rowGap={2}>
              <Grid lg={12} item>
                <TextField
                  defaultValue={props.selectedRow?.title!}
                  fullWidth
                  label="Title"
                  value={editedValues.title}
                  name="title"
                  onChange={handleChange}
                />
              </Grid>
              <Grid lg={12} item>
                <TextField
                  defaultValue={props.selectedRow?.imageLink!}
                  fullWidth
                  label="Image Link"
                  value={editedValues.imageLink}
                  name="imageLink"
                  onChange={handleChange}
                />
                {/* <img height='140' width={140} src={props.selectedRow.imageLink} /> */}
              </Grid>
              <Grid lg={12} item>
                <TextField
                  defaultValue={props.selectedRow?.description!}
                  fullWidth
                  label="Description"
                  value={editedValues.description}
                  name="description"
                  onChange={handleChange}
                />
              </Grid>
              <Grid lg={12} item>
                <TextField
                  defaultValue={props.selectedRow?.price!}
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
                      //   value={editedValues.published}
                      name="published"
                    />
                  }
                  label="Published"
                  //   sx={{ m: "1rem" }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
