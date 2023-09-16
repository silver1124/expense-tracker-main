import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

//1st test
describe(`Greeting Component`, () => {
  test(`render Greeting testing as a text`, () => {
    //arrange
    render(<Greeting />);
    //act
    //....nothing
    //Assert
    const gteetingText = screen.getByText("Greeting", { exact: false });
    expect(gteetingText).toBeInTheDocument();
  });

  //2nd when the text is show

  test("render this is for testing if the button NOT clicked", () => {
    //arrange
    render(<Greeting />);

    //Assert
    const paragraphText = screen.getByText("this is for testing", {
      exact: false,
    });
    expect(paragraphText).toBeInTheDocument();
  });
});

//3rd for click use -userEvent when hide the "this is for testing" and onclick show " Greeting changed"

test("render Greeting changed if the button Clicked", () => {
  //arrange
  render(<Greeting />);
  //act
  const button = screen.getByRole("button");
  userEvent.click(button);
  //userEvent.click(screen.getByText("Click me"));

  //Assert
  const paragraphText = screen.getByText("this is for testing", {
    exact: false,
  });
  expect(paragraphText).toBeInTheDocument();
});

//4th now i want hide this "is for testing" when click the button and shoe "Greeting changed"

test(`does not renter "testing" if the button was clicked`, () => {
  render(<Greeting />);
  //act
  const button = screen.getByRole("button");
  userEvent.click(button);
  //userEvent.click(screen.getByText("Click me"));

  //Assert
  const paragraphText = screen.queryByText("testing", {
    exact: false,
  });
  expect(paragraphText).toBeInTheDocument();
});

/////////////////////this is our first test case//////////////
//comment the app.test.js
//create the gteeting.js and greeting.test.ja
//this geerting.js component import in app.js
//this greeting.test.js testing the greeting.js component
//now you can get the error so delete the applyMiddleware.test.js

//3 files needed- greeting.js, hgreeting.test.js, app.js
//and remove app.test.js
///////////////////// End this is our first test case//////////////

// import { render, screen } from '@testing-library/react';
// import App from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });