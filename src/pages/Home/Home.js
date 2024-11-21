import ContentHomePage from '~/components/Layout/components/ContentHomePage/ContentHomePage';
import Header from '~/components/Layout/components/Header/header';
import Headline from '~/components/Layout/components/Headline/headline';
function Home() {
    return (
        <div className="wrapper">
            <Header />
            <Headline />
            <ContentHomePage />
        </div>
    );
}

export default Home;
