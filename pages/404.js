import Head from "next/head";

function notFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <h3 style={{ color: "var(--bg-color-primary)" }}>page not found...</h3>
    </>
  );
}

export default notFound;
