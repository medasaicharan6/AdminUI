import React, { useState } from 'react'
import {column} from './columns'
import './BasicTable.css'

export const BasicTable = ({data,CheckboxChange,HeadCheckbox,HeadCheckboxChange,editData,DeleteClicked}) =>{
    const [editableId,setEditableId]=useState(null)
    const [editFormData,setEditFormData]=useState({
        name:"",
        email:"",
        role:""
    })
    const handleEditFormChange=(e)=>{
        e.preventDefault();
        const fieldName=e.target.getAttribute('name');
        const fieldValue=e.target.value;

        const newFormdata = {...editFormData}
        newFormdata[fieldName]=fieldValue
        setEditFormData(newFormdata)
    }
    const handleEdit=(e)=>{
        let id = parseInt(e.target.id.slice(0,-2))
        setEditableId(id)
        const formValues={}
        for (let row of data){
            if (parseInt(row.id) ===id ){
                formValues.name=row.name
                formValues.role=row.role
                formValues.email=row.email
                break
            }
        }
        setEditFormData(formValues)
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault()
        let id = parseInt(e.target.id.slice(0,-2))
        let obj={}
        for (let row of data){
            if (parseInt(row.id)===id){
                obj={...row}
                break
            }
        }
        const editedData = {...obj, name:editFormData.name,role:editFormData.role,email:editFormData.email}
        editData(editedData);
        setEditableId(null)
    }
    return(
        <form className="box">
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th>{<input type='checkbox' id="MainCheckbox" checked={HeadCheckbox} onChange={(e)=>HeadCheckboxChange(e)}/>}</th>
                        {column.map(row=>( 
                            <th>{row.Header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row=>{
                        if (parseInt(editableId)!==parseInt(row.id)){
                            return(
                                <tr className={row.select===true? "selected":""}>
                                    <td>{<input id={row.id} type='checkbox' checked={row.select} onChange={(e)=>CheckboxChange(e)}/>}</td>
                                    {column.map(column_row=>(
                                        <td>{row[column_row.Accessor]}</td>
                                    ))}
                                    <td>
                                        <div className="Actionsbox">
                                            <button id={row.id+"Ed"} className="actionbutton" type="button" onClick={(e)=>handleEdit(e)}>Edit</button>
                                            <button id={row.id+"Dl"} onClick={(e)=>DeleteClicked(e)} type="button">Delete</button>
                                        </div>
                                    </td>
                                </tr>)
                        }
                        else{
                            return(
                                <tr className={row.select===true? "selected":""}>
                                    <td>{<input id={row.id} type='checkbox' checked={row.select} onChange={(e)=>CheckboxChange(e)}/>}</td>
                                    {column.map(column_row=>(
                                        <td><input type="text" placeholder={column_row.Accessor} required="required" name={column_row.Accessor} value={editFormData[column_row.Accessor]} onChange={(e)=>handleEditFormChange(e)}/></td>
                                    ))}
                                    <td>
                                        <div className="Actionsbox">
                                            <button id={row.id+"SV"} className="actionbutton" type="button" onClick={(e)=>handleFormSubmit(e)}>Save</button>
                                            <button type="button" onClick={()=>setEditableId(null)}>Cancel</button>
                                        </div>
                                    </td>
                                </tr>)
                        }
                    })}
                </tbody>
            </table>
        </form>
    )
}