# UniManager

A University Management Website

- There are three roles: Student, Teacher and Admin

### Student

Students can:
 
- View their marks for each semester
- Register for courses
- View exam schedules
- Send requests for support.

### Teacher

Teacher can:

- View their classes
- Edit marks

### Admin

Admin can:

- Do everything teacher can
- Add new student, new teacher

## Technologies Used

**Front-End:** <img src="https://cdn.svgporn.com/logos/react.svg" height="12" width="12"> React, <img src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" height="12" width="12"> TailwindCSS

**Server:** <img src="https://cdn.svgporn.com/logos/fastapi-icon.svg" height="12" width="12"> FastAPI

**Database:** <img src="https://cdn.svgporn.com/logos/mysql-icon.svg" height="12" width="12">MySQL

## Instruction

Clone the project

```bash
    git clone https://github.com/Harito97/UniManager.git
```
Change directory to the project folder

```bash
    cd .\UniManager\
```
Start the API

- Install package

```bash
    pip install -r .\backend\requirements.txt
```

- Then

```bash
    cd .\backend\api\forms\
    uvicorn renderSendData:app --reload
```

Start the development server

- Open new terminal in the project folder

- Change directory to the frontend folder

```bash
    cd .\frontend\
```

- Install dependencies

```bash
    npm install
```

- Start the development server

```bash
    npm run dev
```