import { useRef, useState } from "react";
import { decode } from "html-entities";
import LoadingSpinner from "./loadingSpinner";

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const inputEl = useRef(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    inputEl.current.value = "";
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <form className="m-4 flex justify-center" onSubmit={handleFormSubmit}>
        <input
          ref={inputEl}
          className="rounded-l-lg p-4 h-full border-t mr-0 border-b border-l focus:border-r-0  focus:outline-none dark:text-gray-200 text-gray-800 border-gray-200 dark:bg-black bg-white"
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          type="email"
          placeholder="Your email"
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />

        <button
          type="submit"
          className="px-8 rounded-r-lg bg-gray-300  text-gray-800 font-bold p-4 uppercase border-gray-200 border-t border-b border-r"
        >
          {status === "sending" ? <LoadingSpinner /> : "Subscribe"}
        </button>
      </form>
      <div className="newsletter-form-info text-black font-semibold dark:text-gray-200">
        {status === "error" || error ? (
          <div
            className="newsletter-form-error"
            dangerouslySetInnerHTML={{
              __html: error || getMessage(message),
            }}
          />
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div>
    </>
  );
};

export default NewsletterForm;
