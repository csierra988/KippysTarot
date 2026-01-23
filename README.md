# 🐈‍⬛ KippysTarot
 A full-stack tarot reading and journaling web application that let's you draw three card spreads, save readings, and reflect on your readings with a tarot journal.

 ## Features
 ✧ ***Three Card Tarot Spread*** - Basic and versatile layout

 ✧ ***User authentication*** - Uses Firebase authentication for sign up and login

 ✧ ***Reading History*** - Manage and view all of your saved readings

 ✧ ***Tarot Journal*** - Reflect and write notes about what each of the cards in your saved reading mean to you

 ✧ ***Card Animations*** - Tarot cards have an interactive flip effect with a hover animation



 ## Technologies
 ### Frontend
 ✧ ***React.js***

 ✧ ***Styled Components***

✧ ***Vite***

✧ ***Axios***

### Backend

✧ ***Node.js***

✧ ***Express***

✧  ***PostgresSQL***

✧ ***Firebase Admin SDK***

## Installation
1. Clone the repository onto your local machine.
   
2. Install the frontend and backend dependencies.
   
```
    cd frontend
    npm install --legacy-peer-deps
```
```
    cd ../backend
    npm install
```

3. Create and set up a .env file in the backend folder.
   
   ```
   #what the file should contain
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   FIREBASE_SERVICE_KEY=your_service_key
   DB_PORT=3000
   ```

4. Set up the database.
   
   ```
   psql -U your_username -d your_database -f backend/schema.sql
   ```

5. Within /frontend/src/api.js replace API_BASE_URL with local host.

6. Start the servers in two terminals for the backend and frontend.
   
   ```
   cd backend
   npm run
   ```
   ```
   cd frontend
   npm run dev
   ```

 ## Future Updates
  ✧ More reading options (Love and Career)

  ✧ Card reversal meanings

  ✧ Add artwork of Kippy
 