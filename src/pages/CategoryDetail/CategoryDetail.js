import ContentHomePage from '~/components/Layout/components/ContentHomePage/ContentHomePage';
import Footer from '~/components/Layout/components/Footer/footer';
import Header from '~/components/Layout/components/Header/header';
import ContentCategoryDetail from '~/components/Layout/components/ContentCategory/ContentCategoryDetail';
function CategoryDetail() {
    return (
        <div className="wrapper">
            <Header />
            <ContentCategoryDetail />
            <Footer />
        </div>
    );
}

export default CategoryDetail;
