import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import http from '../http';

test('Renders converter page and process a dummy file', async () => {
  const httpMock = new MockAdapter(http);

  httpMock.onPost("/convert-to-text").reply(200, {
    data: "dummy-text",
  });

  const fakeFile = new File(['hello'], 'hello.pdf', {type: 'application/pdf'})

  render(<App />);

  expect(screen.getByText(/Please, set the next values to use the PDF to text service:/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload to convert/i)).toBeInTheDocument();
  expect(screen.getByText("Set")).toBeEnabled();

  const usernameInput = screen.getByTestId("username-input") as HTMLInputElement;
  const passwordInput = screen.getByTestId("password-input") as HTMLInputElement;
  const setButton = screen.getByTestId("set-button") as HTMLButtonElement;

  fireEvent.change(usernameInput, {target: {value: 'testmail@gmail.com'}});
  fireEvent.change(passwordInput, {target: {value: 'a-password'}});

  await act(async () => {
    await waitFor(() => {
      userEvent.click(setButton);
    });
  });

  const fileInput = screen.getByTestId("file-uploader") as HTMLInputElement;

  await act(async () => {
    await waitFor(() => {
      userEvent.upload(fileInput, fakeFile);
    });
  });

  const uploadButton = screen.getByTestId("upload-button");
  expect(uploadButton).toBeEnabled();
  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  await act(async () => {
    await waitFor(() => {
      userEvent.click(uploadButton);
    });
  });

  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(screen.getByText(/dummy-text/i)).toBeInTheDocument();

});

test('Renders converter page and process a dummy file with error', async () => {
  const httpMock = new MockAdapter(http);

  httpMock.onPost("/convert-to-text").reply(500, {
    error: "error message",
  });

  const fakeFile = new File(['hello'], 'hello.pdf', {type: 'application/pdf'})

  render(<App />);

  expect(screen.getByText(/Please, set the next values to use the PDF to text service:/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload to convert/i)).toBeInTheDocument();
  expect(screen.getByText("Set")).toBeEnabled();

  const usernameInput = screen.getByTestId("username-input") as HTMLInputElement;
  const passwordInput = screen.getByTestId("password-input") as HTMLInputElement;
  const setButton = screen.getByTestId("set-button") as HTMLButtonElement;

  fireEvent.change(usernameInput, {target: {value: 'testmail@gmail.com'}});
  fireEvent.change(passwordInput, {target: {value: 'a-password'}});

  await act(async () => {
    await waitFor(() => {
      userEvent.click(setButton);
    });
  });

  const fileInput = screen.getByTestId("file-uploader") as HTMLInputElement;

  await act(async () => {
    await waitFor(() => {
      userEvent.upload(fileInput, fakeFile);
    });
  });

  const uploadButton = screen.getByTestId("upload-button");
  expect(uploadButton).toBeEnabled();
  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  await act(async () => {
    await waitFor(() => {
      userEvent.click(uploadButton);
    });
  });

  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(screen.getByText(/We can not process your file currently/i)).toBeInTheDocument();

});
