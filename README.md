# NewsScripta

NewsScripta is a web application developed as a test task for the Full Stack Engineer position at InnoScripta AG. It is a news aggregator application that fetches news articles from multiple sources and allows users to browse and search for articles based on their preferences.

## Project Structure

The project consists of the following directories:

- `laravel-backend`: Contains the Laravel backend code.
- `react-frontend`: Contains the React frontend code.
- `.docker`: Contains Docker-related files for the project.
- `docker-compose.yml`: Defines the Docker services and configurations.

## Prerequisites

Before running the project, make sure you have Docker installed on your machine.

## Getting Started

To run the project locally, follow these steps:

1. Open a terminal and navigate to the `newsscripta` directory.

### Running the Application

2. Run the following command to start the application using Docker Compose: 

    `docker-compose up -d`

    This command will build and start the Docker containers for the Laravel backend, React frontend, and MySQL database.

3. Once the containers are up and running, you can access the application in your web browser at `http://localhost:3000`.

4. To stop the application, run the following command:
`docker-compose down`

## Usage

- **Home**: The home page displays all the available news articles. Users can browse and search for specific articles.
- **Preferred News**: The preferred news page allows users to set their preferred news sources, categories, and authors. Only news articles matching their preferences will be displayed.
- **About**: The about page provides information about the project and its purpose.
- **Logout**: The logout functionality allows users to log out from the application.

## Additional Features

- **User Registration**: Users can register and create an account to personalize their news preferences.
- **News Update Cron Job**: The application includes a cron job that updates the news articles periodically to ensure the latest news is available.

## Feedback and Contact

If you have any questions, feedback, or encounter any issues while running the project, please don't hesitate to reach out.

    Thank you for considering my application!