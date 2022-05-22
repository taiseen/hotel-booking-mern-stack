import { Sidebar, Navbar, DataTable } from './../../components';
import './List.scss'


const List = () => {
  return (
    <div className='list'>
      <Sidebar />

      <div className="listContainer">
        <Navbar />
        <DataTable />
      </div>
      
    </div>
  )
}

export default List
