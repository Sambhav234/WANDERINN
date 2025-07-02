# 🏨 WANDERINN – Hotel Booking Platform

**WANDERINN** is a modern and intuitive hotel booking web application designed for travelers to explore, book, and manage hotel stays across various destinations.

🔗 **Live Demo**: [https://wanderinn-szmw.onrender.com](https://wanderinn-szmw.onrender.com)

---

---

## ✨ Features

- 🔎 Browse hotels by curated categories (Trending, Beaches, Mountains, Castles, Religious, etc.)
- 🏨 Users can **create**, **edit**, **view**, and **delete hotel listings**
- 📅 Book hotels with check-in/check-out dates and number of guests
- 📝 Leave reviews and ratings on each hotel listing
- 🗺️ Visual **Map View** to explore nearby properties
- 💳 Secure payments with **Razorpay** gateway [looking forward to implement this in future.....]
- 👤 Personalized dashboard to manage bookings and profile
- 🖼️ Upload/update profile pictures (via Cloudinary)
- 🔐 User authentication with Passport.js and session management
- ✅ Booking confirmation with success tick animation
- 📱 Mobile-responsive interface with clean, modern design

---

## ⚙️ Tech Stack

| Layer      | Technologies                              |
|------------|--------------------------------------------|
| Frontend   | EJS,Bootstrap CSS                          |
| Backend    | Node.js, Express.js                        |
| Database   | MongoDB, Mongoose                          |
| Auth       | Passport.js, bcrypt                        |
| Payments   | Razorpay API  [work under progress....]    |
| Cloud      | Cloudinary (image upload)                  |
| Location   | Leaflet.js (for map integration) |
| Deployment | Render.com                                 |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sambhav234/WANDERINN.git
cd WANDERINN
```
### 2. Install Dependencies
```bash
    npm install
```
### 3. Setup Environment Variables
Create a .env file in the root directory and add the following:
    PORT=3000
    MONGODB_URI=your_mongo_db_connection_string
    SESSION_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

### 4. Run the Project
    nodemon filename(main .js file)

    Then visit: http://localhost:port(eg. 3000 or 8080 etc)



👤 Author
🔗Sambhav Mishra
    


🙌 Support
🌟 Star the repo if you like the project!
🐛 Found a bug? Open an issue.
📥 Want to contribute? Fork and submit a pull request.