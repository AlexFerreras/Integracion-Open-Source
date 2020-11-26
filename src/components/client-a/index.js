import React, {  useState } from "react";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LinearIndeterminate from "../Loading";
import operationSuccess from "../../notifications";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {apiUrl} from "../../services/config.json";
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
  facturaId: "",
  monto: 0,
  nombre:""
};

const ClienteA = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const classes = useStyles();


  async function onSubmit(data) {

    data.monto = parseFloat(data.monto);    
    console.log(data)
    setIsLoading(true);
    setTimeout(
        function() {
        window.location.href = `${apiUrl}/facturaId=${data.facturaId}`;
        }, 3000);
    
    setIsLoading(false);
    operationSuccess();
   

  }

  return (
    <div>
      <Paper className={classes.paper}>
        <div style={padding}>
          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong> COMPLETE LA FACTURA </strong>
            </span>
          </Typography>

          {isLoading && <LinearIndeterminate />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={mt15}>
              

            <Grid item xs={6}>
            <TextField
              name="facturaId"
              error={errors.facturaId ? true : false}
              helperText={errors.facturaId && errors.facturaId.message}
              inputRef={register({required: "El ID es obligatorio"})}
              type="text"
              label="ID de factura*"
              variant="outlined"
              size="small"
            />
          </Grid> 
            <Grid item xs={6}>
            <TextField
              name="nombre del producto"
              error={errors.nombre ? true : false}
              helperText={errors.nombre && errors.nombre.message}
              inputRef={register({required: "El nombre es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 40, message: "La longitud máxima debe ser igual a 40"}})}
         
              type="text"
              label="Nombre del Producto*"
              variant="outlined"
              size="small"
            />
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

    </div>
  );
};

export default ClienteA;
