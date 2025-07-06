# AAC Three.js Integration

This project integrates Three.js into the existing website for the Afghanistan Association Club (AAC) at Georgetown University. The goal is to enhance the user experience by adding interactive 3D elements to the website.

## Project Structure

```
aac-threejs-integration
├── src
│   ├── index.html         # Main HTML document for the website
│   ├── blogs.html         # Blog section of the website
│   ├── style.css          # Styles for the website
│   └── js
│       └── three-setup.js # JavaScript code for Three.js setup
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd aac-threejs-integration
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the project**:
   You can use a local server to view the project. If you have `http-server` installed, you can run:
   ```bash
   npx http-server src
   ```
   Open your browser and navigate to `http://localhost:8080` to view the website.

## Using Three.js

Three.js is a powerful JavaScript library that allows you to create and display animated 3D graphics in the browser. In this project, Three.js is used to create a 3D scene with various objects.

### Key Files

- **src/js/three-setup.js**: This file contains the initialization code for Three.js, including the creation of the scene, camera, renderer, and any 3D objects you wish to add.
- **src/index.html**: This file includes the necessary scripts to load Three.js and the custom JavaScript file for setting up the 3D elements.

## Additional Information

For more information on Three.js, visit the [Three.js documentation](https://threejs.org/docs/).

Feel free to contribute to this project by submitting issues or pull requests. Enjoy exploring the world of 3D graphics!