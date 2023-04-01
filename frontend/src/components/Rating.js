import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Rating(props) {

  const handleChange = (event) => {
    console.log(event.target.value)
    if (props.onRatingChange) {
      props.onRatingChange(event.target.value);
    }
  };

  return (
    <FormControl>
      <InputLabel id="rating-label">Rating</InputLabel>
      <br></br>
      <Select
        labelId="rating-label"
        id="rating-select"
        class="rating"
        disabled={props.disabled}
        required={props.required}
        onChange={handleChange}
        defaultValue={props.value || ''}
      >
        <MenuItem value={1}>1 (Poor)</MenuItem>
        <MenuItem value={2}>2 (Below Average)</MenuItem>
        <MenuItem value={3}>3 (Average)</MenuItem>
        <MenuItem value={4}>4 (Above Average)</MenuItem>
        <MenuItem value={5}>5 (Good)</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Rating;
