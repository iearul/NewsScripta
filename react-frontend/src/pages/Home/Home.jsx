import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination";
import NewsService from "../../services/NewsService";
import "./Home.css";

const Home = () => {
  const [newsItems, setNewsItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAllData = async (data) => {
    const results = await NewsService.getAllNews(data);
    setNewsItems(results?.data);
  };

  useEffect(() => {
    getAllData({ q: searchTerm, page: currentPage, perPage: newsPerPage });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getAllData({ q: searchTerm, page: 1, perPage: newsPerPage });
  }, [searchTerm]);

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control mb-3"
              />
            </div>
            <div className="row">
              {newsItems?.data?.map((item) => (
                <div className="col-sm-6 col-md-3" key={item.id}>
                  <Link
                    to={item?.newsUrl}
                    target="_blank"
                    className="news-link"
                  >
                    <div className="card mb-4">
                      <div className="card-fold position-relative">
                        <img
                          className="card-img"
                          src={
                            item.urlToImage ??
                            "https://thumbs.dreamstime.com/b/news-magazine-isolated-vector-icons-can-be-modify-any-style-news-magazine-isolated-vector-icons-can-be-modify-any-style-125668941.jpg"
                          }
                          alt="Card image"
                          height={200}
                        />
                      </div>
                      <div className="card-body px-0 pt-3">
                        <h4 className="card-title">{item.title}</h4>
                        <ul className="nav nav-divider align-items-center text-uppercase small">
                          <li className="nav-item">
                            <a
                              href="#"
                              className="nav-link text-reset btn-link"
                            >
                              {item.author}
                            </a>
                          </li>
                          <li className="nav-item">
                            {moment(item?.created_at).format("d-mm-yyyy")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-end  flex-column">
              <Pagination
                currentPage={currentPage}
                totalPage={Math.ceil(newsItems?.total / newsPerPage)}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
