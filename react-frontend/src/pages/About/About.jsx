import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const About = () => {
    return (
        <>
            <Header />

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>About My News Aggregation Project</h1>
                        <p>
                            I have developed a news aggregation platform using Laravel, ReactJS, and MySQL. The project aims to provide users with easy access to the latest news articles from various reliable sources. By integrating the News API, The Guardian, and The New York Times, the platform gathers news articles from these sources and presents them in a user-friendly manner.
                        </p>
                        <p>
                            The home page of the platform displays all the news articles, allowing users to stay updated on current events across different categories such as sports, politics, technology, and more. Users also have the option to search for specific news articles using the search functionality.
                        </p>
                        <p>
                            In addition to the home page, I have implemented a preference page where users can customize their news viewing experience. On this page, users can filter news articles based on the source, category, and their favorite authors. This feature enhances user engagement by providing them with personalized news content that aligns with their interests.
                        </p>
                        <p>
                            To ensure that the news articles are always up to date, I have implemented a cron job that automatically updates the latest news at regular intervals. This keeps the platform fresh with the most recent information, allowing users to stay informed without manual intervention.
                        </p>
                        <p>
                            As the project is developed alongside my job, the design may not be as polished as using pre-made templates. However, I have focused on creating a seamless user experience and optimizing the functionality of the platform. User feedback and continuous improvement are essential aspects of the project, and I am committed to refining the design and features based on user input.
                        </p>
                        <p>
                            Overall, my news aggregation project showcases my skills in Laravel, ReactJS, MySQL, API integration, and cron job implementation. It serves as a valuable resource for news enthusiasts, providing them with a convenient and personalized platform to access the latest news articles from multiple sources.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default About;
