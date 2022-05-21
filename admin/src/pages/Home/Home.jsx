import { Sidebar, Navbar, Widget, Featured, Chart } from '../../components';
import './Home.scss';


const Home = () => {

  return (
    <div className='home'>

      <Sidebar />

      <div className="homContainer">
        <Navbar />

        <div className="widgets">
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='earning' />
          <Widget type='balance' />
        </div>

        <div className="charts">
          <Featured />
          <Chart />
        </div>

      </div>

    </div>
  )
}

export default Home