# Planetly Challenge

This is a demo app created for Planetly's candidate selection process.

## Instructions

First of all, you will need to create a `.env.local` file in the project root folder.\
and set your `API_KEY`. The content should be as follows:

```
REACT_APP_SERVICE_API_KEY=YOUR_API_KEY
REACT_APP_SERVICE_URL=$SERVICE_URL
```

then, just run `yarn` for installing all the dependencies. Once done, in the project directory you can run:

### `yarn start`

Runs the app in the development mode.\ Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
you will need to first set your api_key in the `.env.local` file as descibed above

### `yarn start:stubs`

Runs the app using the stubby server. With this option the api_key configuration is not necessary, since it will\
display all the request responses configured in the `stubby-config.yml` file.

### `yarn test`

Launches the test runner and collects the coverage of the files.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

# Project approach and decitions

For this project I decided to use modern libraries and recommended approaches for topics like the data fetching, state management and testing.
Here are some of the main libraries I used and the reason why I chose them:

- **Formik**: I have used this form library for many projects in the past with good results, although now my preferred option
  is `react-hook-form` because it has better performance than `Formik`, however it is complicated sometimes to
  make `react-hook-form` to work with some UI libraries, so I opted for a more secure option.
- **Redux Toolkit**: As stated on the documentation page, this package is intended to be the standard way to write Redux logic,
  so for some time now, I decided to make this toolkit my preferred choice as a replacement of the combination `redux`-`redux-sagas`
  and honestly, redux toolkit makes the things a lot easier than other aproaches, it is easy to use, it is esasy to configure,
  it reaquires a lot less code and boilerplate and it is easy to understand.
- **RTK Query**: I hadn't used this one before, but I decided to give it a try and learn a bit about it. It turned out to be a good decision.
  Fetching and caching data is much easier than other approaches. I was used to use the `createAsyncThunk` API, but with this a lot less boilerplate
  is needed and it has the advantange that it handles the fetch results cache by itself.
- **Recharts**: I did a litle reaserch on the available charting libraries and I chose this one because it looked easy to use.
  I hadn't used any charting library before, this one is good, but it is very dificcult to use the behavioral testing approach of
  testing-library with it.
- **testing-library**: It has become an standard by now, its behavior testing approach makes testing more expressive and concise as opposed
  to the implementation testing approach of other libraries like enzyme.
