# JPTraining Website

This project is a custom website for a coworker of mine and his personal training brand, Just Perform Training (JPTraining). I built it as a branded multi-page website that introduces the trainer, explains the services he offers, shows media from training sessions, and gives visitors a simple way to get in touch or book a session.

Even though the final result is a static website, I built it using Django so I could organize the pages with templates, reusable layout components, and cleaner routing while I was developing it. I then used `django-distill` to generate static output that can be deployed more easily.

One of the most important parts of this project is the booking experience. The site embeds CircleCal, another web app/mobile app project from my GitHub, so visitors can schedule training sessions directly from the JPTraining website without needing a custom booking system inside this repo.

## Project Goals

I approached this project like I was building a real client website from scratch. The main goals were:

- Create a professional online presence for a personal training brand.
- Keep the site simple to navigate for athletes, parents, and new visitors.
- Highlight the trainer's background, services, and training philosophy.
- Provide clear conversion paths for contacting the trainer and booking sessions.
- Keep the code organized enough that I can continue improving it over time.

## Main Features

### 1. Multi-page branded website

The site is structured as several focused pages instead of one long landing page. This makes it easier for visitors to explore specific topics like training, recovery, background information, and contact options.

Current pages include:

- Home
- About Me
- About JPT
- Contact Me
- Gallery
- Recovery and Rehabilitation
- Elevate Your Performance

### 2. Reusable shared layout

The project uses a shared base template for:

- The navigation bar
- Brand logo and footer
- Static asset loading
- Chat assistant UI
- Service worker registration

This helps keep the site consistent and reduces repeated code across pages.

### 3. Booking flow powered by CircleCal

The `Elevate Your Performance` page contains an embedded CircleCal booking calendar. This lets the site act like both a brand/marketing website and a practical scheduling tool.

Why this matters:

- Visitors do not have to leave the site to start booking.
- The trainer gets a cleaner scheduling workflow.
- I was able to connect two of my own projects together in a useful real-world way.

### 4. Contact form integration

The contact page includes a functional form connected to Web3Forms. That means users can submit inquiries without me having to build a full backend email system for this feature.

The page also includes:

- Basic user input fields
- A spam honeypot field
- A success modal after submission
- A booking button that routes users to the scheduling page

### 5. Media-driven gallery experience

The gallery page uses videos and thumbnails to show what training sessions actually look like. This helps the brand feel more real and gives visitors a better sense of the coaching environment.

It includes:

- Video slides
- Carousel controls
- Visual labels for training types
- A CTA that pushes users toward joining or making contact

### 6. Recovery and rehabilitation content

One thing that makes this website more specific than a basic fitness site is that it does not only focus on workouts. It also explains recovery and rehabilitation concepts such as myofascial release and manual therapy.

That gives the brand a broader identity by showing that JPTraining is not only about performance, but also about athlete care and injury prevention.

### 7. Lightweight on-site chat helper

The site includes a front-end chat helper that gives visitors quick guidance through button-based options such as:

- Training programs
- Recovery tips
- Pricing and availability

This is a simple guided UI feature, not a full AI chatbot, but it still improves usability and makes the site feel more interactive.

### 8. Mobile-friendly and app-like touches

The site includes a web manifest and service worker setup, which gives it some progressive web app style behavior.

That includes support for:

- Branding on supported devices
- Installability-related metadata
- Static asset caching foundations
- A more polished mobile experience

## Tech Stack

This project mainly uses:

- Python
- Django
- django-distill
- HTML templates
- CSS
- JavaScript
- SQLite (default Django development database)
- Web3Forms for the contact form
- CircleCal for embedded scheduling

## Why I Used Django For a Static Website

At first, using Django for a static site might seem like overkill. But for this project, it gave me a few advantages while I was building it:

- I could manage routes cleanly.
- I could reuse a single base template across all pages.
- Static assets were easier to organize.
- I could later export the site into static files for simpler deployment.

So the project is really a hybrid workflow:

1. Build the website like a normal Django project.
2. Reuse templates and routing during development.
3. Export the pages into static output for hosting.

## Project Structure

Here is the high-level layout of the repo:

```text
JPTraining/
├── JPTraining/          # Django project settings and root config
├── main/                # Main app with views, urls, and templates
├── static/              # Source static assets (CSS, JS, images, videos, manifest)
├── docs/                # Static site output used for deployment
├── distill_output/      # Additional generated static output
├── staticfiles/         # Collected static files
├── manage.py            # Django management entry point
└── db.sqlite3           # Local development database
```

### Important folders

`main/`

- Holds the Django app logic for the website.
- Contains page views and route definitions.
- Includes the HTML templates for each page.

`static/`

- Holds the source CSS, JavaScript, images, icons, and videos.
- Each major page has its own stylesheet and, in some cases, its own script.

`docs/`

- Contains the generated static site files.
- This is useful for deployments where a static folder is expected, such as GitHub Pages.

## Page Breakdown

### Home

The landing page introduces the brand and includes:

- A strong hero section
- A modal announcement/promo area
- A call to action to get started
- A rotating testimonials section

### About Me

This page is meant to build trust by introducing the trainer behind the brand.

### About JPT

This page explains the overall training philosophy and core service areas like:

- Strength and conditioning
- Speed development
- Lateral movement
- Reactive skills
- Injury prevention

### Contact Me

This page gives visitors a direct way to reach out and ask questions.

### Gallery

This page provides visual proof of the brand through real training media.

### Recovery and Rehabilitation

This page expands the site's value by discussing recovery-focused services and education.

### Elevate Your Performance

This is the booking page, where CircleCal is embedded directly into the website.

## Local Development Setup

If I were setting this project up from scratch again, I would follow a workflow like this:

### 1. Create and activate a virtual environment

On Windows:

```powershell
python -m venv venv
venv\Scripts\activate
```

### 2. Install dependencies

At minimum, this project needs Django and `django-distill`:

```powershell
pip install django django-distill
```

### 3. Run the development server

```powershell
python manage.py runserver
```

Then open the local URL Django gives you in the terminal.

## Static Build / Deployment Idea

This repo is set up in a way where Django is used during development, but the site can also be exported into static files for deployment.

That makes it a good learning project because it combines:

- Template-based development
- Front-end branding work
- Static hosting convenience

The `docs/` folder appears to be used as a deployment-ready output folder, which is a common pattern for GitHub Pages hosting.

## What Makes This Project Specific

This is not just a generic practice website. It is tailored to a real personal training brand and a real business use case.

A few things make it more personal and specific:

- It was built for a coworker and his own training brand.
- The content is centered around athlete development, recovery, and performance.
- The visuals and page structure are meant to support a sports-performance identity.
- It integrates CircleCal from my broader GitHub project ecosystem.

## What I Learned From Building It

This project helped me practice more than just HTML and CSS. It pushed me to work on:

- Structuring a Django project cleanly
- Reusing layouts with templates
- Organizing static assets by page
- Embedding third-party services into a custom site
- Thinking about real user flows like booking and contact conversion
- Building something for an actual brand instead of only coding demos

## Possible Future Improvements

Some improvements I could add later include:

- A proper requirements file for easier setup
- Cleaner environment variable handling for third-party keys
- Better accessibility review across all pages
- More complete chatbot links and responses
- Form validation improvements
- Automated deployment workflow
- Content management options for easier updates

## Summary

JPTraining is a custom branded training website built with Django and exported as a static site. It was created for a coworker's personal training business, and it combines business presentation, training education, media content, contact functionality, and embedded scheduling through CircleCal. For me, it is a strong practice project because it sits between a portfolio piece and a real-world client website.