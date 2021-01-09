# eCommerce_Purchasing_Guitars

An eCommerce website for purchasing guitars.
The client-side is in React.js, server-side is in Node.js (using Express.js) with MongoDB as the database (using Mongoose).
The website implements authentication and payment (using Paypal).

Demo 👇  
[![Watch the video](https://github.com/sapirdeu/eCommerce_Purchasing_Guitars/blob/master/GIF.gif)](https://github.com/sapirdeu/eCommerce_Purchasing_Guitars/blob/master/MP4.mp4)

## Installation:
1. Download Node.js (https://nodejs.org/en/download/)

2. Download mongoDB (https://www.mongodb.com/try/download/community)

3. Download Robo 3T (https://robomongo.org/)

4. Clone this repository to your local machine 

5. `cd .\eCommerce_Purchasing_Guitars\` and run:  
    `npm install async bcrypt body-parser cloudinary concurrently cookie-parser dotenv express express-formidable http-proxy-middleware jsonwebtoken moment mongoose multer react-image-lightbox react-scripts react --save`
    
6. `cd .\eCommerce_Purchasing_Guitars\client\` and run:  
    `npm install @fortawesome/fontawesome @fortawesome/fontawesome-free-solid @fortawesome/react-fontawesome @material-ui/core @fortawesome/fontawesome-svg-core axios react-images react-redux react-router-dom react-slick redux redux-promise redux-thunk react-dropzone react-moment react-paypal-express-checkout react-dom  --save`  

## Usage:
- mongoDB:  
  - Go to the folder where you downloaded mongoDB
  - `cd MongoDB\Server\4.4\bin`
  - Open cmd and run `mongod.exe`
  - Open another cmd and run `mongo.exe`
  
- Robo 3T:  
    - Open Robo 3T and connect: Name: `LocalMDB`, Address: `localhost:27017`
    - Create a new collection called `waves` and 3 tables with the names `products`, `woods`, `brands`.
    - Fill in the 3 tables with the suitable content found in the files in `.\eCommerce_Purchasing_Guitars\jsons`.

- Create a user in Cloudinary (https://cloudinary.com/) to upload guitars pictures

- Under `.\eCommerce_Purchasing_Guitars\` create an `.env` file:  
DATABASE=mongodb://localhost:27017/waves  
SECRET= *choose your SECRET key to encrypt users' passwords*  
CLOUD_NAME= *copy from your Cloudinary account*  
CLOUD_API_KEY= *copy from your Cloudinary account*  
CLOUD_API_SECRET= *copy from your Cloudinary account*  

- Run `cd .\eCommerce_Purchasing_Guitars\`
- Run `npm run dev`
- Go to the new window that opens in Chrome at http://localhost:3000/ and have fun! 😊
