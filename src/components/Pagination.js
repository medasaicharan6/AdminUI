import React from 'react'
import './Pagination.css'

export const Pagination = ({Totalrows,setCurrentPage,currentpage,setHeadCheckbox,DeleteSelected}) => {
    const PageNumbers = []
    for (let i=1 ; i<=Math.ceil(Totalrows/10) ; i++){
        PageNumbers.push(i)
    }
    const PageButtonClick=(number)=>{
        setHeadCheckbox(false)
        setCurrentPage(number)
    }
    return (
        <>
        <div className="button-container">
            <button className="Deleteall" onClick={DeleteSelected}>Delete selected</button>
            <div className="Page-button-container">
                <button className="Pagebutton" onClick={()=>PageButtonClick(1)}>{"<<"}</button>
                <button className="Pagebutton" onClick={()=>PageButtonClick(currentpage-1)} disabled={currentpage===1}>{"<"}</button>
                {PageNumbers.map(number=>(
                    <button className="Pagebutton" onClick={()=>PageButtonClick(number)}>{number}</button>
                ))}
                <button className="Pagebutton" onClick={()=>PageButtonClick(currentpage+1)} disabled={currentpage===PageNumbers.length}>{">"}</button>
                <button className="Pagebutton" onClick={()=>PageButtonClick(PageNumbers.length)}>{">>"}</button>
            </div>
        </div>
        </>
    )
}
