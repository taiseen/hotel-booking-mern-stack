import { Navbar, Header, Featured, PropertyList, FeaturedProperties, MailList, Footer } from '../../components';
import './Home.scss'

const Home = () => {

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />

        <h1 className="homeTitle">Browse By property type</h1>
        <PropertyList />

        <h1 className="homeTitle">Homes guest love</h1>
        <FeaturedProperties />

        <MailList />

        <Footer />
      </div>
    </div>
  )
}

export default Home