import { act, render, screen, waitFor } from '@testing-library/react';
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

  expect(screen.getByText(/PDF to text service/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload to convert/i)).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeDisabled();

  const fileInput = screen.getByTestId("file-uploader") as HTMLInputElement;

  await act(async () => {
    await waitFor(() => {
      userEvent.upload(fileInput, fakeFile);
    });
  });

  const uploadButton = screen.getByRole("button");
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

  expect(screen.getByText(/PDF to text service/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload to convert/i)).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeDisabled();

  const fileInput = screen.getByTestId("file-uploader") as HTMLInputElement;

  await act(async () => {
    await waitFor(() => {
      userEvent.upload(fileInput, fakeFile);
    });
  });

  const uploadButton = screen.getByRole("button");
  expect(uploadButton).toBeEnabled();
  expect(screen.getByRole("progressbar")).toBeInTheDocument();

  await act(async () => {
    await waitFor(() => {
      userEvent.click(uploadButton);
    });
  });

  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(screen.getByText(/error message/i)).toBeInTheDocument();

});
