import './AdminUi.css'
import React, { useState,useEffect } from 'react'
import { column } from './columns'
import { Pagination } from './Pagination'
import {BasicTable} from './BasicTable'


export const AdminUi=()=>{
    const[data,setData]=useState([])
    useEffect(() => {
        const load=async()=>{
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            const data = await response.json();
            for (let row of data){
                row.select=false
            }
            setData(data)
        }
        load();
    }, [])
    const[currentpage,setCurrentPage]=useState(1)
    const [query,setQuery] = useState("")
    const[HeadCheckbox,setHeadCheckbox]=useState(false)
    const headers = []
    for (let i of column){
        headers.push(i.Accessor)
    }
    const search = ((data) => data.filter((row)=> headers.some(header=>row[header].toString().toUpperCase().indexOf(query.toUpperCase())>-1)))
    const CheckboxChange=(e)=>{
        setData(data.map(row=>{
            if (parseInt(e.target.id) === parseInt(row.id)){
                row.select=!row.select
            }
            return row
        }))
    }
    const onInputChange = (e) =>{
        setHeadCheckbox(false)
        if (query===""){
            setCurrentPage(1)
            setQuery(e.target.value)
        }
        else{
            setCurrentPage(1)
            setQuery(e.target.value)
       }
    }
    const searchdata = search(data)
    const pageData=searchdata.slice((currentpage*10)-10,currentpage*10)
    const HeadCheckboxChange = (e) =>{
        let checked = e.target.checked
        setHeadCheckbox(!HeadCheckbox,pageData)
        const list=[]
        for (let row of pageData){
            list.push(row.id)
        }
        setData(data.map(row=>{
            if (list.indexOf(row.id)>-1){
                row.select=checked
            }
            return row 
        }))
    }
    const editData=(editedData)=>{
        const newData = [...data]
        const index = data.findIndex(row=>parseInt(row.id)===parseInt(editedData.id))
        newData[index]=editedData
        setData(newData)
    }
    const DeleteClicked = (e)=>{
        const newData = [...data]
        const updatedData = newData.filter(row=>parseInt(row.id)!==parseInt(e.target.id))
        setData(updatedData)
    }
    const DeleteSelected = ()=>{
        const newData = [...data]
        const updatedData = newData.filter(row=>row.select===false)
        setData(updatedData)
        setHeadCheckbox(false)
    }
    return (
        <>
            <input className='Searchbar' type='search' value={query} placeholder='Search by name, email or role' onChange= {(e)=>onInputChange(e)}/>
            <BasicTable data={pageData} CheckboxChange={CheckboxChange} HeadCheckbox={HeadCheckbox} HeadCheckboxChange={HeadCheckboxChange} editData={editData} DeleteClicked={DeleteClicked}></BasicTable>
            <Pagination Totalrows={searchdata.length} setCurrentPage={setCurrentPage} currentpage={currentpage} setHeadCheckbox={setHeadCheckbox} DeleteSelected={DeleteSelected}></Pagination>
        </>
    )}
