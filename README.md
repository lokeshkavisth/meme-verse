# MemeVerse

### 🔥 MemeVerse: A Fun, Interactive Meme Sharing Platform

MemeVerse is a multi-page interactive web app where users can explore, upload, and engage with memes. The project is built using **Next.js 15**, **Framer-Motion**, and **Shadcn/ui**, featuring modern UI/UX design, seamless animations, and optimized performance.

---

## 🚀 Live Demo

[Click here to explore MemeVerse](https://memeverse-2.netlify.app/)

---

## 📸 Features

### 1. Homepage

- Dynamic display of **Trending Memes** fetched from APIs.
- Dark Mode Toggle.
- Smooth animations with **Framer Motion**.
- User-friendly layout.

---

### 2. Meme Explorer

- Infinite Scrolling.
- Meme **Category Filters**:
  - Trending
  - New
  - Classic
  - Random
- **Search Functionality** with debounce.
- Sorting by:
  - Likes
  - Date
  - Comments

---

### 3. Meme Upload

- Upload **Images or GIFs**.
- Add funny captions with **Text Editor**.
- AI-based meme caption generation (using Google Gemini API).
- Meme preview before uploading.

---

### 4. Meme Details

- Dynamic URL Routing (`/meme/:id`).
- Like and Comment functionality (Persisted in Local Storage).
- Animated Like button.
- Share memes via social media.

---

### 5. User Profile

- User-uploaded memes list.
- Edit **Profile Information** (Name, Bio, Profile Picture).
- View liked memes.
- Meme Upload History.

---

### 6. Leaderboard

- Top 10 **Most Liked Memes**.
- Top Users ranked by:
  - Engagement (Likes + Comments)
  - Meme Contributions

---

### 7. Easter Egg 404 Page

- Custom **Meme-based 404 Page**.
- Surprise hidden meme joke!

---

## 🛠️ Tech Stack

| Tech          | Description                  |
| ------------- | ---------------------------- |
| Next.js       | App Routing + SSR            |
| React         | Component-based architecture |
| Tailwind CSS  | Modern Utility-first Styling |
| Framer Motion | Smooth Animations            |
| Context API   | Global State Management      |
| Imgflip API   | Meme Generation API          |
| Cloudinary    | Image Upload and Storage     |
| Local Storage | Data Persistence             |

---

## 🎯 Performance Optimization

- Image Optimization via **Next.js Image Component**.
- **Lazy Loading** memes and components.
- API Caching with Local Storage.
- Code Splitting with **React Profiler**.

---

## 📌 How to Run Locally

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the Repo
git clone https://github.com/lokeshkavisth/meme-verse.git

# Navigate to Project
cd meme-verse

# Install Dependencies
npm install or npm install --force

# Start Development Server
npm run dev
```

---

## 📊 Folder Structure

```bash
src
 └─ ├─ components        # Reusable UI Components
    ├─ context           # Global State Context
    ├─ app               # Next.js app router
    ├─ public            # Static Files
    ├─ utils             # Utility Functions
    └─ types             # Typescript Types
```

---

## 🔌 APIs Used

- Imgflip API (Meme Generator)
- ImgBB API (Image Upload)
- Cloudinary (Image Storage)

---

## 🔥 Optimizations

- Lazy loading images.
- Pagination and infinite scroll.
- Optimized animations.
- Local storage caching.

---

## 💡 Future Improvements

- User Authentication.
- JWT-Based API Integration.
- Meme Template Library.
- Community Meme Challenges.

---

## 🌐 Deployment

The app is deployed on **Netlify**.

[Live Demo](https://memeverse-2.netlify.app/)

---

## 🎥 Video Demo

[Watch the Video Explanation](#)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

---

## 📄 License

This project is licensed under the MIT License.

---

### Thank You for Visiting MemeVerse 🎉

Laugh, Share, Repeat! 😎
