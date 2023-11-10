import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const MyForm = () => {
  const [age1, setAge1] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge1(event.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setAge2(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 각각의 선택된 드롭다운 값(age1, age2)과 입력창 값(inputValue)을 활용하여 원하는 동작 수행
    console.log('Selected Dropdown Value 1:', age1);
    console.log('Selected Dropdown Value 2:', age2);
    console.log('Input Value:', inputValue);
    
    // 추가 작업 수행 가능
  };

  return (
      <div>
        {/* 선택창 */}
        <div className="field">
          <p>정책</p>
          <div className="inputField">
            <FormControl style={{ maxWidth: 100, minWidth: 100}}  size="small">
              <Select
                value={age1}
                onChange={handleChange1}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>      
        </div>

        <div className="field">
          <p className='title'>정책</p>
          <p className='text'>정책</p>
          <div className="inputField">
            <FormControl sx={{ maxWidth: 100, minWidth: 100 }}  size="small">
              <Select
                value={age2}
                onChange={handleChange2}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>      
        </div>

      {/* 입력창 */}
      <div className="field">
        <p>정책</p>
        <div className="inputField">
          <FormControl className='inputField' sx={{ maxWidth: 100, minWidth: 100 }}  size="small">
              <OutlinedInput
                placeholder="Please enter text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </FormControl>
        </div>
      </div>

      {/* 버튼 */}
      <div className='stackButton'>
            <Link to="/result">
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Link>        
      </div>

    </div>
  );
};

export default MyForm;
