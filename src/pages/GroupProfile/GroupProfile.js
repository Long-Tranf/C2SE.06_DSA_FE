import Header from '~/components/Layout/components/Header/header';
import './GroupProfile.css';
import React from 'react'
import Footer from '~/components/Layout/components/Footer/footer';

const GroupProfile = () => {
      return (
        <div className="wrapper">
             <Header />
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBS9bJEXw5AYRgmLY_9Nyr79oQFPYEtJjmhA&s"
                className="rounded-circle"
                alt="Profile"
                width="150"
                height="150"
              />
              <h1 className='channel'>Your Channel Name</h1>
              <p className="lead">Your Channel Description</p>
              <a href="" className="btn btn-outline-primary btn-xl">
                Subscribe
              </a>
            </div>
          </div>
          <div className="row mt-4 flex-column align-items-center">
            {articles.map((article) => (
              <a href={article.url} key={article.id} className="col-md-8 mb-4 article-link">
                <div className="card flex-row">
                  <img
                    src={article.thumbnail}
                    className="card-img-left img-fluid col-4"
                    alt={article.title}
                  />
                  <div className="col-8 p-3">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Footer />
        </div>
      );
    };
    
    const articles = [
      {
        id: 1,
        title: "Article Title 1",
        description: "A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.A brief description of Article 1.",
        thumbnail: "https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg",
        url: "",
      },
      {
        id: 2,
        title: "Article Title 2",
        description: "A brief description of Article 2.",
        thumbnail: "https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg",
        url: "",
      },
      {
        id: 3,
        title: "Article Title 3",
        description: "A brief description of Article 3.",
        thumbnail: "https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg",
        url: "",
      },
    ]; 
export default GroupProfile