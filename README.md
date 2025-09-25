# Ordermatic Relay

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)

**Ordermatic Relay is the smart display system for the Ordermatic ecosystem. It serves as the critical visual link between our backend, the restaurant's kitchen, and their customers.**

This project is the visual front-end designed to run on any smart display (TVs, tablets, etc.). It currently handles the two most critical functions: customer order initiation (QR) and status notification (Token Display).

---

## 🚀 The Vision

The core mission of **Ordermatic Relay** is to be the perfect connection point between two worlds: the controlled chaos of the kitchen and the eager anticipation of the guest.

This software is the **digital handshake** that closes that gap. It takes the signal of a freshly prepared order and transforms it into a clear, calming notification for the customer. It's the final, crucial "baton pass" in the service race, ensuring the journey is seamless, efficient, and stress-free for everyone involved.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15
* **Styling:** Tailwind CSS 4
* **Backend & Real-time Database:** Firebase Firestore
* **Authentication:** Firebase Authentication
* **Deployment:** Vercel

---

## 🔧 Setup & Configuration

To run this project locally, you need to connect it to the team's Firebase project.

1.  Create a `.env.local` file in the root of the project.
2.  Add the Firebase project configuration keys. You can find these in our shared project documentation or the Firebase console.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

    # The specific restaurant ID this display instance is configured for
    NEXT_PUBLIC_RESTAURANT_ID="your-restaurant-id"
    ```

---

## 🗺️ Team Roadmap

This is our current plan for evolving the platform. See our project board for detailed tickets.

* [ ] **Payments QR Display:** Build a live, moderated display for QR payments.
* [ ] **Customer Feedback Display:** Build a live, moderated display for positive customer reviews.
* [ ] **Promotional Slides:** Implement a module to rotate between the order queue and marketing content.
* [ ] **Advanced Theming Engine:** Create a UI for restaurant owners to customize themes without touching code.
# token-display-sample
