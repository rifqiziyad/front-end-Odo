module.exports = {
  env: {
    APP_NAME: "Odo",
    BASE_URL: `${process.env.BASE_URL}`,
  },
  async rewrites() {
    return [
      {
        source: "/login", //source = pengganti path
        destination: "/auth/login", // destination = awal path
      },
      {
        source: "/register", //source = pengganti path
        destination: "/auth/register", // destination = awal path
      },
      {
        source: "/transfer",
        destination: "/transfer/transfer",
      },
      {
        source: "/confirmation",
        destination: "/transfer/confirmation",
      },
    ];
  },
};
