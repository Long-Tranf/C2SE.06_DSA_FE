import ContentHomePage from '~/components/Layout/components/ContentHomePage/ContentHomePage';
import Header from '~/components/Layout/components/Header/header';
function Home() {
    return (
        <div className="wrapper">
            <Header />
            <ContentHomePage />
        </div>
    );
}

export default Home;
