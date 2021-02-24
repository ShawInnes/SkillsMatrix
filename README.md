# Skills Matrix

- React App
- React Router
- Styled Components
- React Query
- React Bootstrap
- Font Awesome
- Formik
- Axios
- Storybook

# Getting Started

To stand up a working copy of the service

```
docker-compose up --build -d
```

This will stand up the following services

- Seq service on http/5341
- Tinkerpop Graph DB on ws/8182
- Skills MatriX API on http/5000
- Skills MatriX React App on http/3000

## Seed Data

Browse to http://localhost:5000/swagger/index.html and execute the `/api/data` call once. It will take a few seconds to seed the data.

## React App

The main application will be running on http://localhost:3000/

# Development

## Start dependencies

```
docker-compose up -d seq gremlin
```

## API

```
cd api
dotnet run --project SkillsMatrix.Api/SkillsMatrix.Api.csproj
```

## React App

```
cd react-app
yarn start
```

### Storybook

```
cd react-app
yarn run storybook
```
