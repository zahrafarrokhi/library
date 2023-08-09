"use client";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadBooks, reset } from "@/redux/slices /books";
import { Button, IconButton, InputAdornment, Slider, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { flushSync } from "react-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Book() {
  //search
  const [search, setSearch] = useState("");
  // filters
  // const [filter, setFilter] = useState({
  //   pageLte: "",
  //   pageGte: "",
  // });
  const [filter, setFilter] = useState([0,1000])


  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };
  // axios
  // const [books,setBooks] = useState([])
  // const listBooks =async()=>{
  //   const response = await axios.get('http://localhost:8000/api/books/book')
  //   setBooks(response.data.results)
  // }
  // useEffect(()=>{
  //   listBooks()
  // },[])

  //  redux
  const books = useSelector((state) => state.bookReducer.books);
  const dispatch = useDispatch();
  const booksList = async (anything) => {
    try {
      await dispatch(
        loadBooks({
          // search
          search: anything,
          // //filter
          // page_numbers__lte: filter.pageLte,
          // page_numbers__gte: filter.pageGte,

         //filter
          page_numbers__lte: filter[1],
          page_numbers__gte: filter[0],
        })
      ).unwrap();
      // console.log(reset({ treset: 123}));
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    booksList();
  }, []);

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <div className="flex py-2 justify-between">
        <div className="flex">
          <TextField
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // icon search
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {/* clear search */}
                  {search && (
                    <IconButton
                      onClick={() => {
                        setSearch("");
                        // input parameter is anything
                        booksList("");
                      }}
                    >
                      <CloseIcon className="text-base" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          />
          <Button
            variant="outlined"
            size="small"
            className=" "
            // search is state
            onClick={() => booksList(search)}
            style={{
              textTransform: "none",
            }}
          >
            Search
          </Button>
        </div>
        {/* Filter */}
        <div className="flex gap-4 w-[200px]">
          {/* <TextField
            label="Page less..."
            value={filter.pageGte}
            onChange={(e) => setFilter({ ...filter, pageGte: e.target.value })}
            InputLabelProps={{ shrink: true }}
            // icon search
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      booksList();
                    }}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          />
          page numbers
          <TextField
            label="Page more..."
            value={filter.pageLte}
            onChange={(e) => setFilter({ ...filter, pageLte: e.target.value })}
            // icon search
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => {
                      booksList();
                    }}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          /> */}

      <Slider
   
        value={filter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        disableSwap
        max={1000}
      />
      <Button
      variant="outlined"
                    onClick={() => {
                      booksList();
                    }}
                  >
                    {" "}
                  Filter
                  </Button>
  
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Authors</TableCell>
              <TableCell align="center">Tag</TableCell>

              <TableCell align="center">Created_at</TableCell>

              <TableCell align="center">PageNumbers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((item, index) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center">
                  {item.authors
                    .filter((_, index) => index < 2)
                    .map((author) => {
                      return `${author.first_name} ${author.lastt_name}`;
                    })}
                </TableCell>
                <TableCell align="center">
                  {item.tag.map((tag, index) => {
                    //  return index <2 ? `${tag.name} ` : undefined
                    return tag.name;
                  })}
                </TableCell>
                <TableCell align="center">{item.created_at}</TableCell>
                <TableCell align="center">{item.page_numbers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
