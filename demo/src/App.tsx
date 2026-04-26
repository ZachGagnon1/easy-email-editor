import React, { Suspense } from "react";

const Editor = React.lazy(() => import("@demo/pages/Editor"));

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img width="200px" src="/loading" alt="" />
          <p
            style={{
              fontSize: 24,
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Please wait a moment.
          </p>
        </div>
      }
    >
      <Editor />
    </Suspense>
  );
}

export default App;
