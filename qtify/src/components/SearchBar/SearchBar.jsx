import React from "react";
import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { Autocomplete, TextField } from '@mui/material';
import { styled } from "@mui/system";
import SearchListItem from "./SearchListItem";
import { useNavigate } from "react-router-dom";

function SearchBar({ data }) {
  const navigate = useNavigate();

  function handleSearchClick(e) {
    e.preventDefault();

    const searchStr = e.target.elements["search_input"].value;
    const dt = data.find((album) => {
      return album.title.toLowerCase().includes(searchStr.toLowerCase());
    });
    if (dt) {
      navigate(`/album/${dt.slug}`);
      e.target.elements["search_input"].value = "";
    } else {
      console.log(`No album found with name "${searchStr}"`);
    }
  }

  const Listbox = styled("ul")(({ theme }) => ({
    width: "100%",
    maxWidth: "727px",
    margin: 0,
    listStyle: "none",
    backgroundColor: "var(--color-black)",
    overflow: "auto",
    maxHeight: 200,
    color: "var(--color-white)",
    border: "1px solid rgba(0,0,0,.25)",
    "& li.Mui-focused": {
      backgroundColor: "var(--color-primary)",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "var(--color-primary)",
      color: "white",
    },
  }));

  return (
    <div className={styles.searchBar_container}>
      <form onSubmit={handleSearchClick} className={styles.search_bar}>
        <Autocomplete
          freeSolo
          options={data || []}
          getOptionLabel={(option) => option.title || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              name="search_input"
              placeholder="Search an album of your choice"
              variant="outlined"
              color = "success"
              className={styles.searchInput}
              InputProps={{
                ...params.InputProps,
                style: { height: '40px' }, // Adjust the height to match your existing CSS
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <SearchListItem album={option} />
            </li>
          )}
          ListboxComponent={Listbox}
        />
        <Button other className={styles["search-btn"]}>
          <FaSearch />
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
