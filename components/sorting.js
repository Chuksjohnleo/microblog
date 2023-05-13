import styles from './sorting.module.css';

export default function Sorting({sorting,sortSetting}){

  return(
    <>
    <div style={{textAlign:'center'}} className={styles.details}>
          <h1 style={{fontSize:'1rem',padding:'1px 8px 0'}}>Showing {sorting}</h1>
          <div className={styles.sorting}>
          <label htmlFor="sortings">Sort by:</label>
        <select className={styles.select} onChange={(e)=>{
          sortSetting(e.target.value);
          window.scrollTo(0,0);
          }} id="sortings" name="sortings">
          <optgroup label="Sort by:">
            <option value={'Recent posts'}>Recent posts</option>
            <option value={'Trending posts'}>Trending posts</option>
            <option value={'Most liked posts'}>Most liked posts</option>
            <option value={'Most commented posts'}>Most commented posts</option>
            <option value={'Most shared posts'}>Most shared posts</option>
            <option value={'Posts by popular Users'}>Posts by popular peoples</option>
          </optgroup>
        </select>
          </div>
        </div>
    </>
    )
}