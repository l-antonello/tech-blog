# tech-blog

## Description
This Tech Blog is a web application that allows users to create, view, and manage tech-related blog posts. Users can sign up, log in, create, edit, and delete blog posts, as well as leave comments on existing posts.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation
To use the Tech Blog CMS, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.
4. Set up your database configuration in the `.env` file.
5. Run `npm start` to start the server.

## Usage
- When you visit the site for the first time, you will see the homepage with existing blog posts (if any), navigation links for the homepage and dashboard, and the option to log in.
- Clicking on the homepage link will take you to the homepage.
- Clicking on other links in the navigation will prompt you to sign up or sign in.
- After signing up, you can log in with your credentials.
- Once logged in, you can see navigation links for the homepage, dashboard, and log out.
- Clicking on the homepage link will show existing blog posts with titles and creation dates.
- Clicking on an existing blog post will display its title, contents, creator's username, and creation date, and allow you to leave comments.
- When you enter a comment and submit it, the comment will be saved and displayed along with the comment creator's username and date.
- Clicking on the dashboard link will take you to a dashboard with your created blog posts and an option to add a new blog post.
- You can edit or delete your existing posts from the dashboard.
- You can log out by clicking on the log out option in the navigation.
- If idle for a certain time, you will be prompted to log in again before making any changes.

## Features
- User authentication (sign up, log in, log out)
- Create, edit, and delete blog posts
- Leave and display comments on blog posts
- User-friendly dashboard to manage your posts
- Session timeout for enhanced security

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request in this repository.

## License
This project is licensed under the [MIT License](LICENSE).
