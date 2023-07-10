import React, { useState, useEffect } from "react";

interface IProps {
  [x: string]: unknown;
}

const IframeChild = (): JSX.Element => {
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (!message) {
      return;
    }

    window.parent.postMessage(message, "http://localhost:5173/iframe_child");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5173") {
        return;
      }

      setReceivedMessage(event.data);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className=" bg-orange-300 rounded-md p-4">
      <h3 className=" text-xl font-semibold underline">Iframe Child</h3>
      <div className=" min-h-[20px] text-orange-800 font-bold">
        {receivedMessage && <p>{receivedMessage}</p>}
      </div>
      <form
        className="flex flex-col gap-2 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 rounded-sm"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=" bg-gray-500 p-2 rounded-sm border border-gray-700">
          send message
        </button>
      </form>
    </div>
  );
};

export default IframeChild;
