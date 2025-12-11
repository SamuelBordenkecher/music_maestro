# Music Maestro – Connect Music Teachers & Students

Music Maestro is a full-stack web application that connects music teachers and students, allowing users to browse teachers, schedule lessons, make payments, leave reviews, and more. The platform uses Django, Django REST Framework, React, PostgreSQL, Stripe, and Bootstrap to deliver a clean, interactive, and feature-rich experience.

## Features

### User Accounts
- Full authentication system:
  - Sign up / login / logout
  - Teacher and student profiles
- Profile management:
  - Optional profile pictures
  - Personal information (name, location, instruments)

### Teacher & Student Profiles
- Teachers can:
  - Set rates
  - List available instruments
  - Display location on a future Google Map integration
- Students can:
  - Browse teachers
  - Filter by instruments or location
  - Request lessons

### Lessons & Payments
- Schedule lessons with teachers
- Payment system using Stripe:
  - Track status: pending, paid, failed
  - Connects payments to lesson, student, and teacher

### Reviews & Ratings
- Students can leave reviews for teachers
- Teachers can reply to reviews (stub for future full messaging)
- Support for reporting reviews
- Track who left the rating

### Messaging System (Stub)
- Inquiries feature currently allows messages between users
- Full messaging functionality is set up as a future stub

### Instruments
- Predefined list of instruments selectable via dropdown
- Easily extendable for new instruments

## Tech Stack

**Frontend**
- React.js
- Bootstrap
- Axios (for API calls)
- React Router (frontend navigation)

**Backend**
- Django
- Django REST Framework
- PostgreSQL
- Stripe API for payments
- Google Maps API (planned for location mapping)

**Database**
- PostgreSQL with models for:
  - Users
  - Teachers / Students / Lessons
  - Payments
  - Reviews
  - Instruments
  - Messaging threads & inquiries

## How It Works

1. **User Registration**
   - Users create an account and select role (teacher/student/child)
   - Optional profile picture upload

2. **Browsing Teachers**
   - Students search teachers by instrument, location, or rate
   - Teacher profiles display available instruments and rates

3. **Scheduling & Payments**
   - Students request lessons
   - Payments linked to lessons are processed via Stripe
   - Lesson and payment status tracked

4. **Reviews**
   - Students can rate and review teachers
   - Teachers can reply to reviews

5. **Messaging**
   - Inquiries system allows students to contact teachers
   - Full messaging system prepared for future implementation

### Setup / Installation

1. Clone the Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Backend Setup (Django)
cd server/maestro_api
python -m venv .mmvenv        # create virtual environment
source .mmvenv/bin/activate   # activate virtual environment
pip install -r requirements.txt

3. Environment Variables

Copy .env.example to .env:

cp .env.example .env


Update .env with your Django secret key, database info, and debug settings.

4. Database

Make sure PostgreSQL is running and you have created the database specified in .env:

python manage.py migrate

5. Frontend Setup (React)
cd ../../../client
npm install
npm run dev

6. Run the Application

Backend:

cd ../server/maestro_api
python manage.py runserver


Frontend: Already running via npm run dev. Open your browser to http://localhost:5173 (or the port reported by Vite).

7. Optional: Running Tests

Backend tests:

cd ../server/maestro_api
python manage.py test


Frontend tests (if implemented):

cd ../../../client
npm test


**Environment Variables Example**

Create a .env.example file like this:

# Django
DEBUG=True
SECRET_KEY='your-secret-key-here'

# Database
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password_or_blank
DB_HOST=localhost
DB_PORT=5432


Note: Django parses quotes and strips matching quotes at the beginning and end. Quotes are not needed unless the value has special characters or spaces.

Usage

Sign up as a student or teacher

Fill out your profile with instruments, location, and availability

Search for teachers or students

Book lessons (payments tracked via Stripe stub)

Leave reviews and interact with teachers/students

Future Features

Full calendar integration for lesson scheduling

Integrated messaging system between students and teachers

Google Maps pins showing teacher locations

Full Stripe payment integration