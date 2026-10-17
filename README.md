# Avinash Donga Portfolio

A responsive React + Vite portfolio with:

- Dark blue + purple design
- Responsive navigation
- Home / About / Skills / Experience / Projects / Education
- Certifications and Achievements
- Resume button
- GitHub + LinkedIn links
- Animated role text
- Responsive profile image
- Contact form
- EmailJS-ready contact delivery
- Centralized portfolio data for easy editing

## 1. Install

Open this folder in VS Code and run:

```bash
npm install
```

## 2. Start the website

```bash
npm run dev
```

Then open the localhost address shown by Vite.

## 3. Edit your information

Most of the content is at the top of:

```text
src/main.jsx
```

Look for:

```js
const portfolio = {
```

You can change your:

- Email
- Phone
- Location
- GitHub
- LinkedIn
- About text
- Skills
- Experience
- Projects
- Education
- Certifications
- Achievements
- Resume path

## 4. Resume

Put your PDF here:

```text
public/resume.pdf
```

The portfolio already points to `/resume.pdf`.

## 5. Email contact form

The form is already built with EmailJS.

Create an EmailJS account, connect your email service, create a template, then replace these three values in `src/main.jsx`:

```js
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
```

Recommended template variables:

```text
{{name}}
{{email}}
{{subject}}
{{message}}
{{to_email}}
```

Do NOT put an SMTP password in frontend code.

## 6. Profile photo

Your uploaded photo is already included as:

```text
public/assets/profile.png
```

To replace it later, keep the same filename or update the image path in `src/main.jsx`.

## 7. Build for production

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```
