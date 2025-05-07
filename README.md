# To-Do List Application

A simple and intuitive to-do list application built using Node.js and Express.js. This application allows users to create, read, update, and delete tasks, helping them stay organized and manage their daily activities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Add Tasks:** Easily add new tasks to your to-do list.
- **View Tasks:** See a clear overview of all your current tasks.
- **Mark as Complete:** Toggle the status of a task to mark it as completed.
- **Edit Tasks:** Modify the content of existing tasks.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Simple and Clean UI (Optional):** A user-friendly interface for interacting with the to-do list.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A popular NoSQL database used for storing task data.
- **body-parser:** An Express.js middleware used for parsing request bodies.
- **cors:** An Express.js middleware for enabling Cross-Origin Resource Sharing.


## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Make sure Node.js is installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).
- **npm (Node Package Manager):** npm comes bundled with Node.js. You can verify its installation by running `npm -v` in your terminal.
- **MongoDB Community Server:** Instructions for installing MongoDB can be found at [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/). Ensure your MongoDB server is running.

. **Clone the repository:**
   ```bash
   git clone [your-repository-url]
   ```

2.  **Navigate to the project directory:**
    ```bash
    cd [your-project-directory]
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment Variables:**
    - Create a `.env` file in the root directory of your project.
    - Add the following environment variables, adjusting the values as needed:
      ```
      DATABASE_URL=mongodb://localhost:27017/todoapp
      PORT=3000
      ```
      *(Note: If your MongoDB server is running on a different host or port, or if you're using a cloud service, update the `DATABASE_URL` accordingly.)*

## Usage

1.  **Start the MongoDB server:** Ensure your MongoDB server is running.

2.  **Start the Node.js application:**
    ```bash
    npm start
    ```
    This command typically runs the script defined in your `package.json` (e.g., `node server.js` or `nodemon server.js`).

3.  **Access the application:** Open your web browser and navigate to `http://localhost:3000` (or the port you specified in your `.env` file).

## API Endpoints

This application provides the following API endpoints for managing tasks:

- `POST /api/tasks`: Add a new task.
    - Request Body (JSON):
      ```json
      {
        "title": "Walk the dog",
        "description": "Take the dog for a 30-minute walk in the park."
      }
      ```
    - Response (JSON): The newly created task object, including its unique ID and timestamps.
      ```json
      {
        "_id": "64567a89b0e123456789abcd",
        "title": "Walk the dog",
        "description": "Take the dog for a 30-minute walk in the park.",
        "completed": false,
        "createdAt": "2025-05-07T12:00:00.000Z",
        "updatedAt": "2025-05-07T12:00:00.000Z",
        "__v": 0
      }
      ```
- `GET /api/tasks`: Get a list of all tasks.
    - Response (JSON): An array of all task objects.
- `GET /api/tasks/:id`: Get a specific task by its ID.
    - Path Parameter: `id` (the unique ID of the task).
    - Response (JSON): The task object with the matching ID, or a 404 error if not found.
- `PUT /api/tasks/:id`: Update an existing task.
    - Path Parameter: `id` (the unique ID of the task to update).
    - Request Body (JSON): The fields to update (e.g., `{"title": "Walk the dog in the evening", "completed": true}`).
    - Response (JSON): The updated task object, or a 404 error if not found.
- `DELETE /api/tasks/:id`: Delete a task by its ID.
    - Path Parameter: `id` (the unique ID of the task to delete).
    - Response (JSON): A success message (e.g., `{"message": "Task deleted successfully"}`) or a 404 error if not found.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix`.
3.  **Make your changes** and commit them with clear and concise commit messages: `git commit -am 'Add user authentication feature'`
4.  **Push your changes** to your forked repository: `git push origin your-feature-name`
5.  **Open a pull request** to the main repository.

Please ensure your code follows the existing style guidelines and includes relevant unit tests using Jest.

## License

[MIT License](https://www.google.com/search?q=MIT+License)

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- This project was built using the robust and flexible Node.js and Express.js frameworks.
- The MongoDB database provided a scalable and efficient way to store application data, with Mongoose simplifying interactions.
- The `body-parser` middleware was essential for handling request data, and `cors` enabled smooth communication between different origins.
- The user interface benefits from the simplicity and dynamic rendering capabilities of the EJS templating engine.
- Jest played a crucial role in ensuring the reliability and correctness of the codebase through comprehensive testing.

```

