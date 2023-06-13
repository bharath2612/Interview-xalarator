"use client"; // This is a client component 👈🏽
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Typography,
  Button,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Product {
  title: string;
  price: number;
  status: string;
  variant: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    status: "out_of_stock",
    variant: "small",
  });
  const handleChange = (event: any | { name?: string; value: unknown }) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name as keyof Product]: value,
    }));
  };

  const getProducts = async () => {
    try {
      await axios.get("http://localhost:8000/api/products").then((res) => {
        setProducts(res.data.message);
        console.log("res", res.data.message);
      });
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post("http://localhost:8000/api/add/product", { product })
        .then(() => {
          getProducts();
        });
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios
        .delete("http://localhost:8000/api/delete/product", { headers: { id } })
        .then(() => {
          getProducts();
        });
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Typography variant="h4">Add Product</Typography>
      <Grid container spacing={2} className="p-10">
        <Grid md={6} className="px-2 py-2">
          <TextField
            name="title"
            label="Product Title"
            value={product.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid md={6} className="px-2 py-2">
          <TextField
            name="price"
            label="Product Price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid md={6} className="px-2 py-2">
          <Select
            name="status"
            value={product.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="out_of_stock">Out Of Stock</MenuItem>
            <MenuItem value="available">Available</MenuItem>
          </Select>
        </Grid>
        <Grid md={6} className="px-2 py-2">
          <Select
            name="variant"
            value={product.variant}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </Grid>
        <Grid md={6} className="px-2 py-2 m-2">
          <Button onClick={handleSubmit} color="primary" variant="outlined">
            Add
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4">Products list</Typography>
      <Grid container spacing={2} className="p-10">
        {products.map((product: any, index) => (
          <Grid key={index} xs={12} md={3} item>
            {" "}
            <Card>
              <CardContent>
                <Typography variant="h6">Title: {product.title}</Typography>
                <Typography variant="subtitle1">
                  Price: {product.price}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label={product.variant} color="primary" />
                  <Chip label={product.status} color="secondary" />{" "}
                  <IconButton
                    // onClick={() => handleDelete(product._id)}
                    aria-label="delete"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(product._id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
