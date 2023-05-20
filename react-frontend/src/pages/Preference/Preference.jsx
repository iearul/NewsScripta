import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination";
import NewsService from "../../services/NewsService";
import "./Preference.css";

const Home = () => {
  const [newsItems, setNewsItems] = useState(null);
  const [preferenceItems, setPreferenceItems] = useState(null);
  const [allPreference, setAllPreference] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAllData = async (data) => {
    const results = await NewsService.getPreferenceNews(data);
    setNewsItems(results?.data);
  };

  useEffect(() => {
    getAllData({ q: searchTerm, page: currentPage, perPage: newsPerPage });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getAllData({ q: searchTerm, page: 1, perPage: newsPerPage });
  }, [searchTerm]);

  const getPreference = async () => {
    const preference = await NewsService.getPreference();
    setPreferenceItems(preference?.data);
  };

  const setPreference = async () => {
    const preference = await NewsService.getAllPreference();
    setAllPreference(preference?.data);
  };

  const handelPreferenceChange = (name, value, isChecked) => {
    if (name == "categories") {
      if (isChecked) {
        setPreferenceItems({
          ...preferenceItems,
          categories: [...(preferenceItems?.categories ?? []), value],
        });
      } else {
        setPreferenceItems({
          ...preferenceItems,
          categories: preferenceItems?.categories.filter(
            (item) => item != value
          ),
        });
      }
    } else if (name == "sources") {
      if (isChecked) {
        setPreferenceItems({
          ...preferenceItems,
          sources: [...(preferenceItems?.sources ?? []), value],
        });
      } else {
        setPreferenceItems({
          ...preferenceItems,
          sources: preferenceItems?.sources.filter((item) => item != value),
        });
      }
    } else if (name == "authors") {
      if (isChecked) {
        setPreferenceItems({
          ...preferenceItems,
          authors: [...(preferenceItems?.authors ?? []), value],
        });
      } else {
        setPreferenceItems({
          ...preferenceItems,
          authors: preferenceItems?.authors.filter((item) => item != value),
        });
      }
    }
  };

  const updatePreference = async () => {
    const result = await NewsService.setPreference(preferenceItems);
    setPreferenceItems(result?.data);
    setCurrentPage(1);
    getAllData({ q: searchTerm, page: 1, perPage: newsPerPage });
  };

  useEffect(() => {
    getPreference();
    setPreference();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
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
                <div className="col-sm-6 col-md-4" key={item.id}>
                  <Link
                    to={item?.newsUrl}
                    target="_blank"
                    className="news-link text-decoration-none"
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
                            <span className="text-muted">Author: </span>
                            {item.author}
                          </li>
                        </ul>
                        <ul className="nav nav-divider align-items-center text-uppercase small">
                          <li className="nav-item">
                            <span className="text-muted">Category: </span>
                            {item.category}
                          </li>
                        </ul>
                        <ul className="nav nav-divider align-items-center text-uppercase small">
                          <li className="nav-item">
                            <span className="text-muted">Source: </span>
                            {item.source}
                          </li>
                        </ul>
                        <ul className="nav nav-divider align-items-center text-uppercase small">
                          <li className="nav-item">
                            <span className="text-muted">At: </span>{" "}
                            {moment(item?.created_at).format("D MMMM YYYY")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <button className="btn btn-primary" onClick={updatePreference}>
                Update Preference
              </button>
            </div>
            <div className="list-group my-3">
              <h4>Categories</h4>
              {allPreference?.categories?.map((category, index) => (
                <div className="list-group-item" key={index}>
                  <input
                    type="checkbox"
                    name={category}
                    value={category}
                    checked={preferenceItems?.categories?.includes(category)}
                    onChange={(e) =>
                      handelPreferenceChange(
                        "categories",
                        e.target.value,
                        e.target.checked
                      )
                    }
                  />
                  <span className="mx-2">{category}</span>
                </div>
              ))}
            </div>
            <div className="list-group my-3">
              <h4>Source</h4>
              {allPreference?.sources?.map((source, index) => (
                <div className="list-group-item" key={index}>
                  <input
                    type="checkbox"
                    name={source}
                    value={source}
                    checked={preferenceItems?.sources?.includes(source)}
                    onChange={(e) =>
                      handelPreferenceChange(
                        "sources",
                        e.target.value,
                        e.target.checked
                      )
                    }
                  />
                  <span className="mx-2">{source}</span>
                </div>
              ))}
            </div>
            <div className="list-group my-3">
              <h4>Author</h4>
              <div className="overflow-scroll" style={{ height: 300 }}>
                {allPreference?.authors?.map((author, index) => (
                  <div className="list-group-item" key={index}>
                    <input
                      type="checkbox"
                      name={author}
                      value={author}
                      checked={preferenceItems?.authors?.includes(author)}
                      onChange={(e) =>
                        handelPreferenceChange(
                          "authors",
                          e.target.value,
                          e.target.checked
                        )
                      }
                    />
                    <span className="mx-2">{author}</span>
                  </div>
                ))}
              </div>
            </div>
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
      <Footer />
    </>
  );
};

export default Home;
