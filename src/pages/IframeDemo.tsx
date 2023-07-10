import React, { useRef, useState, useEffect } from "react";

interface IProps {
  [x: string]: unknown;
}

const IframeDemo = (): JSX.Element => {
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const sendMessage = () => {
    if (!iFrameRef.current || !message) return;

    iFrameRef.current.contentWindow?.postMessage(
      message,
      "http://localhost:5173"
    );
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

      if (typeof event.data === "string") {
        setReceivedMessage(event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mb-12">
        Iframe demo
      </h1>

      <div className="w-[50%] ml-auto mr-auto border border-gray-500 rounded-md h-[70vh]">
        <h3 className="text-xl font-bold underline ml-4">Parent container</h3>
        <div className=" min-h-[20px] w-full text-center text-green-600 font-bold">
          <p>{receivedMessage}</p>
        </div>
        <form
          className="flex flex-col gap-2 justify-center items-center my-2"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 rounded-sm bg-slate-400"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className=" bg-gray-500 p-2 rounded-sm border border-gray-700">
            send message
          </button>
        </form>

        <div className="w-[80%] h-full ml-auto mr-auto flex justify-center items-center">
          <iframe ref={iFrameRef} src="/iframe_child"></iframe>
        </div>
      </div>
    </div>
  );
};

export default IframeDemo;
