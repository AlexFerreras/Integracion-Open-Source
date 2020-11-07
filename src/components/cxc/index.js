import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import {TextField, InputLabel, Select, MenuItem} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import post from "../../services/post";
import get from "../../services/get";
import LinearIndeterminate from "../Loading";
import operationSuccess from "../../notifications";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const title = {
  color: "black",
};

const mt15 = {
  marginTop: 15,
};

const alignBtnSend = {
  display: "flex",
  justifyContent: "flex-end",
};

const padding = {
  padding: "10px 10px 10px 10px",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

const initialValues = {
  descripcion: "",
  monto: "",
};

const Cxc = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [productsId, setproductsId] = React.useState([]);
  const [productId, setproductId] = React.useState("");
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const classes = useStyles();

  useEffect(() => {
    get("cuentasPorCobrar/").then((data) => {
     
    setTableData(data.data.data);
    setproductsId(data.data.data);
    });

  
    
  }, []);

  async function onSubmit(data) {
    data.monto = parseFloat(data.monto);
    data.cuentaPorCobrarId =parseInt(productId);
    console.log(data)
    setIsLoading(true);
    await post("transacciones/", data);
    setIsLoading(false);
    operationSuccess();
    const response = await get("cuentasPorCobrar/");
    setTableData(response.data.data);
    reset(initialValues);
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <div style={padding}>
          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong> REDUCIR DEUDA </strong>
            </span>
          </Typography>

          {isLoading && <LinearIndeterminate />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={mt15}>
              
              <Grid item xs={6}>
              <InputLabel htmlFor="outlined-age-native-simple">Codigo Deuda</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={productId}
                onChange={(event) => {
                  setproductId(event.target.value)
                }}
                fullWidth
                as="select"
                label="Codigo Deuda"
              >
                {
                  productsId?.map((value, key)=><MenuItem key={key} value={value.id}>{value.id}</MenuItem>)
                }
              </Select>


              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="monto"
                  error={errors.monto ? true : false}
                  helperText={
                    errors.monto && errors.monto.message
                  }
                  inputRef={register({
                    required: "El Monto a debitar es requerida",
                    min:{value:1, message:"No se permite pagar una deuda con 0 pesos"}
                  })}
                  fullWidth
                  type="number"
                  label="Monto"
                  variant="outlined"
                  size="small"
                />
              </Grid>

        
              <Grid item xs={12}>
                <div style={alignBtnSend}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar información &nbsp; <CloudUploadIcon />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>

      <br />

      <Paper className={classes.paper}>
        <div style={padding}>
          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong>LISTADO CUENTAS X COBRAR</strong>
            </span>
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong> CODIGO DEUDA </strong>{" "}
                  </TableCell>
                  <TableCell align="center">
                    <strong>DESCRIPCION </strong>{" "}
                  </TableCell>
                  <TableCell align="center">
                    <strong>MONTO DEUDA</strong>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.descripcion}</TableCell>
                    <TableCell align="center">{row.montoDeuda}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
};

export default Cxc;
