export default function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ alignSelf: "center" }}>
            Hi friends. I&apos;m <strong>Jamie</strong>.
          </h1>
          <p>
            I used to have a fun, flashy personal website but having kids as
            taught me to cull unnecessary busywork. So, here we are.
          </p>
        </div>
      </div>
    </main>
  );
}
