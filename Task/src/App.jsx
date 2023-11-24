// Form.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import style from './App.module.css'



const Form = () => {
  const { register, handleSubmit, reset } = useForm();
  const [dataList, setDataList] = useState([]);
  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];

  const onSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/data', formData);
      reset();
      // fetchData();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/data/${id}`);
      reset(response.data);
    } catch (error) {
      console.error('Error fetching data for edit:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className='animate__animated animate__bounce animate__repeat-2 '>
        <input {...register('name',{required:true}) }  placeholder="Name" />
        <br/>
        <br />
        <input {...register('age',{required:true})} type="number" placeholder="Age" />
        <br/>
        <br />
        <select {...register('city',{required:true})}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
          {/*options for 10 cities */}
        </select>
        <br />
        <br />
        <label>
          <input {...register('sex',{required:true})} type="radio" value="Male" />
          Male
        </label>
        {' '}
        <label>
          <input {...register('sex',{required:true})} type="radio" value="Female" />
          Female
        </label>
        <br />
        <Button type="submit">Submit</Button>{'  '}
        <Button onClick={fetchData}>Fetch Data</Button>
        
      </form>
      
      <br/>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>City</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.sex}</td>
              <td>{item.city}</td>
              <td>
                <Button onClick={() => handleEdit(item._id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Form;
