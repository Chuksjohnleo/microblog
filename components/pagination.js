import React from 'react';
import styles from './pagination.module.css';

export default function Pagination({pages, currentPage, lastPage, fetchMoreComments}){
    return (
        <>
        <div>
            <div className={styles.paginationBoxContainerWrapper}>
             <div className={styles.paginationBoxContainer}>
               {pages.map((page)=>{
          // maps through the pages to provide the buttons needed for navigation
          // It also checks if this is the current or last page to adjust the background color.
          // ok
          return(
            
                   <button 
                      key={page} 
                      disabled={page===currentPage || page === lastPage  ? true : false} 
                      className={page===currentPage || page === lastPage ? styles.navyPageBtn:styles.normalPageBtn}
                      onClick={(e)=>fetchMoreComments(page*5,e)} >
                        {page+1}
                   </button>
            
                  )
               })  
              }
             </div>
            </div>
            <div className={styles.viewMoreBtnContainer}>
              <button className={styles.viewMoreBtn} 
                    onClick={(e)=>fetchMoreComments(((currentPage+1)*5),e)} >
                    View more comments 
              </button>
            </div>
        </div>
        </>
    )
}